import { cookies } from 'next/headers';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';
import { getCSRFToken } from '@/lib/hooksServer/user';

import { LoginForm } from './login.form';

// export const dynamic = "force-dynamic";

export default async function LoginPage(props: any) {
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const csrfToken = await getCSRFToken();

  console.log('Login page Page', { message });

  // we are using Apollo Wrapper here too so we can use
  // useMutation in the Poll component
  return (
    <ApolloWrapper>
      <LoginForm csrfToken={csrfToken} message={message} {...props} />
    </ApolloWrapper>
  );
}
