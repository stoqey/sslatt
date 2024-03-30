import React from 'react';

import { NotificationsContainerHtml } from '@/containers/Notification/Notification.html';
import { fetchNotifications } from '@/lib/hooksServer/notifications';

const NotificationPage = async () => {
  // const cookieStore = cookies();
  // let vendor;
  // const user = await getMe();
  // if (user) {
  //   vendor = await getVendor();
  // }

  const notifications = await fetchNotifications({ before: new Date() });

  // console.log('notifications', notifications);
  // const message = cookieStore.get("message")?.value;
  // const success = cookieStore.get("success")?.value === "true";

  return (
    <NotificationsContainerHtml
      notifications={notifications?.items || []}
      // message={message}
      // success={success}
    />
  );
};

export default NotificationPage;
