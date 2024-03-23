'use server';

import { stackMiddlewares } from '@/middlewares/stackHandler';

import endGameMiddleware from './middlewares/endgame';

// config as translationConfig,

// TODO combine all middlewares config matches
const middlewares = [endGameMiddleware];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|xcaptcha).*)', '/', '/(api|trpc)(.*)'],
};
