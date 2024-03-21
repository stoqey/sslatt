import type { SiteSettings } from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import { GET_SITE_SETTINGS } from '../gql';

export const getSiteSettings = async (): Promise<SiteSettings | undefined> => {
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
