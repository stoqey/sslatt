import { awaitTo } from '@stoqey/client-graphql';
import fs from 'fs';
import { isEmpty } from 'lodash';

import type { UISiteSettings } from '../config';
import { isLocalNetwork } from '../utils/url.util';

export const apiUrl = process.env.API_URL;
export const apiUrlJs = process.env.API_URL_JS;

const getBackendHost = (): string => {
  const useHttps = !isLocalNetwork(apiUrl);
  const devBaseUrl = `://${apiUrl}`;
  const backendUrl = `http${useHttps ? 's' : ''}${devBaseUrl}`;
  return backendUrl;
};

export const getIconSvg = async (url?: string): Promise<string | undefined> => {
  try {
    const getDefaultSvg = () => {
      const localLocal = fs.readFileSync(`public/logo.svg`, 'utf8');
      return localLocal;
    };

    if (!isEmpty(url)) {
      const [errorUrl, imageUrl] = await awaitTo(Promise.resolve(new URL(url)));
      if (errorUrl) {
        return getDefaultSvg();
      }
      const imagepath = imageUrl.pathname;
      const response = await fetch(`${getBackendHost()}${imagepath}`);
      if (!response.ok) {
        return getDefaultSvg();
      }

      const svgText = await response.text();
      return svgText;
    }
    return getDefaultSvg();
  } catch (error) {
    console.log('error getIconSvg', error);
  }
};

export const getSiteSettings = async (): Promise<
  UISiteSettings | undefined
> => {
  try {
    const response = await fetch(`${getBackendHost()}/client/settings`);
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    const settings = await response.json();
    const svgLogo = await getIconSvg(settings?.logo as any);
    if (svgLogo) {
      settings.logoSvg = svgLogo;
    }
    if (!settings?.API_URL) {
      settings.API_URL = apiUrlJs || apiUrl;
    }
    return settings;
  } catch (error) {
    console.log('getSiteSettings error', error);
    return undefined;
  }
};
