/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    ZZZZZ: z.string().optional(),
    LOGTAIL_SOURCE_TOKEN: z.string().optional(),
  },
  client: {},
  // You need to destructure all the keys manually
  runtimeEnv: {
    ZZZZZ: process.env.ZZZZZ,
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
  },
});
