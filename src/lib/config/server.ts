import { getConfig, setConfig } from '@/lib/config';
import { getSiteSettings } from '@/lib/hooksServer/settings';

export const fetchConfig = async () => {
  const config = getConfig();
  if (config) {
    return config;
  }
  const siteSettings = await getSiteSettings();
  if (siteSettings) {
    setConfig(siteSettings);
  }
  return siteSettings;
};
