import { UserTypeFragment } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

export const LoginResponseFragment = gql`
  fragment LoginResponseFragment on LoginResponse {
    accessToken
    refreshToken
    user {
      ...UserTypeFragment
    }
    auth2
    codeId
    encryptedCode
    success
    message
  }
  ${UserTypeFragment}
`;

export const SignUpResponseFragment = gql`
  fragment SignUpResponseFragment on SignUpResponse {
    accessToken
    refreshToken
    user {
      ...UserTypeFragment
    }
    mnemonic
    success
    message
  }
  ${UserTypeFragment}
`;
