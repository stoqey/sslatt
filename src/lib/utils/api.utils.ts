import { getConfig } from '@/lib/config';

import { isLocalNetwork, isTorNetwork } from './url.util';
/**
 * GetBackendHost
 * @returns https:url
 */
export const getBackendHost = (): string => {
  const apiUrl = getConfig().API_URL || '';
  const useHttps = !(isLocalNetwork(apiUrl) || isTorNetwork(apiUrl));
  const devBaseUrl = `://${apiUrl}`;
  const backendUrl = `http${useHttps ? 's' : ''}${devBaseUrl}`;
  return backendUrl;
};

export const getMarketIcon = (symbol: string, icon = 'icon') => {
  return `${getBackendHost()}/markets/image/${symbol}/${icon}`;
};

/**
 * GetBackendHost
 * @returns https:url
 */
export const getCdnHost = (): string => {
  const cdnUrl = getConfig().API_URL || '';
  const useHttps = !(isLocalNetwork(cdnUrl) || isTorNetwork(cdnUrl));
  const devBaseUrl = `://${cdnUrl}`;
  const backendUrl = `http${useHttps ? 's' : ''}${devBaseUrl}`;
  return backendUrl;
};

export const cdnPath = (path?: string): string => {
  try {
    if (path === '' || !path) return '';
    // has existing url
    if (path.startsWith('http')) {
      const url = new URL(path);
      return `${getCdnHost()}${url.pathname}`;
    }

    return `${getCdnHost()}/${path}`;
  } catch (error) {
    return '';
  }
};

export const limitPerSearch = 60;
