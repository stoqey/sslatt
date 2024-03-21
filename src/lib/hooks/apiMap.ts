import type { ApolloClient } from '@apollo/client';
import type { AdsListingType } from '@stoqey/client-graphql';
import { awaitTo, ON_MAP_REGION } from '@stoqey/client-graphql';

interface Props {
  client: ApolloClient<any>;
  args: {
    lat: number;
    lon: number;
    zoom: number;
  };
  callback: (data: AdsListingType[], error: Error) => any;
}

export const fetchOnMapRegionQuery = async (props: Props): Promise<any> => {
  const { client, args, callback } = props;
  const { lat, lon, zoom } = args;

  const [errorData, { data }] = await awaitTo(
    client.query<{ data: AdsListingType[] }>({
      query: ON_MAP_REGION,
      variables: { lat, lon, zoom, env: '' },
    }),
  );

  if (data.data) {
    return callback(data.data, null);
  }

  return callback(null, errorData);
};
