import type {
  AdCategoryType,
  AdsListingOutput,
} from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import { GET_AD_LISTING } from '../gql';
import { GET_AD_CATEGORIES } from '../gql/adcategory/adcategory.query';

export const getAdCategories = async (): Promise<AdCategoryType[]> => {
  try {
    const { data: categoriesData } = await getClient().query<{
      data: AdCategoryType[];
    }>({
      query: GET_AD_CATEGORIES,
    });

    const categories = categoriesData?.data;
    return categories;
  } catch (error) {
    console.log('getCountries error', error);
    return [];
  }
};

export const getAdById = async (
  id: string,
): Promise<AdsListingOutput | undefined> => {
  try {
    const { data } = await getClient().query<{
      data: AdsListingOutput;
    }>({
      query: GET_AD_LISTING,
      variables: {
        id,
      },
    });

    const adItem = data?.data;
    return adItem;
  } catch (error) {
    console.log('getAdById error', error);
    return undefined;
  }
};
