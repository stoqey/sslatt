import { useLazyQuery } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';

import type { AdsListingOutput } from '@/lib/gql';
import { GET_AD_LISTING } from '@/lib/gql';

import type { AdsSearchItemProps } from '../../components/AdLists/ads.item';
import AdsSearchItem, { parseAdItem } from '../../components/AdLists/ads.item';

interface Props extends AdsSearchItemProps {
  id: string;
}

export const AdViewContainer = (props: Props) => {
  const { id, ...otherProps } = props;

  const [getAdListing, { loading = true, data, called }] = useLazyQuery<{
    data: AdsListingOutput;
  }>(GET_AD_LISTING, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!isEmpty(id) && !called) {
      getAdListing({ variables: { id } });
    }
  }, [id]);

  const adData = (data && data.data) || undefined;
  if (!adData) return undefined;

  const ad = parseAdItem(adData as any);
  return <AdsSearchItem {...ad} {...otherProps} />;
};
