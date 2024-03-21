import { JSONDATA } from '@/lib/utils/text';

const layoutCacheKey = 'layout-storage';

/**
 * Generic storage
 * @param cacheKey
 * @returns
 */
export function LayoutStorage<T>(cacheKey: string = layoutCacheKey) {
  /**
   * For saving and parsing user cache object
   * Object to string and vice verser.
   */
  return {
    get: async (): Promise<T | undefined> => {
      try {
        const val = await localStorage.getItem(cacheKey);
        if (!val) {
          throw new Error('User cache not found');
        }
        return JSONDATA(val) as T;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    set: async (value: T): Promise<boolean> => {
      try {
        if (!value) throw new Error('User cache value cannot be undefined');
        const stringifiedValue = JSON.stringify(value);
        await localStorage.setItem(cacheKey, stringifiedValue);
        return true;
      } catch (e) {
        console.log('value is', value);
        console.error(e);
        return false;
      }
    },
  };
}
