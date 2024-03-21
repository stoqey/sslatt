import { cookies } from 'next/headers';
import React from 'react';

import type {
  AdCategoryType,
  AdsListingOutput,
  CountryType,
} from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_AD_LISTING } from '@/lib/gql';
import { GET_AD_CATEGORIES } from '@/lib/gql/adcategory/adcategory.query';
import { GET_ALL_COUNTRIES_QUERY } from '@/lib/gql/country';

import AdEditorPage from './adedit';

const EditAdPageSlug = async ({ params }: { params: { slug: string } }) => {
  const adId = params.slug;
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  const { data } = await getClient().query<{
    data: AdsListingOutput;
  }>({
    query: GET_AD_LISTING,
    variables: { id: adId },
  });

  const { data: categoriesData } = await getClient().query<{
    data: AdCategoryType[];
  }>({
    query: GET_AD_CATEGORIES,
  });

  const { data: countriesData } = await getClient().query<{
    data: CountryType[];
  }>({
    query: GET_ALL_COUNTRIES_QUERY,
  });

  const ad = data.data;
  const categories = categoriesData.data;
  const countries = countriesData.data;

  return (
    <AdEditorPage
      ad={ad}
      countries={countries}
      categories={categories}
      message={message}
      success={success}
    />
  );
};

export default EditAdPageSlug;
