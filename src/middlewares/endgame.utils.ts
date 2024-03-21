import { awaitTo } from '@stoqey/client-graphql/dist/utils/awaitTo';

import { decryptCaptchaCode } from '@/lib/hooksServer/captcha';

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

export const validateEndgameSession = async (
  endgamex: string,
  endgamei: string,
): Promise<boolean> => {
  if (isEmpty(endgamex) || isEmpty(endgamei)) {
    return false;
  }
  const [errorDecoding, decoded] = await awaitTo(
    decryptCaptchaCode(endgamex, endgamei),
  );

  if (errorDecoding || !decoded) {
    // console.log("endGame session error", errorDecoding);
    return false;
  }

  const endgameTimeout = new Date(+decoded * 1000).getTime();
  // console.log("endGame session", moment(new Date(+decoded * 1000)).fromNow());
  if (endgameTimeout < Date.now()) {
    return false;
  }

  return true;
};
