import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import Search from './search';

const SearchPage = () => {
  return (
    <ApolloWrapper>
      <Search />
    </ApolloWrapper>
  );
};

export default SearchPage;
