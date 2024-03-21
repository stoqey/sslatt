'use client';

import { Container } from '@/components/container';
import LayoutPage from '@/components/Layout';
import { ChangePasswordForm } from '@/containers/SignIn/ChangePasswordForm';

export function ChangePassword() {
  return (
    <LayoutPage>
      <Container>
        <ChangePasswordForm />
      </Container>
    </LayoutPage>
  );
}

export default ChangePassword;
