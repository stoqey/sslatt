import { isEmpty } from 'lodash';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import querystring from 'querystring';
import React from 'react';

import type { AdsListingOutputPagination } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { SEARCH_AD_LISTING_PUBLIC } from '@/lib/gql';
import { getAdCategories } from '@/lib/hooksServer/ads';
import { getSiteSettings } from '@/lib/hooksServer/settings';

import AdsSearchPage from './search';

const parseSearchParams = async (searchParams: ReadonlyURLSearchParams) => {
  const params: any = {
    ...searchParams,
  };

  // parse category
  if (params.category) {
    const allCategories = await getAdCategories();
    const category = allCategories.find((cat) => cat.id === params.category);
    if (category) {
      const isCategory = isEmpty(category && category.category);
      if (isCategory) {
        params.category = category.id;
      } else {
        params.subcategory = params.category;
        delete params.category;
      }
    }
  }

  return params;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const args = { limit: 10, before: new Date(), search: '' };

  const categoriesData = await getAdCategories();
  const siteSettings = await getSiteSettings();

  const searchParamsObj = await parseSearchParams(searchParams);
  const searchParamsString = querystring.stringify(searchParamsObj);
  const fetchArgs = { ...args, filters: searchParamsString };
  // const queryArgs = isPublic ? fetchArgs : { ...fetchArgs, owner: user.id };
  const queryArgs = fetchArgs;

  const { data: adsData } = await getClient().query<{
    data: AdsListingOutputPagination;
  }>({
    query: SEARCH_AD_LISTING_PUBLIC,
    variables: queryArgs,
    fetchPolicy: 'no-cache',
  });

  // const adsItems: IAdItem[] = ads.map((ad) => parseAdItem(ad)); // todo convert from ads above

  return (
    <AdsSearchPage
      siteSettings={siteSettings}
      filters={searchParamsObj}
      adsData={adsData.data}
      categoriesData={categoriesData}
    />
  );
}
