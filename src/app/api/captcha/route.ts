import { awaitTo } from '@stoqey/client-graphql';
import { addHours, addSeconds } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import { getConfig } from '@/lib/config';
import {
  decryptCaptchaCode,
  encryptCaptchaCode,
} from '@/lib/hooksServer/captcha';
import { getCdnHost } from '@/lib/utils/api.utils';

const baseUrl = '/';

const isProd = process.env.NODE_ENV === 'production';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const query = req.nextUrl.searchParams;
  const hasJs = query.get('js') === 'true';
  const endgamex = query.get('endgamex');
  const endgamei = query.get('endgamei');

  if (!getConfig().ENABLE_ENDGAME && !isEmpty(endgamei) && !isEmpty(endgamex)) {
    const in1hr = addHours(new Date(), 1); // TODO endgame interval
    cookieStore.set('js', `${hasJs}`, { expires: in1hr });
    cookieStore.set('endgamex', endgamex, { expires: in1hr });
    cookieStore.set('endgamei', endgamei, { expires: in1hr });
    const resUrl = !hasJs ? '/html' : '/';
    return new Response(null, {
      headers: {
        Refresh: `0; url=${resUrl}`,
        // 'Refresh': `0; url=/`,
      },
    });
  }

  const res = new Response(null, {
    headers: {
      Refresh: `10; url=${baseUrl}`,
    },
  });

  return res;
}

export async function OPTIONS(request: Request) {
  console.log('captcha api OPTIONS', request);
  let allowedOrigins = '*';
  if (isProd) {
    allowedOrigins = new URL(getCdnHost()).hostname;
  }

  const requestHeaders = new Headers(request.headers);
  const userOrigin = requestHeaders.get('origin') as string;
  if (isProd) {
    if (allowedOrigins.includes(userOrigin)) {
      requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
    }
  } else {
    // dev
    requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
  }

  requestHeaders.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  requestHeaders.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
  );
  requestHeaders.set('Access-Control-Max-Age', '86400');

  const response = new Response(null, {
    status: 200,
    headers: requestHeaders,
  });

  return response;
}

export async function POST(req: NextRequest) {
  let iv = '';
  let encrypted = '';
  let confirmCode = '';
  let hasJs = false;
  const sendError = (_message = '') => {
    let allowedOrigins = '*';
    if (isProd) {
      allowedOrigins = new URL(getCdnHost()).hostname;
    }

    const requestHeaders = new Headers(req.headers);
    const userOrigin = requestHeaders.get('origin') as string;
    if (isProd) {
      if (allowedOrigins.includes(userOrigin)) {
        requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
      } else {
        requestHeaders.set('Keep-Alive', 'timeout=10, max=1');
      }
    } else {
      // dev
      requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
    }
    requestHeaders.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    requestHeaders.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
    );
    requestHeaders.set('Access-Control-Max-Age', '86400');

    console.log('captcha api Forbidden', { iv, encrypted, confirmCode });
    return Response.json('Forbidden', { status: 403, headers: requestHeaders });
  };
  // TODO generic messages
  const cookieStore = cookies();
  const in3Secs = addSeconds(new Date(), 5);
  const in1hr = addHours(new Date(), 1); // TODO endgame interval
  const in3SecsStr = in3Secs.toUTCString();

  // console.log("captcha api", req);
  try {
    const formData = await req.formData();
    const hasJavascript = formData.get('js') as string;
    hasJs = hasJavascript === 'true';

    iv = formData.get('encryptedi') as string;
    if (isEmpty(iv)) return sendError();

    encrypted = formData.get('encryptedx') as string;
    if (isEmpty(encrypted)) return sendError();

    confirmCode = formData.get('confirmCode') as string;
    if (isEmpty(confirmCode)) return sendError();

    const variables = {
      iv,
      encrypted,
      confirmCode,
    };

    console.log('captcha api args', variables);

    const [errorDecoding, decoded] = await awaitTo(
      decryptCaptchaCode(encrypted, iv),
    );
    if (errorDecoding) return sendError();

    if (decoded.toLowerCase() !== confirmCode.toLowerCase())
      throw new Error('Invalid confirm code');

    // TODO in1hr
    const timestamp = Math.round(in1hr.getTime() / 1000);
    const endgameCode = `${timestamp}`;
    const captchaCode = await encryptCaptchaCode(endgameCode);
    if (!captchaCode) {
      throw new Error('Invalid captcha code');
    }
    const { data: endgameCypher, iv: endgameCypherIv } = captchaCode;

    cookieStore.set('refresh', 'true', { expires: in3Secs });
    // cookieStore.set("message", "Successfully verified code", { expires: in3Secs });
    // cookieStore.set("success", "true", { expires: in3Secs });
    cookieStore.set('js', `${hasJs}`, { expires: in1hr });
    cookieStore.set('endgamex', endgameCypher, { expires: in1hr });
    cookieStore.set('endgamei', endgameCypherIv, { expires: in1hr });

    const resUrl = !hasJs ? '/html' : '/';
    return new Response(null, {
      headers: {
        Refresh: `0; url=${resUrl}`,
        // 'Refresh': `0; url=/`,
      },
    });
  } catch (error: any) {
    console.log('error api/captcha', error);

    // record attempts
    const message = (error && error?.message) || `captcha failed`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=${baseUrl}`,
        'Set-Cookie': `message=${message}; path=/; expires=${in3SecsStr}`,
      },
    });

    res.headers.append(
      'Set-Cookie',
      `success=false; path=/; expires=${in3SecsStr}`,
    );
    return res;
  }
}
