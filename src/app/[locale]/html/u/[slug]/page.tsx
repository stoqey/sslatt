import React from 'react';

import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_USER_VENDOR_ADS_LISTING } from '@/lib/gql';
import { getMe } from '@/lib/hooksServer/user';

import UVAview from './uva';

const UVAPageSlug = async ({ params }: { params: { slug: string } }) => {
  const username = params.slug;

  const user = await getMe();
  const { data, loading } = await getClient().query({
    query: GET_USER_VENDOR_ADS_LISTING,
    variables: { username },
  });

  return (
    <UVAview
      user={user as any}
      data={data.data}
      username={username}
      isStore={false}
    />
  );
};

export default UVAPageSlug;
