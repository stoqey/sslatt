import { CaptchaGenerator } from 'captcha-canvas';
import { NextResponse } from 'next/server';

import { logger } from '@/lib/Logger';
import { RedisCache } from '@/lib/redis';

export const GET = async () => {
  try {
    const captcha = new CaptchaGenerator();
    const captchaText = captcha.text;

    const capatchaBuffer = await captcha.generate();
    const imgStr = Buffer.from(capatchaBuffer).toString('base64');

    const redis = new RedisCache();

    const guestbookUnknown = await redis.get('guestbook');

    return NextResponse.json({
      id: guestbookUnknown,
      imgStr,
      captchaText,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};
