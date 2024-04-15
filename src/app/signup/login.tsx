'use client';

import LayoutPage from '@/components/Layout';
import SignIn from '@/containers/SignIn';

export function Login() {
  return (
    <LayoutPage>
      <SignIn afterLogin="/home" signup />
    </LayoutPage>
  );
}

export default Login;
