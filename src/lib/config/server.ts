import { isEmpty } from 'lodash';

import { getConfig, setConfig } from '@/lib/config';
import { getSiteSettings } from '@/lib/hooksServer/settings';

export const fetchConfig = async () => {
  const config = getConfig();
  const isNodeJs = process.env.NEXT_RUNTIME === 'nodejs';
  if (!isEmpty(config) && !isNodeJs) {
    return config;
  }
  const siteSettings = await getSiteSettings();
  if (siteSettings) {
    setConfig(siteSettings);
  }
  return siteSettings;
};
