import { addMinutes, differenceInSeconds } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import { type NextRequest, NextResponse } from 'next/server';

import { getRedisKey, saveRedisKey } from '@/lib/redis';

const isProd = process.env.NODE_ENV === 'production';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(req: NextRequest) {
  const key = req.nextUrl?.searchParams?.get('key');

  if (isEmpty(key)) return Response.json({});

  const redisKey = await getRedisKey(key as string);

  const res = Response.json({
    data: redisKey,
  });

  return res;
}

// TODO ONLY localhost can access this route
// export async function OPTIONS(request: Request) {

//   let allowedOrigins = '*';
//   if (isProd) {
//     allowedOrigins = new URL(getCdnHost()).hostname;
//   }

//   const requestHeaders = new Headers(request.headers);
//   const userOrigin = requestHeaders.get('origin') as string;
//   if (isProd) {
//     if (allowedOrigins.includes(userOrigin)) {
//       requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
//     }
//   } else {
//     // dev
//     requestHeaders.set('Access-Control-Allow-Origin', allowedOrigins);
//   }

//   requestHeaders.set(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS',
//   );
//   requestHeaders.set(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
//   );
//   requestHeaders.set('Access-Control-Max-Age', '86400');

//   const response = new Response(null, {
//     status: 200,
//     headers: requestHeaders,
//   });

//   return response;
// }

export async function POST(req: NextRequest) {
  try {
    const timeExpire = () =>
      differenceInSeconds(addMinutes(new Date(), 5), new Date());

    let expires: number = timeExpire();

    const body = await req.json();

    const { key, data } = body;

    if (isEmpty(key)) throw new Error('key is empty');
    if (!data) throw new Error('data is empty');

    if (body.expires) {
      expires = +body.expires;
    }

    const saveToRedis = await saveRedisKey(key, data, +expires);
    return NextResponse.json(saveToRedis as any);
  } catch (error: any) {
    console.log('error ', error);

    const res = Response.json({});

    return res;
  }
}
