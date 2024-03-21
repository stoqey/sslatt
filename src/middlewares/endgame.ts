'use server';

import { awaitTo } from '@stoqey/client-graphql/dist/utils/awaitTo';
import * as jose from 'jose';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import rateLimit from '@/lib/hooksServer/rate-limit.redis';
import { getCdnHost } from '@/lib/utils/api.utils';

import { validateEndgameSession } from './endgame.utils';
import type { MiddlewareFactory } from './stackHandler';

const reqPerMin =
  process.env.REQ_PER_MINUTE && Number.isInteger(+process.env.REQ_PER_MINUTE)
    ? +process.env.REQ_PER_MINUTE
    : 10;
const secretEnv = process.env.ACCESS_TOKEN_SECRET;

const isEmpty = (val: any) => {
  return (
    val === null ||
    val === undefined ||
    val === '' ||
    val === undefined ||
    val === null ||
    !val
  );
};

interface AuthTokenPayload {
  userId: string;
}

const verifyAuthToken = async (token: string): Promise<AuthTokenPayload> => {
  const secret = new TextEncoder().encode(secretEnv);
  const { payload } = await jose.jwtVerify(token, secret, {});
  return payload as any;
};

const isProd = process.env.NODE_ENV === 'production';

const limiter = rateLimit({
  minutes: 5, // 5 minutes
});

export async function isAuth(token: string): Promise<AuthTokenPayload> {
  if (isEmpty(token)) {
    throw new Error('token is empty');
  }
  try {
    const verified = verifyAuthToken(token);
    return verified as any;
  } catch (err) {
    console.log('isAuth', err);
    throw new Error('not authenticated');
  }
}

async function middleware(request: NextRequest, _next: any) {
  let allowedOrigins = '*';
  if (isProd) {
    allowedOrigins = new URL(getCdnHost()).hostname;
  }

  const getCacheKey = (str: any) => {
    return (str || '')
      .replaceAll(/[`~!@#$%^*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '')
      .replaceAll(/\s/g, '');
  };

  const cookieStore = request.cookies;
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const endgamex = cookieStore.get('endgamex')?.value || '';
  const endgamei = cookieStore.get('endgamei')?.value || '';

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);

  const userOrigin = requestHeaders.get('origin') as string;
  const reqUrl = request.url;
  requestHeaders.set('x-url', reqUrl);
  // add the CORS headers to the response
  if (isProd) {
    if (allowedOrigins.includes(userOrigin)) {
      requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
    }
  } else {
    // dev
    // requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
  }

  requestHeaders.set('Access-Control-Allow-Credentials', 'true');
  requestHeaders.set(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT',
  );
  requestHeaders.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  try {
    const endgameCacheKey = getCacheKey(endgamex + endgamei);

    // ENDGAME ALL ROUTES
    const publicStatic = ['/_next', '/snake'];
    const publicRoutes = ['/', '/api/captcha'];

    const isPublic = publicRoutes.some((ps) => request.nextUrl.pathname === ps);
    const isPubStatic = publicStatic.some((ps) =>
      request.nextUrl.pathname.startsWith(ps),
    );

    if (!isPublic && !isPubStatic) {
      const endgameValid = await validateEndgameSession(endgamex, endgamei);
      // console.log("ENDGAME ALL ROUTES", endgameValid);
      if (!endgameValid) {
        const url = new URL(reqUrl);
        return NextResponse.redirect(url.origin);
      }
    }

    if (!isEmpty(endgameCacheKey)) {
      // TODO from redis
      // if (spamX.includes(endgameCacheKey)) {
      //     throw new Error(`403 DDOS filter killed your path. (You probably sent too many requests at once). Not calling you a bot, bot, but grab a new identity and try again.`);
      // }

      // IS AUTH
      let isAuthed = false;
      const [errorToken, tokenPayload = {} as any] =
        await awaitTo<AuthTokenPayload>(isAuth(accessToken));
      if (errorToken) {
        console.log('error token', errorToken);
      }
      if (tokenPayload && !isEmpty(tokenPayload?.userId)) {
        // userId = getCacheKey(tokenPayload.userId)
        isAuthed = true;
      }

      // DDOS protection
      // isAuth --> check if user is authenticated and is overloading the server
      // isAuth --> not DDOS'ing the server, give access.
      // lock the fuck out of all guests.

      const cacheKey = endgameCacheKey;
      const apiRate = isAuthed ? reqPerMin * 2 : reqPerMin;

      console.log('middleware', { reqUrl, isAuthed });

      if (isProd) {
        // only 3 attempts for signup
        if (request.nextUrl.pathname === '/api/signup') {
          const limitReached = await limiter.check(requestHeaders, 3, cacheKey);
          if (!limitReached) {
            throw new Error('Too many requests');
          }
        }

        // only 5 attempts for login
        if (
          request.nextUrl.pathname === '/api/login' ||
          request.nextUrl.pathname === '/api/forgot-password'
        ) {
          const limitReached = await limiter.check(requestHeaders, 5, cacheKey);
          if (!limitReached) {
            throw new Error('Too many requests');
          }
        }

        /**
         * TODO REDIS
         * save spammer userId timeout 5 min kicked out
         */
        if (request.nextUrl.pathname.startsWith('/api')) {
          // This logic is only applied to /about
          const limitReached = await limiter.check(
            requestHeaders,
            Math.round(apiRate / 2),
            cacheKey,
          ); // 20 requests per minute
          if (!limitReached) {
            throw new Error('Too many requests');
          }
        } else {
          const limitReached = await limiter.check(
            requestHeaders,
            apiRate,
            `${cacheKey}_ALL`,
          ); // 50 requests per minute
          if (!limitReached) {
            throw new Error('Too many requests');
          }
        }
      }
    }

    return NextResponse.next({
      request: {
        // Apply new request headers
        headers: requestHeaders,
      },
    });

    // return next({
    //   request: {
    //     // Apply new request headers
    //     headers: requestHeaders,
    //   },
    // });
  } catch (err: any) {
    // console.log('middleware', err);

    const isTooManyRequests = err.message === 'Too many requests';
    if (isTooManyRequests) {
      return Response.json(
        '403 DDOS filter killed your path. (You probably sent too many requests at once). Not calling you a bot, bot, but grab a new identity and try again.',
        { status: 403 },
      );
    }

    return Response.json(err.message || 'Forbidden', { status: 403 });
  }
}

export const withEndgame: MiddlewareFactory = (next: any) => {
  return async (request: NextRequest, _next: NextFetchEvent) =>
    middleware(request, next);
};

export default withEndgame;
