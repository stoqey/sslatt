import React from 'react';

import type { AdsListingOutput } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_AD_LISTING } from '@/lib/gql';

import AdView from './ad';

const AdPageSlug = async ({ params }: { params: { slug: string } }) => {
  const adId = params.slug;
  const { data } = await getClient().query<{
    data: AdsListingOutput;
  }>({
    query: GET_AD_LISTING,
    variables: { id: adId },
  });

  return <AdView ad={data.data} />;
};

export default AdPageSlug;
