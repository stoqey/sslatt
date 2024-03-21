import type { ApolloClient } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { awaitTo } from '@stoqey/client-graphql';
import flatten from 'lodash/flatten';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useState } from 'react';

import type { OrderRatingOutput } from '../gql';
import { GET_ORDER_RATINGS } from '../gql';

interface OrderRatingsPagination {
  items: OrderRatingOutput[];
  hasNext?: boolean;
  params?: any; // queries args
}

interface FetchRatings {
  before?: Date;
  after?: Date;
  limit: number;
  filters?: string;
}

export const fetchRatings = async ({
  args,
  client,
}: {
  args: FetchRatings;
  client: ApolloClient<any>;
}): Promise<OrderRatingsPagination> => {
  try {
    const { data: dataResponse }: any = await client.query({
      query: GET_ORDER_RATINGS,
      variables: args,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error fetching ratings data');
    }

    const data: { data?: OrderRatingsPagination } = dataResponse;

    if (data && data.data) {
      return data.data;
    }

    throw new Error('error fetching ratings, please try again later');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

interface UseRatingsDataState {
  ratings: OrderRatingOutput[];
  hasNext: boolean;
}
interface UseRatingsDataProps extends UseRatingsDataState {
  fetchOlder: () => Promise<void>;
}

/**
 * Hook to search for Posts from GraphQL API
 * New to older posts
 * @param FetchPosts
 * @returns
 */
export function useRatingsData(args: FetchRatings): UseRatingsDataProps {
  const [state, setState] = useState<UseRatingsDataState>({
    ratings: [],
    hasNext: false,
  });
  const { hasNext, ratings = [] } = state;

  const client = useApolloClient();

  async function getOrderRatings(props: FetchRatings): Promise<void> {
    const [, data] = await awaitTo(
      fetchRatings({
        client,
        args: props,
      }),
    );

    const newPosts = data?.items || [];
    if (isEmpty(newPosts)) {
      return setState({ ratings: [], hasNext: false });
    }

    const newHasNext = _get(data, 'hasNext', false);
    const allRatings = flatten([...ratings, ...newPosts]);
    const combinedRatings = uniqBy(allRatings, 'id');
    setState({ ratings: combinedRatings, hasNext: newHasNext });
  }

  const getMoreOlderRatings = async () => {
    // get last item in posts, pass it as new arg
    const lastPost = ratings[ratings.length - 1];

    const olderFetchProps: FetchRatings = {
      before: lastPost?.createdAt,
      limit: args.limit, // re-use same og args
    };

    await getOrderRatings(olderFetchProps);
  };

  // Component did mount issue
  useEffect(() => {
    if (!isEmpty(args.filters)) {
      getOrderRatings(args); // use args to fetch more
    }
  }, [args.filters]);

  return { ratings, fetchOlder: getMoreOlderRatings, hasNext };
}
