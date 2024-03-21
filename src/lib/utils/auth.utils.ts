import { awaitTo } from '@stoqey/client-graphql';

import { accessTokenManager } from '../storage/deviceStorage';
import { parseJwt } from './jwt.utils';

/**
 * Go to
 * @param currentPath
 * @param router
 * @returns boolean; or go to login page
 */
export const loginCheck = async (): Promise<boolean> => {
  // Get user check if loggedIn
  const [, accessToken] = await awaitTo(accessTokenManager.get());
  if (accessToken && accessToken) {
    // Check if token is still valid
    const token = parseJwt(accessToken);
    if (token.exp) {
      const tokenExpire = token.exp * 1000;
      if (Date.now() > tokenExpire) {
        console.log('session expired');
        return false;
      }
    }
    return true;
  }
  return false;
};
