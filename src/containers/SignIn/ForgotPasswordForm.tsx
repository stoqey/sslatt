import { APPEVENTS, AppEvents } from '@/lib/AppEvent';
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
import {
  FORGOT_PW_CONFIRM_MUTATION,
  FORGOT_PW_MUTATION,
  PW_RESET_MUTATION,
} from '@/lib/gql/auth';
import type {
  ForgotPasswordResponse,
  LoginResponse,
  ResType,
  SignUpResponse,
} from '@/components/types.generated';
import React, { useState } from 'react';
import {
  accessTokenManager,
  userCacheManager,
} from '@/lib/storage/deviceStorage';

import type { LoginResponseType } from '@stoqey/client-graphql';
import { isEmpty } from 'lodash';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';

const appEvents = AppEvents.Instance;

interface FormMessage {
  text: string;
  color?: string;
}

interface LoginForm {
  username: string;
  mnemonic?: string;
  confirmCode?: string;
  codeId?: string;
  encryptedCode?: string;
}

interface ForgotPasswordFormProps extends LoginForm {
  userId?: string;
  newPassword?: string;
  newPasswordRepeat?: string;
  verified?: boolean;
  useMnemonic?: boolean;
}

type State = LoginForm &
  ForgotPasswordFormProps & {
    title?: string;
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

export function ForgotPasswordForm() {
  const client = useApolloClient();
  const { push } = useRouter();
  const [message, showMessage] = React.useState<FormMessage | undefined>();

  const [state, setState] = useState<State>({
    title: 'Forgot Password',
    username: '',
    mnemonic: '',
    useMnemonic: false,
  });

  const [errors, setErrors] = useState<ForgotPasswordFormProps>({});

  const clearErrors = () => {
    showMessage(undefined);
    setErrors({
      username: '',
      newPassword: '',
      newPasswordRepeat: '',
    });
  };

  const {
    username,
    newPassword,
    newPasswordRepeat,
    confirmCode,
    codeId,
    verified: isVerified,
    mnemonic,
    useMnemonic,
    userId,
  } = state;

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

  const forgotPw = async () => {
    // when done validating form

    const { data: forgotPwData } = await client.mutate<{
      data: ForgotPasswordResponse;
    }>({
      mutation: FORGOT_PW_MUTATION,
      variables: {
        username,
      },
    });

    if (!forgotPwData?.data?.success) {
      return showMessage({
        text: forgotPwData?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }

    const has2FA = !isEmpty(forgotPwData?.data?.encryptedCode);

    if (has2FA) {
      return setState({
        ...state,
        userId: forgotPwData?.data?.userId || '',
        encryptedCode: forgotPwData?.data?.encryptedCode || '',
        codeId: forgotPwData?.data?.codeId || '',
        title: '2FA Code',
      });
    }
    return setState({
      ...state,
      userId: forgotPwData?.data?.userId || '',
      useMnemonic: true,
      title: 'Enter Mnemonic',
    });
  };

  const forgotConfirm = async () => {
    // when done validating form
    const { data: forgotPwConfirmData } = await client.mutate<{
      data: ResType;
    }>({
      mutation: FORGOT_PW_CONFIRM_MUTATION,
      variables: {
        userId,
        confirmCode,
        codeId,
        mnemonic,
      },
    });

    if (!forgotPwConfirmData?.data?.success) {
      return showMessage({
        text: forgotPwConfirmData?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }

    return setState({
      ...state,
      verified: true,
      title: 'Create new password',
    });
  };

  const resetPassword = async () => {
    // when done validating form
    const { data: loginData } = await client.mutate<{
      data: LoginResponse;
    }>({
      mutation: PW_RESET_MUTATION,
      variables: {
        userId,
        confirmCode,
        codeId,
        mnemonic,
        newPassword,
      },
    });

    if (!loginData?.data?.success) {
      return showMessage({
        text: loginData?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }

    // save login data in client browser
    await saveLoginData(loginData.data as LoginResponseType);
    push('/home');
  };

  // TODO set input errors
  // const submit = async () => {
  //   let newErrors: ForgotPasswordForm = {} as any;
  //   if (createNew) {
  //     if (isEmpty(password.replace(/\s/g, ""))) {
  //       newErrors.password = "Password is required";
  //     }

  //     if (passwordStrength(password).strength < 2) {
  //       newErrors.password = "Password " + passwordStrength(password).text;
  //     }

  //     if (isEmpty(username.replace(/\s/g, ""))) {
  //       newErrors.username = "Username is required";
  //     }

  //     if (username.replace(/\s/g, "").length < 5) {
  //       newErrors.username = "Username must be at least 5 characters long";
  //     }

  //     if (!username.match(/^[a-zA-Z0-9]+$/)) {
  //       newErrors.username = "Username must be alphanumeric";
  //     }

  //     if (repeatPassword !== password) {
  //       newErrors.repeatPassword = "Passwords do not match";
  //     }
  //   } else {
  //     // login
  //     if (isEmpty(password.replace(/\s/g, ""))) {
  //       newErrors.password = "Password is required";
  //     }

  //     if (isEmpty(username.replace(/\s/g, ""))) {
  //       newErrors.username = "Username is required";
  //     }
  //   }

  //   console.log("newErrors", newErrors);

  //   if (!isEmpty(newErrors)) {
  //     return setErrors({ ...errors, ...newErrors });
  //   }

  //   showMessage(undefined);
  //   await submitForm();
  // };

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

        {/* Reset PW */}
        {isEmpty(state.encryptedCode) && !useMnemonic && (
          <Layout>
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
            </Layout>

            <Button fullWidth size={ButtonSize.Large} onClick={forgotPw}>
              Forgot Password
            </Button>
          </Layout>
        )}

        {/* 2FA */}
        {!isVerified && !isEmpty(state.encryptedCode) && (
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
                    forgotConfirm();
                  }}
                >
                  Confirm code
                </Button>
              </Layout>
            </Layout>
          </>
        )}

        {!isVerified && useMnemonic && (
          <Layout padding={{ bottom: 1 }}>
            <FormGroup
              label={
                <CoreText bold display={Display.Flex}>
                  Mnemonic
                </CoreText>
              }
              error={errors.mnemonic}
            >
              <Input
                size={InputSize.Large}
                type={InputType.Password}
                icon={SVGAsset.Lock}
                onChange={handleChange('mnemonic')}
                value={mnemonic}
              />
            </FormGroup>

            <Button
              fullWidth
              size={ButtonSize.Large}
              onClick={() => {
                if (isEmpty(mnemonic)) {
                  return showMessage({
                    text: 'Please enter a valid mnemonic',
                  });
                }

                forgotConfirm();
              }}
            >
              Confirm mnemonic
            </Button>
          </Layout>
        )}

        {/* New Password  */}
        {isVerified && (
          <Layout padding={{ bottom: 1 }}>
            <FormGroup
              label={
                <CoreText bold display={Display.Flex}>
                  Password
                </CoreText>
              }
              error={errors.newPassword}
            >
              <Input
                size={InputSize.Large}
                type={InputType.Password}
                icon={SVGAsset.Lock}
                onChange={handleChange('newPassword')}
                value={newPassword}
              />
            </FormGroup>

            <FormGroup
              label={
                <CoreText bold display={Display.Flex}>
                  Repeat new password
                </CoreText>
              }
              error={errors.newPasswordRepeat}
            >
              <Input
                size={InputSize.Large}
                type={InputType.Password}
                icon={SVGAsset.Lock}
                onChange={handleChange('newPasswordRepeat')}
                value={newPasswordRepeat}
              />
            </FormGroup>

            <Button
              fullWidth
              size={ButtonSize.Large}
              onClick={() => {
                if (isEmpty(newPassword)) {
                  return showMessage({
                    text: 'Please enter a valid password',
                  });
                }

                if (isEmpty(newPasswordRepeat)) {
                  return showMessage({
                    text: 'Please enter a valid password',
                  });
                }

                if (newPassword !== newPasswordRepeat) {
                  return showMessage({
                    text: 'Passwords do not match',
                  });
                }

                resetPassword();
              }}
            >
              Save password
            </Button>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
}

export default ForgotPasswordForm;
