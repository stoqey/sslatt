import type { ApolloClient } from '@apollo/client';
import type { LoginResponseType } from '@roadmanjs/auth-client';
import { PASSWORD_LOGIN_MUTATION } from '@roadmanjs/auth-client';

export interface PasswordAuthCreds {
  username: string;
  password: string;
  createNew: boolean;
}

// TODO
export const passwordLoginApi = async ({
  args,
  client,
  results,
}: {
  args: PasswordAuthCreds;
  client: ApolloClient<any>;
  results: (data: any, error?: Error) => Promise<any>;
}) => {
  // console.log('phoneLoginApi', JSON.stringify(args));

  try {
    const { data: dataResponse }: any = await client.mutate({
      mutation: PASSWORD_LOGIN_MUTATION,
      variables: args,
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error getting login data');
    }

    const { data }: { data?: LoginResponseType } = dataResponse;

    if (data && data.success) {
      //   Successful
      // console.log('Login successful', JSON.stringify(data));
      await results(data);
      return;
    }

    throw new Error(data.message ?? 'error logging in, please try again later');
  } catch (err: any) {
    await results(null, err);
  }
};
