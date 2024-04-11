// no imports
import type { SiteSettings } from '@/components/types.generated';

export interface UISiteSettings extends SiteSettings {
  logoSvg?: string;
}

let config: UISiteSettings = {} as any;

export const setConfig = (newConfig: UISiteSettings): void => {
  config = newConfig;
};

export const getConfig = (): UISiteSettings => {
  return config;
};
