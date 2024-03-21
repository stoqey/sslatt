import Link from 'next/link';
import React from 'react';

import type { IAdItem } from '@/components/AdLists/ads.item';

import AdsListContainer from './AdsListContainer';

const item: IAdItem = {
  image: 'https://s.gravatar.com/avatar/74a2d3ca625b345ae4c1347f52e7a0f7?s=500',
  favorite: true,
  title:
    'some really long title and ex and ax and ax some sub text some sub text some sub textsome sub text',
  subtitle:
    'some sub text some sub text some sub text some sub text some sub text some sub text some sub text',
  location: 'some location',
  phone: 'phone',
  rate: 200,
  status: 'status',
  numReviews: 90,
};

const adItems: IAdItem[] = [].fill(item, 0, 10);

export const AdListingContainer = () => {
  return (
    <>
      <Link href="/ad/myads/new">
        <a> Some link to editor</a>
      </Link>

      {/* List of ads here */}
      {/* {new Array().fill(new Date(), 0, 10).map((k) => {
                return <AdItem key={k} loading={true} />
            })} */}
      {/* {adItems.map((l, i) => )} */}
      {/* <AdItem {...item} small />
            <AdItem {...item} small loading />
            <AdItem {...item} box />
            <AdItem {...item} box loading />
            <AdItem {...item} block />
            <AdItem {...item} list />
            <AdItem {...item} grid /> */}

      <AdsListContainer />
    </>
  );
};
