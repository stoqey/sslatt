import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';

import { AppEvents } from '../AppEvent';

const events = AppEvents.Instance;

export const useEvent = (eventName: string) => {
  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    if (isEmpty(eventName) || !isEmpty(eventData)) return;

    const listener = (data: any) => {
      setEventData(data);
    };

    events.on(eventName, listener);

    return () => {
      events.removeListener(eventName, listener);
    };
  }, [eventName, eventData]);

  return eventData as any;
};

export default useEvent;
