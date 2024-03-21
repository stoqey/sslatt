import querystring from 'querystring';
import React from 'react';

import type {
  AdsListingOutput,
  OrderRatingOutputPagination,
} from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_AD_LISTING, GET_ORDER_RATINGS } from '@/lib/gql';

import AdView from '../ad';

const AdPageSlug = async ({ params }: { params: { slug: string } }) => {
  const adId = params.slug;
  const { data } = await getClient().query<{
    data: AdsListingOutput;
  }>({
    query: GET_AD_LISTING,
    variables: { id: adId },
  });

  const { data: reviewsData } = await getClient().query<{
    data: OrderRatingOutputPagination;
  }>({
    query: GET_ORDER_RATINGS,
    variables: {
      filters: querystring.stringify({ typeId: adId }),
      before: new Date(),
      limit: 1000,
    },
  });

  return (
    <AdView tab={0} ad={data.data} reviews={reviewsData.data.items || []} />
  );
};

export default AdPageSlug;
