'use client';

import { Container } from '@/components/container';
import LayoutPage from '@/components/Layout';
import ForgotPasswordForm from '@/containers/SignIn/ForgotPasswordForm';

export function ForgotPwPage() {
  return (
    <LayoutPage>
      <Container>
        <ForgotPasswordForm />
      </Container>
    </LayoutPage>
  );
}

export default ForgotPwPage;
