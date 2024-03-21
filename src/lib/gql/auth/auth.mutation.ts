import gql from 'graphql-tag';

import { ResTypeFragment } from '../shared';
import { LoginResponseFragment, SignUpResponseFragment } from './auth.fragment';

export const VERIFY_NEW_KEY_MUTATION = gql`
  mutation VerifyNewKey(
    $codeId: String!
    $confirmCode: String!
    $newCodeId: String
    $newConfirmCode: String
  ) {
    data: verifyNewKey(
      codeId: $codeId
      confirmCode: $confirmCode
      newCodeId: $newCodeId
      newConfirmCode: $newConfirmCode
    ) {
      success
      message
      data
    }
  }
`;

export const ADD_NEW_KEY_MUTATION = gql`
  mutation AddNewKey($publicKey: String!) {
    data: addNewKey(publicKey: $publicKey) {
      success
      message
      data
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    data: login(username: $username, password: $password) {
      ...LoginResponseFragment
    }
  }
  ${LoginResponseFragment}
`;

export const LOGIN_2AUTH_MUTATION = gql`
  mutation Login2Auth($codeId: String!, $confirmCode: String!) {
    data: login2Auth(codeId: $codeId, confirmCode: $confirmCode) {
      ...LoginResponseFragment
    }
  }
  ${LoginResponseFragment}
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    data: signup(username: $username, password: $password) {
      ...SignUpResponseFragment
    }
  }
  ${SignUpResponseFragment}
`;

export const FORGOT_PW_MUTATION = gql`
  mutation ForgotPassword($username: String!) {
    data: forgotPassword(username: $username) {
      useMnemonic
      userId
      auth2
      codeId
      encryptedCode
      success
      message
    }
  }
`;

export const FORGOT_PW_CONFIRM_MUTATION = gql`
  mutation ForgotPasswordConfirm(
    $userId: String!
    $codeId: String
    $confirmCode: String
    $mnemonic: String
  ) {
    data: forgotPasswordConfirm(
      userId: $userId
      codeId: $codeId
      confirmCode: $confirmCode
      mnemonic: $mnemonic
    ) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const PW_RESET_MUTATION = gql`
  mutation PasswordReset(
    $userId: String!
    $newPassword: String!
    $codeId: String
    $confirmCode: String
    $mnemonic: String
  ) {
    data: passwordReset(
      userId: $userId
      newPassword: $newPassword
      codeId: $codeId
      confirmCode: $confirmCode
      mnemonic: $mnemonic
    ) {
      ...LoginResponseFragment
    }
  }
  ${LoginResponseFragment}
`;

export const PW_CHANGE_MUTATION = gql`
  mutation PasswordChange {
    data: passwordChange {
      useMnemonic
      auth2
      codeId
      encryptedCode
      success
      message
    }
  }
`;

export const PW_CHANGE_CONFIRM_MUTATION = gql`
  mutation PasswordChangeConfirm(
    $oldPassword: String!
    $newPassword: String!
    $codeId: String
    $confirmCode: String
    $mnemonic: String
  ) {
    data: passwordChangeConfirm(
      oldPassword: $oldPassword
      newPassword: $newPassword
      codeId: $codeId
      confirmCode: $confirmCode
      mnemonic: $mnemonic
    ) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;
