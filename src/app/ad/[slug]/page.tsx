import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import AdSlugPage from './adslug.page';

async function AdSlugPageIndex() {
  return (
    <ApolloWrapper>
      <AdSlugPage />
    </ApolloWrapper>
  );
}

export default AdSlugPageIndex;
