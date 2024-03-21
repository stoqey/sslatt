import type { ApolloClient } from '@apollo/client';
import type { AdsListingType, ResType } from '@stoqey/client-graphql';
import { CREATE_AD_LISTING_MUTATION } from '@stoqey/client-graphql';
import _get from 'lodash/get';

import { userCacheManager } from '../storage/deviceStorage';

export const createUpdateAdListing = async ({
  args,
  client,
  error,
  success,
}: {
  args: Partial<AdsListingType>;
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: AdsListingType) => Promise<any>;
}) => {
  try {
    const user = await userCacheManager.get();
    const userId = _get(user, 'id', '');

    const { data: dataResponse }: any = await client.mutate({
      mutation: CREATE_AD_LISTING_MUTATION,
      variables: { args: { ...args, owner: userId } },
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error creating ad listing data');
    }

    const { data }: { data?: ResType } = dataResponse;

    console.log('creating ad listing response', JSON.stringify(data));

    if (data.success) {
      //   Successful
      console.log('creating ad listing successful', JSON.stringify(data));
      await success(data.data);
      return;
    }

    throw new Error('error creating/updating payment, please try again later');
  } catch (err) {
    console.error(err);
    await error(err);
  }
};
