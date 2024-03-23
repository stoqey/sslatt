import React from 'react';

import type {
  UserType,
  UserVendorAdsListingPage,
} from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_USER_VENDOR_ADS_LISTING } from '@/lib/gql';
import { getMe } from '@/lib/hooksServer/user';

import UVAview from '../../u/[slug]/uva';

const UVAPageSlug = async ({ params }: { params: { slug: string } }) => {
  const username = params.slug;
  const user = await getMe();
  const { data } = await getClient().query<{
    data: UserVendorAdsListingPage;
  }>({
    query: GET_USER_VENDOR_ADS_LISTING,
    variables: { username },
  });

  return (
    <UVAview
      user={user as UserType}
      data={data.data}
      username={username}
      isStore
    />
  );
};

export default UVAPageSlug;
