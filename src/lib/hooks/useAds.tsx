import type { ApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';
import _get from 'lodash/get';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import querystring from 'querystring';
import { useEffect } from 'react';

import type { AdsListingOutput } from '../gql';
import { GET_MY_ADS_PAGINATION, SEARCH_AD_LISTING_PUBLIC } from '../gql';
import { userCacheManager } from '../storage/deviceStorage';
import { useMeApi } from './useUserCache';

interface AdsPagination {
  items: AdsListingOutput[];
  hasNext?: boolean;
  params?: any; // queries args
}

interface FetchAds {
  before?: Date;
  after?: Date;
  limit: number;
  search?: string;
  filters?: string;
}

export const fetchAds = async ({
  args,
  client,
  isPublic = false,
}: {
  args: FetchAds;
  client: ApolloClient<any>;
  isPublic?: boolean;
}): Promise<AdsPagination> => {
  try {
    // TODO sanities args
    const user = await userCacheManager.get();
    const userId = _get(user, 'id', '');

    const { data: dataResponse }: any = await client.query({
      query: isPublic ? SEARCH_AD_LISTING_PUBLIC : GET_MY_ADS_PAGINATION,
      variables: isPublic ? args : { ...args, owner: userId },
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error fetching ads data');
    }

    const data: { data?: AdsPagination } = dataResponse;

    if (data && data.data) {
      return data.data;
    }

    throw new Error('error fetching ads, please try again later');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

interface UseAdsDataState {
  ads: AdsListingOutput[];
  hasNext: boolean;
}
interface UseAdsDataProps extends UseAdsDataState {
  fetchOlder: () => Promise<void>;
}

interface UseAdsData {
  isPublic?: boolean;
  before?: Date;
  after?: Date;
  limit: number;
  search?: string;
  filters?: Record<string, any>;
}

/**
 * Hook to search for Posts from GraphQL API
 * New to older posts
 * @param FetchPosts
 * @returns
 */
export function useAdsData(props: UseAdsData): UseAdsDataProps {
  const { isPublic = false, ...args } = props;
  const filters = pickBy(omit(args.filters, ['search']), identity) || {};
  const filtersstring = querystring.stringify(filters);
  const user = useMeApi();

  const query = isPublic ? SEARCH_AD_LISTING_PUBLIC : GET_MY_ADS_PAGINATION;

  const fetchArgs = { ...args, filters: filtersstring };
  const queryArgs = isPublic ? fetchArgs : { ...fetchArgs, owner: user?.id };

  const {
    data: dataResponse,
    previousData,
    loading,
    refetch,
  } = useQuery(query, {
    variables: queryArgs,
    fetchPolicy: 'no-cache',
    skip: isPublic ? false : isEmpty(user?.id),
  });

  // TODO add prev if required
  // const prevItems = _get(previousData, "data.items", []);
  // const newItems = _get(dataResponse, "data.items", []);
  const ads = _get(dataResponse, 'data.items', []);
  const hasNext = _get(dataResponse, 'data.hasNext', false);

  // const allPosts = flatten([...prevItems, ...newItems]);
  // const ads = uniqBy(allPosts, "id");

  console.log('dataResponse', dataResponse);

  const getMyAds = (pp: Omit<UseAdsData, 'isPublic'>) => {
    const argsss = { ...pp, filters: filtersstring };
    refetch({
      variables: isPublic ? argsss : { ...argsss, owner: user?.id },
      fetchPolicy: 'no-cache',
    });
  };

  const getMoreOlderAds = async () => {
    // get last item in posts, pass it as new arg
    const lastPost = ads[ads.length - 1];

    const olderFetchProps: Omit<UseAdsData, 'isPublic'> = {
      before: lastPost.createdAt,
      limit: args.limit, // re-use same og args
    };

    getMyAds(olderFetchProps);
  };

  useEffect(() => {
    if (!loading) {
      console.log('useAdsData: getMyAds', args);
      getMyAds(args);
    }
    return () => {};
  }, [filters]);

  return { ads, fetchOlder: getMoreOlderAds, hasNext };
}
