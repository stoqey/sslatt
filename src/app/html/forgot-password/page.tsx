import { ApolloWrapper } from '@/lib/apollo-wrapper.client';
import { getCSRFToken } from '@/lib/hooksServer/user';

import ForgotPwPage from './forgot-password';

const forgotPw = async () => {
  const csrfToken = await getCSRFToken();
  return (
    <ApolloWrapper>
      <ForgotPwPage csrfToken={csrfToken as string} />;
    </ApolloWrapper>
  );
};

export default forgotPw;
