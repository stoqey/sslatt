import { isEmpty, omit } from 'lodash';
import { cookies } from 'next/headers';
import React from 'react';

import type { PasswordChangeResponse } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { PW_CHANGE_MUTATION } from '@/lib/gql/auth';

import PasswordChange from './password-change.page';

const passwordPage = async () => {
  const cookieStore = cookies();

  const useMnemonicVal = cookieStore.get('useMnemonic')?.value;
  const useMnemonic = useMnemonicVal === 'true';
  const encryptedCode = cookieStore.get('encryptedCode')?.value;
  const codeId = cookieStore.get('codeId')?.value;

  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  let props: any = {
    success,
    message,
    codeId,
    useMnemonic,
    encryptedCode,
  };

  // console.log("passwordPage props init", { props });

  if ((isEmpty(message) && isEmpty(useMnemonicVal)) || isEmpty(encryptedCode)) {
    const getPasswordChange = await getClient().mutate<{
      data: PasswordChangeResponse;
    }>({
      mutation: PW_CHANGE_MUTATION,
    });

    const responseData: any = getPasswordChange.data?.data || {};
    if (responseData?.success) {
      props = { ...props, ...omit(responseData, ['success', 'message']) };
    } else {
      props = { ...props, ...responseData };
    }
  }
  // console.log("passwordPage props after", { props });

  return <PasswordChange {...props} />;
};

export default passwordPage;
