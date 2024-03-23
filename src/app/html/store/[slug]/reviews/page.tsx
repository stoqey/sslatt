import _get from 'lodash/get';
import querystring from 'querystring';
import React from 'react';

import type {
  OrderRatingOutputPagination,
  UserType,
  UserVendorAdsListingPage,
} from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_ORDER_RATINGS, GET_USER_VENDOR_ADS_LISTING } from '@/lib/gql';
import { getMe } from '@/lib/hooksServer/user';

import UVAview from '../../../u/[slug]/uva';

const UVAPageSlug = async ({ params }: { params: { slug: string } }) => {
  const username = params.slug;

  const user = await getMe();
  const { data } = await getClient().query<{
    data: UserVendorAdsListingPage;
  }>({
    query: GET_USER_VENDOR_ADS_LISTING,
    variables: { username },
  });

  const userId = _get(data, 'data.item.user.id', '');

  // console.log("store", { userStore, item: data.data.item });

  const { data: reviewsData } = await getClient().query<{
    data: OrderRatingOutputPagination;
  }>({
    query: GET_ORDER_RATINGS,
    variables: {
      filters: querystring.stringify({ seller: userId }),
      before: new Date(),
      limit: 1000,
    },
  });

  return (
    <UVAview
      user={user as UserType}
      data={data.data}
      username={username}
      isStore
      reviews={reviewsData.data.items || []}
    />
  );
};

export default UVAPageSlug;
