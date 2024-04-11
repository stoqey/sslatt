import { awaitTo } from '@stoqey/client-graphql';
import fs from 'fs';
import { isEmpty } from 'lodash';

import type { UISiteSettings } from '../config';
import { getBackendHost } from '../utils/api.utils';

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
    return settings;
  } catch (error) {
    console.log('getSiteSettings error', error);
    return undefined;
  }
};
