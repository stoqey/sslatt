'use client';

import {
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
  Radio,
  SVGAsset,
  Title,
} from '@uuixjs/uuixweb';
import Link from 'next/link';

import { Container } from '@/components/container';

interface LoginFormProps {
  message?: string;
  createNew?: boolean;
  csrfToken?: string;
}

export function LoginForm(args: LoginFormProps) {
  const { createNew, message, csrfToken = '' } = args;

  return (
    <Container>
      <form action={`/api/${createNew ? 'signup' : 'login'}`} method="POST">
        <input type="hidden" name="_csrf" value={csrfToken} />
        <Layout id="signin-form-pw" padding={2}>
          <Layout margin={{ bottom: 2 }} fullWidth>
            <Layout
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              alignItems={AlignItems.Center}
              justifyContent={JustifyContent.Center}
            >
              <Title>{createNew ? 'Sign up' : 'Login'}</Title>
              {message && (
                <CoreText as="h5" color={Color.Live}>
                  {message}
                </CoreText>
              )}
            </Layout>

            {/* Form */}
            <Layout>
              <input
                type="hidden"
                id="createNew"
                name="createNew"
                value="false"
              />

              <Layout padding={{ bottom: 1 }}>
                <FormGroup label={<CoreText bold>Username</CoreText>}>
                  <Input
                    size={InputSize.Large}
                    type={InputType.Text}
                    icon={SVGAsset.Email}
                    name="username"
                    id="username"
                  />
                </FormGroup>
              </Layout>

              <Layout padding={{ bottom: 1 }}>
                <FormGroup label={<CoreText bold>Password</CoreText>}>
                  <Input
                    size={InputSize.Large}
                    type={InputType.Password}
                    icon={SVGAsset.Lock}
                    name="password"
                    id="password"
                  />
                </FormGroup>
              </Layout>

              {createNew && (
                <Layout padding={{ bottom: 1 }}>
                  <FormGroup label="Repeat password">
                    <Input
                      size={InputSize.Large}
                      type={InputType.Password}
                      icon={SVGAsset.Lock}
                      name="repeatPassword"
                      id="repeatPassword"
                    />
                  </FormGroup>
                </Layout>
              )}

              {createNew ? (
                <>
                  <Button fullWidth size={ButtonSize.Large} type="submit">
                    Create account
                  </Button>

                  <Layout margin={{ top: 1 }}>
                    <Link href="/html/login">
                      <Button
                        type="button"
                        fullWidth
                        size={ButtonSize.Large}
                        variant={ButtonType.Text}
                      >
                        Login
                      </Button>
                    </Link>
                  </Layout>
                </>
              ) : (
                <>
                  {/* todo remember me */}
                  <Layout margin={{ bottom: 2 }}>
                    <Radio label="Remember me" />
                  </Layout>

                  <Layout margin={{ top: 1 }}>
                    <Button fullWidth size={ButtonSize.Large} type="submit">
                      Login In
                    </Button>
                  </Layout>

                  <Layout margin={{ top: 1 }}>
                    <Link href="/html/forgot-password">
                      <Button
                        type="button"
                        fullWidth
                        size={ButtonSize.Large}
                        variant={ButtonType.Text}
                      >
                        Forgot Password
                      </Button>
                    </Link>
                  </Layout>

                  <Layout margin={{ top: 2 }}>
                    <Link href="/html/signup">
                      <Button
                        type="button"
                        fullWidth
                        size={ButtonSize.Large}
                        variant={ButtonType.Secondary}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </Layout>
                </>
              )}
            </Layout>
          </Layout>
        </Layout>
      </form>
    </Container>
  );
}

/**
 
 */
