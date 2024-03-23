import { isLocalNetwork, isTorNetwork } from './url.util';

const urlFromJson = process.env.NEXT_PUBLIC_API_URL || 'localhost:3000';

export const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

/**
 * GetBackendHost
 * @returns https:url
 */
export const getBackendHost = (): string => {
  const useHttps = !(isLocalNetwork(urlFromJson) || isTorNetwork());
  const devBaseUrl = `://${urlFromJson}`;
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
  const useHttps = !(isLocalNetwork(cdnUrl) || isTorNetwork());
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
