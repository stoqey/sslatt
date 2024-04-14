import { awaitTo } from '@stoqey/client-graphql/dist/utils/awaitTo';
import { cookies } from 'next/headers';
import React from 'react';

import { PageNotFound } from '@/components/404s/NotFound';
import { AuthWall } from '@/components/AuthWall/authwall';
import { getConfig } from '@/lib/config';
import {
  encryptCaptchaCode,
  getCaptchaFromLocalhost,
  saveCaptchaToRedis,
} from '@/lib/hooksServer/captcha';
import { validateEndgameSession } from '@/middlewares/endgame.utils';

import JsMainPage from './js.page';

// PUBLIC PAGE
export default async function RootPage() {
  let iv;
  let ciphertext;
  let captcha;
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';
  const hasJs = cookieStore.get('js')?.value === 'true';

  const endgamex = cookieStore.get('endgamex')?.value || '';
  const endgamei = cookieStore.get('endgamei')?.value || '';
  const [, validEndgame] = await awaitTo(
    validateEndgameSession(endgamex, endgamei),
  );

  if (hasJs && validEndgame) {
    return <JsMainPage />;
  }
  if (validEndgame) {
    return <meta httpEquiv="refresh" content="0; url=/html" />;
  }

  const [, captchaRes] = await awaitTo(getCaptchaFromLocalhost());
  if (captchaRes) {
    captcha = captchaRes.data;
    const captachText = captchaRes.text;
    const [, encryptedCaptchaCode] = await awaitTo(
      encryptCaptchaCode(captachText),
    );
    if (encryptedCaptchaCode) {
      iv = encryptedCaptchaCode.iv;
      ciphertext = encryptedCaptchaCode.data;
      await saveCaptchaToRedis(iv, captcha);
    }
  }

  if (!captcha) {
    return (
      <PageNotFound
        title="500"
        message="Internal Server Error, please try again later"
      />
    );
  }

  return (
    <AuthWall
      enableEndgame={!!getConfig().ENABLE_ENDGAME}
      message={message}
      success={success}
      iv={iv}
      encrypted={ciphertext}
      captcha={captcha}
    />
  );
}
