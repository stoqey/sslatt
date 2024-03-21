import isEmpty from 'lodash/isEmpty';
import type { NextRequest } from 'next/server';

import { getRedisKey, saveRedisKey } from '@/lib/redis';
import { getCdnHost } from '@/lib/utils/api.utils';

const isProd = process.env.NODE_ENV === 'production';

export async function GET(req: NextRequest) {
  const key = req.nextUrl?.searchParams?.get('key');
  if (isEmpty(key)) return new Response(null);

  const redisKey = await getRedisKey(key as string);

  const res = new Response({ data: redisKey } as any);

  return res;
}

export async function OPTIONS(request: Request) {
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
  try {
    let key = '';
    let data = '';
    let expires = '';

    const formData = await req.formData();
    key = formData.get('key') as string;
    if (isEmpty(key)) throw new Error('key is empty');

    data = formData.get('data') as string;
    if (isEmpty(data)) throw new Error('data is empty');

    expires = formData.get('expires') as string;

    const saveToRedis = await saveRedisKey(key, data, +expires);
    return new Response(saveToRedis as any);
  } catch (error: any) {
    console.log('error api/captcha', error);

    const res = new Response(null);

    // res.headers.append(
    //   'Set-Cookie',
    //   `success=false; path=/; expires=${in3SecsStr}`,
    // );
    return res;
  }
}
