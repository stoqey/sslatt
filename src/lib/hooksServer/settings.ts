import { awaitTo } from '@stoqey/client-graphql';
import fs from 'fs';
import { isEmpty } from 'lodash';

import type { SiteSettings } from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import type { UISiteSettings } from '../config';
import { GET_SITE_SETTINGS } from '../gql';
import { getBackendHost } from '../utils/api.utils';

export const getSiteSettingsXX = async (): Promise<
  SiteSettings | undefined
> => {
  try {
    const data = await getClient().query<{ data: SiteSettings }>({
      query: GET_SITE_SETTINGS,
    });

    const settings = data?.data?.data;
    return settings;
  } catch (error) {
    console.log('getSiteSettings error', error);
    return undefined;
  }
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
      const response = await fetch(`${getBackendHost()}/${imagepath}`);
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
    const data = await getClient().query<{ data: SiteSettings }>({
      query: GET_SITE_SETTINGS,
    });

    const settings: UISiteSettings = { ...data?.data?.data };
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
