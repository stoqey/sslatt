import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import UserSlugPage from './userslug.page';

const UPage = ({ params }: { params: { slug: string } }) => {
  return (
    <ApolloWrapper>
      <UserSlugPage slug={params.slug as any} />
    </ApolloWrapper>
  );
};

export default UPage;
