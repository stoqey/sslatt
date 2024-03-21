import type { ApolloClient } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { Post } from '@roadmanjs/social-client';
import { POST_CREATE_MUTATION, POST_QUERY } from '@roadmanjs/social-client';
import type { ResType } from '@stoqey/client-graphql';
import { awaitTo } from '@stoqey/client-graphql';
import _get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useState } from 'react';

import { userCacheManager } from '../storage/deviceStorage';

/**
 * Generic create/update post
 * @param { args, client }
 * @returns @Post - created/updated
 */
export const createUpdatePost = async ({
  args,
  client,
}: {
  args: Partial<Post>;
  client: ApolloClient<any>;
}): Promise<Post> => {
  try {
    // TODO sanities args
    const user = await userCacheManager.get();
    const userId = _get(user, 'id', '');

    const { data: dataResponse }: any = await client.mutate({
      mutation: POST_CREATE_MUTATION,
      variables: { args: { ...args, owner: userId } },
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error creating post data');
    }

    const { data }: { data?: ResType } = dataResponse;

    console.log('creating post response', JSON.stringify(data));

    if (data && data.success) {
      //   Successful
      console.log('creating post successful', JSON.stringify(data));
      return data.data;
    }

    throw new Error('error creating/updating post, please try again later');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// TODO delete
interface PostPagination {
  items: Post[];
  hasNext?: boolean;
  params?: any; // queries args
}

interface FetchPosts {
  before?: Date;
  after?: Date;
  limit: number;
  // filter: string;
}
export const fetchPosts = async ({
  args,
  client,
}: {
  args: FetchPosts;
  client: ApolloClient<any>;
}): Promise<PostPagination> => {
  try {
    // TODO sanities args
    const user = await userCacheManager.get();
    const userId = _get(user, 'id', '');

    const { data: dataResponse }: any = await client.query({
      query: POST_QUERY,
      variables: { ...args, owner: userId },
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error fetching post data');
    }

    const data: { posts?: PostPagination } = dataResponse;

    if (data && data.posts) {
      return data.posts;
    }

    throw new Error('error fetching post, please try again later');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

interface UsePostDataState {
  posts: Post[];
  hasNext: boolean;
}
interface UsePostDataProps extends UsePostDataState {
  fetchOlder: () => Promise<void>;
}

/**
 * Hook to search for Posts from GraphQL API
 * New to older posts
 * @param FetchPosts
 * @returns
 */
export function usePostData(args: FetchPosts): UsePostDataProps {
  const [state, setState] = useState<UsePostDataState>({
    posts: [],
    hasNext: false,
  });
  const { hasNext, posts } = state;
  const setPosts = (newPosts: Post[]) =>
    setState({ ...state, posts: newPosts });

  const client = useApolloClient();

  const getUserPosts = async (props: FetchPosts) => {
    const [error, data] = await awaitTo(
      fetchPosts({
        client,
        args: props,
      }),
    );

    if (data) {
      const newPosts = data.items;
      const hasNext = data.hasNext || false;
      const combinedPosts = uniqBy([...posts, ...newPosts], 'id');

      setState({ ...state, posts: combinedPosts, hasNext });
    }
  };

  const getMoreOlderPosts = async () => {
    // get last item in posts, pass it as new arg
    const lastPost = posts[posts.length - 1];

    const olderFetchProps: FetchPosts = {
      before: lastPost.createdAt,
      limit: args.limit, // re-use same og args
    };

    await getUserPosts(olderFetchProps);
  };

  // Component did mount issue
  useEffect(() => {
    getUserPosts(args); // use args to fetch more
  }, []);

  return { posts, fetchOlder: getMoreOlderPosts, hasNext };
}
