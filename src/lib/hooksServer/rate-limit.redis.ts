import { addMinutes, differenceInSeconds } from 'date-fns';

const baseUrl = 'http://localhost:3000';

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
  const appUrl = `${baseUrl}/key?json=false&key=${key}`;
  try {
    const fetchRes = await fetch(appUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataBody = await fetchRes.json();

    return dataBody.data;
  } catch (error) {
    console.log('getKeyFromLocalhost error', error);
    return undefined;
  }
};

const saveKeyToLocalhost = async (
  key: string,
  data: any,
  expires?: number,
): Promise<string | undefined> => {
  const appUrl = `${baseUrl}/key`;

  try {
    const saveData = {
      key,
      data,
      expire: expires,
      json: false,
    };

    const fetchRes = await fetch(appUrl, {
      method: 'POST',
      body: JSON.stringify(saveData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!fetchRes.ok) {
      throw new Error('saveKeyToLocalhost failed');
    }

    return fetchRes.statusText;
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
          !isNewToken ? undefined : (timeExpire() as any),
        );
      }

      return !isRateLimited;
    },
  };
}
