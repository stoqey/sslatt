import { cookies } from 'next/headers';
import React from 'react';

import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';

import MyProfilePage from './profile.page';

const ProfilePage = async () => {
  const cookieStore = cookies();
  let vendor;
  const user = await getMe();
  if (user) {
    vendor = await getVendor();
  }

  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  return (
    <MyProfilePage
      user={user}
      vendor={vendor}
      message={message}
      success={success}
    />
  );
};

export default ProfilePage;
