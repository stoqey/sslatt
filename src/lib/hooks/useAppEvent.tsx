import { useEffect, useState } from 'react';

import type { APPEVENTS } from '../AppEvent';
import { AppEvents } from '../AppEvent';

/**
 * Use AppEvents
 * native javascript events from any part of the app
 * e.g from search input to search search screen
 * @param eventName
 * @returns
 */
export function useAppEvent<T>(eventName: APPEVENTS): T {
  const events = AppEvents.Instance;

  const [dbData, setData] = useState<any>(null);

  useEffect(() => {
    const handle = (data: any) => {
      setData(data);
    };

    events.on(eventName, handle);
    return () => {
      events.off(eventName, handle);
    };
  }, []);

  return !dbData ? (null as any) : dbData;
}
