import { useApolloClient } from '@apollo/client';
import type { LoginResponseType } from '@stoqey/client-graphql';
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
  Pill,
  PillType,
  SVGAsset,
  TextArea,
  Title,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import type {
  LoginResponse,
  SignUpResponse,
  UserType,
} from '@/components/types.generated';
import { APPEVENTS, AppEvents } from '@/lib/AppEvent';
import {
  LOGIN_2AUTH_MUTATION,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
} from '@/lib/gql/auth';
import {
  accessTokenManager,
  userCacheManager,
} from '@/lib/storage/deviceStorage';
import { loginCheck } from '@/lib/utils/auth.utils';

import type { SignInFormProps } from './signin.interface';

const appEvents = AppEvents.Instance;

interface FormMessage {
  text: string;
  color?: string;
}

interface LoginForm {
  password: string;
  username: string;
  mnemonic?: string;
  confirmCode?: string;
  codeId?: string;
  encryptedCode?: string;
}

interface SignUpForm extends LoginForm {
  repeatPassword?: string;
}

type State = LoginForm &
  SignUpForm & {
    title?: string;
    rememberMe?: boolean;
    createNew: boolean;
    auth?: LoginResponseType | SignUpResponse;
  };

const passwordStrength = (pwd: string) => {
  const array = [];
  array[0] = pwd.match(/[A-Z]/);
  array[1] = pwd.match(/[a-z]/);
  array[2] = pwd.match(/\d/);
  array[3] = pwd.match(/[!_.-]/);

  let sum = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < array.length; i++) {
    sum += array[i] ? 1 : 0;
  }

  let text = '';

  let color = Color.Base;

  switch (sum) {
    case 1:
      text = 'is weak...';
      color = Color.Error;

      break;
    case 2:
      text = 'is okay...';
      color = Color.Base;

      break;
    case 3:
      text = 'is strong...';
      color = Color.Link;

      break;
    case 4:
      text = 'is awesome...';
      color = Color.Link;
      break;

    case 0:
    default:
      text = 'is short...';
      color = Color.Error;
      break;
  }

  return { strength: sum, text, color };
};

export function SignInFormPassword(props: SignInFormProps) {
  const afterLoginRefresh = props.afterLoginRefresh || false;
  const afterLoginStall = props.afterLoginStall || false;
  const { afterLoginStallCallback } = props;
  const afterLogin = props.afterLogin || '/';

  const client = useApolloClient();
  const { push, refresh: reload } = useRouter();

  const [message, showMessage] = React.useState<FormMessage | undefined>();

  const [state, setState] = useState<State>({
    title: 'Login',
    username: '',
    password: '',
    createNew: props.signup || false,
    mnemonic: '',
  });

  const { createNew, username, password, rememberMe, repeatPassword } = state;

  const [errors, setErrors] = useState<SignUpForm>({
    username: '',
    password: '',
    repeatPassword: '',
  });

  const clearErrors = () => {
    showMessage(undefined);
    setErrors({
      username: '',
      password: '',
      repeatPassword: '',
    });
  };

  const toggleCreateNewAccount = () => {
    const newCreateNew = !state.createNew;
    setState({
      ...state,
      createNew: newCreateNew,
      title: newCreateNew ? 'Sign up' : 'Login',
    });
  };

  const handleChange = (name: any) => {
    return (e: any) => {
      const { value } = e.target;
      setState({ ...state, [name]: value });
      clearErrors();
    };
  };

  const saveLoginData = async (data: LoginResponseType) => {
    const { accessToken } = data;
    const { user } = data;
    // save login data in client browser
    await accessTokenManager.set(accessToken);
    await userCacheManager.set(user); // refresh the user

    const userAuth = {
      user,
      accessToken,
    };

    // To any subscribers
    appEvents.emit(APPEVENTS.AUTH, userAuth);
  };

  const redirectHome = async (userAuth: {
    user?: UserType;
    accessToken?: string;
  }) => {
    if (afterLoginStall) {
      if (afterLoginStallCallback) {
        return afterLoginStallCallback(userAuth);
      }
    }

    if (afterLoginRefresh) {
      return push('/home');
    }

    return push(afterLogin, {});
  };

  const submitForm = async () => {
    // when done validating form

    if (state.createNew) {
      const { data: signupData } = await client.mutate<{
        data: SignUpResponse;
      }>({
        mutation: SIGNUP_MUTATION,
        variables: {
          username,
          password,
        },
      });

      if (!signupData?.data?.success) {
        return showMessage({
          text: signupData?.data?.message || 'Something went wrong',
          color: 'red',
        });
      }

      await saveLoginData(signupData.data as LoginResponseType);

      return setState({
        ...state,
        auth: signupData?.data as LoginResponseType,
        mnemonic: signupData?.data?.mnemonic || '',
        title: 'Mnemonic key',
      });
    }
    // login
    const { data: loginData } = await client.mutate<{
      data: LoginResponse;
    }>({
      mutation: LOGIN_MUTATION,
      variables: {
        username,
        password,
      },
    });

    if (!loginData?.data?.success) {
      return showMessage({
        text: loginData?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }

    const has2FA = !isEmpty(loginData?.data?.encryptedCode);

    if (has2FA) {
      return setState({
        ...state,
        encryptedCode: loginData?.data?.encryptedCode || '',
        codeId: loginData?.data?.codeId || '',
        title: '2FA Code',
      });
    }
    await saveLoginData(loginData.data as LoginResponseType);
    // redirect to home send to add 2FA screen
    return redirectHome({
      user: loginData?.data?.user as UserType,
      accessToken: loginData?.data?.accessToken as string,
    });
  };

  const login2Auth = async () => {
    const { data: loginData } = await client.mutate<{
      data: LoginResponse;
    }>({
      mutation: LOGIN_2AUTH_MUTATION,
      variables: {
        confirmCode: state.confirmCode,
        codeId: state.codeId,
      },
    });

    if (!loginData?.data?.success) {
      return showMessage({
        text: loginData?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }

    await saveLoginData(loginData.data as LoginResponseType);

    return redirectHome({
      user: loginData?.data?.user as UserType,
      accessToken: loginData?.data?.accessToken as string,
    });
  };

  const submit = async () => {
    const newErrors: SignUpForm = {} as any;
    if (createNew) {
      if (isEmpty(password.replace(/\s/g, ''))) {
        newErrors.password = 'Password is required';
      }

      if (passwordStrength(password).strength < 2) {
        newErrors.password = `Password ${passwordStrength(password).text}`;
      }

      if (isEmpty(username.replace(/\s/g, ''))) {
        newErrors.username = 'Username is required';
      }

      if (username.replace(/\s/g, '').length < 5) {
        newErrors.username = 'Username must be at least 5 characters long';
      }

      if (!username.match(/^[a-zA-Z0-9]+$/)) {
        newErrors.username = 'Username must be alphanumeric';
      }

      if (repeatPassword !== password) {
        newErrors.repeatPassword = 'Passwords do not match';
      }
    } else {
      // login
      if (isEmpty(password.replace(/\s/g, ''))) {
        newErrors.password = 'Password is required';
      }

      if (isEmpty(username.replace(/\s/g, ''))) {
        newErrors.username = 'Username is required';
      }
    }

    if (!isEmpty(newErrors)) {
      return setErrors({ ...errors, ...newErrors });
    }

    showMessage(undefined);
    await submitForm();
  };

  // TODO re-ADD Initial check if user is not loggedIn
  React.useEffect(() => {
    (async () => {
      const isLoggedIn = await loginCheck();
      if (isLoggedIn) {
        return push('/home');
      }
    })();
  }, []);

  const MnemonicKey = () => {
    return (
      <Layout
        fullWidth
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
      >
        <Layout margin={{ bottom: 1, top: 1 }}>
          <Title>Mnemonic key</Title>
        </Layout>

        <AlertBanner
          type={AlertBannerType.Info}
          status="Please copy your mnemonic key and keep it safe. You will need it to
        recover your account. This page will be displayed only once."
          message=""
        />

        {/* Some text about copy */}
        <Layout margin={{ top: 3, bottom: 2 }}>
          <Pill
            type={PillType.New}
            label={state.mnemonic}
            style={{ fontSize: '20px' }}
          />
        </Layout>

        <Layout>
          <CoreText as="h5" style={{ opacity: 0.7, textAlign: 'center' }}>
            Remember that the login page will never ask for your mnemonic key.
            Be careful. If you lose your 2FA private key and your mnemonic key,
            you will lose access to your account
          </CoreText>
        </Layout>

        <Layout margin={{ top: 1 }}>
          <Button
            fullWidth
            size={ButtonSize.Large}
            variant={ButtonType.Primary}
            onClick={() => redirectHome()}
          >
            Continue
          </Button>
        </Layout>
      </Layout>
    );
  };

  return (
    <Layout id="signin-form-pw" padding={2}>
      <Layout margin={{ bottom: 2 }} fullWidth>
        <Layout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          alignItems={AlignItems.Center}
          justifyContent={JustifyContent.Center}
        >
          <Title>{state.title}</Title>
          {message && (
            <CoreText as="h5" color={Color.Live}>
              {message.text}
            </CoreText>
          )}
        </Layout>

        {createNew ? (
          <>
            {/* SignUp */}
            {!isEmpty(state.mnemonic) ? (
              <MnemonicKey />
            ) : (
              <Layout padding={{ bottom: 1 }}>
                <FormGroup
                  label={<CoreText bold>Username</CoreText>}
                  error={errors.username}
                >
                  <Input
                    size={InputSize.Large}
                    type={InputType.Text}
                    icon={SVGAsset.Email}
                    onChange={handleChange('username')}
                    value={username}
                  />
                </FormGroup>

                <Layout padding={{ bottom: 1 }}>
                  <FormGroup
                    label={
                      <CoreText bold display={Display.Flex}>
                        Password
                        {createNew && !isEmpty(password) && (
                          <CoreText
                            bold
                            color={passwordStrength(password).color}
                            padding={{ left: 1 }}
                          >
                            {passwordStrength(password).text}
                          </CoreText>
                        )}
                      </CoreText>
                    }
                    // TODO show password strength color
                    error={errors.password}
                  >
                    <Input
                      size={InputSize.Large}
                      type={InputType.Password}
                      icon={SVGAsset.Lock}
                      onChange={handleChange('password')}
                      value={password}
                    />
                  </FormGroup>

                  <Layout padding={{ bottom: 1 }}>
                    <FormGroup
                      label="Repeat password"
                      error={errors.repeatPassword}
                    >
                      <Input
                        size={InputSize.Large}
                        type={InputType.Password}
                        icon={SVGAsset.Lock}
                        onChange={handleChange('repeatPassword')}
                        value={repeatPassword}
                      />
                    </FormGroup>
                  </Layout>

                  <Button fullWidth size={ButtonSize.Large} onClick={submit}>
                    Create account
                  </Button>

                  <Layout margin={{ top: 1 }}>
                    <Button
                      fullWidth
                      size={ButtonSize.Large}
                      variant={ButtonType.Text}
                      onClick={toggleCreateNewAccount}
                    >
                      Login
                    </Button>
                  </Layout>
                </Layout>
              </Layout>
            )}
          </>
        ) : (
          <>
            {/* Login */}
            {!isEmpty(state.encryptedCode) ? (
              <>
                {/* 2FA Form */}
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
                        fullWidth
                        rows={7}
                        size={InputSize.Large}
                        type={InputType.Text}
                        icon={SVGAsset.Email}
                        value={state.encryptedCode} // encrypted 2FA code
                        readOnly
                      />
                    </FormGroup>
                    <FormGroup label="Enter Code" error={errors.confirmCode}>
                      <Input
                        size={InputSize.Large}
                        type={InputType.Text}
                        icon={SVGAsset.Lock}
                        value={state.confirmCode}
                        onChange={handleChange('confirmCode')}
                        name="confirmCode"
                      />
                    </FormGroup>
                  </Layout>

                  <Layout margin={{ top: 1 }}>
                    <Button
                      fullWidth
                      size={ButtonSize.Large}
                      variant={ButtonType.Primary}
                      onClick={() => {
                        if (isEmpty(state.confirmCode)) {
                          return showMessage({
                            text: 'Please enter a valid code',
                          });
                        }
                        login2Auth();
                      }}
                    >
                      Confirm code
                    </Button>
                  </Layout>
                </Layout>
              </>
            ) : (
              // Login form
              <Layout padding={{ bottom: 1 }}>
                <FormGroup
                  label={<CoreText bold>Username</CoreText>}
                  error={errors.username}
                >
                  <Input
                    size={InputSize.Large}
                    type={InputType.Text}
                    icon={SVGAsset.Email}
                    onChange={handleChange('username')}
                    value={username}
                  />
                </FormGroup>

                <Layout padding={{ bottom: 1 }}>
                  <FormGroup
                    label={
                      <CoreText bold display={Display.Flex}>
                        Password
                      </CoreText>
                    }
                    error={errors.password}
                  >
                    <Input
                      size={InputSize.Large}
                      type={InputType.Password}
                      icon={SVGAsset.Lock}
                      onChange={handleChange('password')}
                      value={password}
                    />
                  </FormGroup>

                  <Layout padding={{ bottom: 1, top: 1 }}>
                    <Button fullWidth size={ButtonSize.Large} onClick={submit}>
                      Login In
                    </Button>

                    <Layout margin={{ top: 1 }}>
                      <Link href="/forgot-password">
                        <Button
                          fullWidth
                          size={ButtonSize.Large}
                          variant={ButtonType.Text}
                        >
                          Forgot password?
                        </Button>
                      </Link>
                    </Layout>
                  </Layout>

                  <Layout margin={{ top: 2 }}>
                    <Button
                      fullWidth
                      size={ButtonSize.Large}
                      variant={ButtonType.Secondary}
                      onClick={toggleCreateNewAccount}
                    >
                      Sign Up
                    </Button>
                  </Layout>
                </Layout>
              </Layout>
            )}
          </>
        )}
      </Layout>
    </Layout>
  );
}

export default SignInFormPassword;
