'use client';

import {
  AlertBanner,
  AlertBannerType,
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
  Color,
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  SVGAsset,
  TextArea,
  Title,
} from '@uuixjs/uuixweb';

import { Container } from '@/components/container';

interface LoginForm2FAProps {
  message?: string;
  encryptedCode?: string;
  codeId?: string;
}

export function LoginForm2FA(args: LoginForm2FAProps) {
  const { message, encryptedCode, codeId } = args;

  return (
    <Container>
      <form action="/api/login/2fa" method="POST">
        <input type="hidden" name="codeId" value={codeId} />
        <Layout id="signin-form-pw" padding={2}>
          <Layout margin={{ bottom: 2 }} fullWidth>
            <Layout
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              alignItems={AlignItems.Center}
              justifyContent={JustifyContent.Center}
            >
              <Title>2FA Code</Title>
              {message && (
                <CoreText as="h5" color={Color.Live}>
                  {message}
                </CoreText>
              )}
            </Layout>

            {/* Form */}
            <Layout
              fullWidth
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              alignItems={AlignItems.Center}
              justifyContent={JustifyContent.Center}
            >
              <AlertBanner
                type={AlertBannerType.Info}
                status="Please please decrypt your 2FA code and enter it below."
                message="Code expires in 5 minutes"
              />

              {/* Some text about copy */}
              <Layout margin={{ top: 3, bottom: 2 }} fullWidth>
                <FormGroup label="2FA Code">
                  <TextArea
                    name="encryptedCode"
                    rows={10}
                    size={InputSize.Large}
                    value={encryptedCode} // encrypted 2FA code
                    readOnly
                  />
                </FormGroup>
                <FormGroup label="Enter Code">
                  <Input
                    size={InputSize.Large}
                    type={InputType.Text}
                    icon={SVGAsset.Lock}
                    name="confirmCode"
                  />
                </FormGroup>
              </Layout>

              <Layout margin={{ top: 1 }}>
                <Button
                  fullWidth
                  size={ButtonSize.Large}
                  variant={ButtonType.Primary}
                  type="submit"
                >
                  Confirm code
                </Button>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </form>
    </Container>
  );
}
