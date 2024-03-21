import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import ChangePassword from './change-password';

const changePassword = () => {
  return (
    <ApolloWrapper>
      <ChangePassword />;
    </ApolloWrapper>
  );
};

export default changePassword;
