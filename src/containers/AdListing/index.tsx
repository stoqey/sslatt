/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

import AdsListContainer from './AdsListContainer';

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
