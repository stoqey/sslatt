'use server';

// import { logger } from '@/lib/Logger';
import { isEmpty } from 'lodash';
import { NextResponse } from 'next/server';

import {
  getNotificationNextPath,
  readNotifications,
} from '@/lib/hooksServer/notifications';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  try {
    const id = params.slug;
    const notifications = await readNotifications({ id });
    if (!notifications || isEmpty(notifications)) {
      throw new Error('Notifications not found');
    }
    const notification = notifications[0];
    if (!notification) {
      throw new Error('Notification not found');
    }
    const nextPath = getNotificationNextPath(notification);
    return NextResponse.redirect(new URL(nextPath, req.url));
  } catch (error) {
    console.log('An error occurred while fetching notifications', error);
    return NextResponse.redirect(new URL('/html/notifications', req.url));
  }
};
