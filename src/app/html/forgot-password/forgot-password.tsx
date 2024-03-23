'use client';

import { Container } from '@/components/container';
import type { ForgotPasswordFormHtmlProps } from '@/containers/SignIn/ForgotPasswordForm.html';
import { ForgotPasswordFormHtml } from '@/containers/SignIn/ForgotPasswordForm.html';

export function ForgotPwPage(props?: ForgotPasswordFormHtmlProps) {
  return (
    <Container>
      <ForgotPasswordFormHtml {...(props as any)} />
    </Container>
  );
}

export default ForgotPwPage;
