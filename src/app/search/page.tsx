import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import Search from './search';

interface SearchPageProps {
  nav?: boolean;
}

const SearchPage = (props: SearchPageProps) => {
  return (
    <ApolloWrapper>
      <Search {...props} />
    </ApolloWrapper>
  );
};

export default SearchPage;
