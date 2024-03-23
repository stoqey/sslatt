import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import ForgotPwPage from './forgot-password';

const forgotPw = async () => {
  return (
    <ApolloWrapper>
      <ForgotPwPage />;
    </ApolloWrapper>
  );
};

export default forgotPw;
