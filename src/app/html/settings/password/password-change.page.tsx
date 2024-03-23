'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import { Container } from '@/components/container';
import type { ChangePasswordFormProps } from '@/containers/SignIn/ChangePasswordForm.html';
import { ChangePasswordForm } from '@/containers/SignIn/ChangePasswordForm.html';

export const PasswordChange = (props: ChangePasswordFormProps) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container>
          <ChangePasswordForm {...props} />
        </Container>
      </Layout>
    </Layout>
  );
};

export default PasswordChange;
