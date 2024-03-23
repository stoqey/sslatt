import React from 'react';

import type { AdsListingOutputPagination } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_MY_ADS_PAGINATION } from '@/lib/gql';
import { getVendor } from '@/lib/hooksServer/vendor';

import StoreAdsPage from './ads.page';

const MyStoreAds = async () => {
  const vendor = await getVendor();

  const { data } = await getClient().query<{
    data: AdsListingOutputPagination;
  }>({
    query: GET_MY_ADS_PAGINATION,
    variables: { limit: 1000, before: new Date() },
  });

  const ads = data.data.items;

  return <StoreAdsPage ads={ads} vendor={vendor} />;
};

export default MyStoreAds;
