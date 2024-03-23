import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import Login from './login';

const loginPage = () => {
  return (
    <ApolloWrapper>
      <Login />;
    </ApolloWrapper>
  );
};

export default loginPage;
