import { cookies } from 'next/headers';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';
import { getCSRFToken } from '@/lib/hooksServer/user';

import { LoginForm } from '../login/login.form';

export default async function SignupPage() {
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;

  const csrfToken = await getCSRFToken();

  return (
    <ApolloWrapper>
      <LoginForm csrfToken={csrfToken as string} message={message} createNew />
    </ApolloWrapper>
  );
}
