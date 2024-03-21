'use server';

import { stackMiddlewares } from '@/middlewares/stackHandler';

import endGameMiddleware from './middlewares/endgame';
import translationMiddleware from './middlewares/translation'; // config as translationConfig,

// TODO combine all middlewares config matches
const middlewares = [translationMiddleware, endGameMiddleware];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
