import { cookies } from 'next/headers';
import React from 'react';

import { getMe } from '@/lib/hooksServer/user';
import { getCountries, getVendor } from '@/lib/hooksServer/vendor';

import MyStoreSettingsPage from './settings.page';

const MyStoreSettings = async () => {
  const cookieStore = cookies();
  const vendor = await getVendor(); // TODO isn't this supposed to be include user too?
  const user = await getMe();
  const countries = await getCountries();

  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  return (
    <MyStoreSettingsPage
      user={user}
      countries={countries}
      vendor={vendor}
      message={message}
      success={success}
    />
  );
};

export default MyStoreSettings;
