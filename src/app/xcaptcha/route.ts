import isEmpty from 'lodash/isEmpty';
import { type NextRequest, NextResponse } from 'next/server';

import { getRedisKey } from '@/lib/redis';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(req: NextRequest) {
  const key = req.nextUrl?.searchParams?.get('key');

  if (isEmpty(key)) return Response.json({});

  const captchaString = await getRedisKey(key as string, false);

  if (!captchaString || isEmpty(captchaString)) return Response.json({});

  const filebinary = Buffer.from(captchaString, 'base64');
  const blob = new Blob([filebinary], { type: 'image/png' });

  const headers = new Headers();
  headers.set('Content-Type', 'image/*');

  return new NextResponse(blob, { status: 200, statusText: 'OK', headers });
}

// TODO only accepts requests from localhost origin
