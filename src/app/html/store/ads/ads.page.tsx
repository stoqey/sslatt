'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import { Container } from '@/components/container';
import type { VendorType } from '@/components/types.generated';
import type { AdSearchListProps } from '@/containers/AdSearch/ad.list.html';
import AdSearchListHtml from '@/containers/AdSearch/ad.list.html';

export const StoreAdsPage = (
  props: AdSearchListProps & { vendor?: VendorType },
) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Container size={7}>
        <Layout margin={2} />
        <AdSearchListHtml
          itemProps={{ meta: false }}
          isPublic={false}
          action="edit"
          ads={props.ads}
        />
      </Container>
    </Layout>
  );
};

export default StoreAdsPage;
