import { addMinutes, differenceInSeconds } from 'date-fns';

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

type Options = {
  minutes: number;
};

const getKeyFromLocalhost = async (
  key: string,
): Promise<string | undefined> => {
  const appUrl = `/captcha/key?json=false&key=${key}`;
  try {
    const fetchRes = await fetch(appUrl);
    const dataRes = await fetchRes.json();
    return dataRes.data;
  } catch (error) {
    console.log('getKeyFromLocalhost error', error);
    return undefined;
  }
};

const saveKeyToLocalhost = async (
  key: string,
  data: number,
  expires?: number,
): Promise<string | undefined> => {
  const appUrl = `/captcha/key`;

  try {
    const fetchRes = await fetch(appUrl, {
      method: 'POST',
      body: JSON.stringify({
        key,
        data,
        expire: expires,
        json: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataResponse = await fetchRes.json();
    return dataResponse;
  } catch (error) {
    console.log('saveKeyToLocalhost error', error);
    return undefined;
  }
};

export default function rateLimit(options?: Options) {
  const interval = options?.minutes || 1;

  const timeExpire = () =>
    differenceInSeconds(addMinutes(new Date(), interval), new Date());

  return {
    check: async (headers: Headers, limit: number, token: string) => {
      const tokenRedis = await getKeyFromLocalhost(token);

      const isNewToken = isEmpty(tokenRedis);
      let tokenCount = (tokenRedis && (+tokenRedis as number)) || 0;

      tokenCount += 1;

      const currentUsage = tokenCount;
      const isRateLimited = currentUsage >= limit;

      console.log('isRateLimited', {
        token,
        currentUsage,
        limit,
      });

      headers.set('X-RateLimit-Limit', `${limit}`);
      headers.set(
        'X-RateLimit-Remaining',
        `${isRateLimited ? 0 : limit - currentUsage}`,
      );

      if (!isRateLimited) {
        await saveKeyToLocalhost(
          token,
          tokenCount,
          !isNewToken ? undefined : timeExpire(),
        );
      }

      return !isRateLimited;
    },
  };
}
