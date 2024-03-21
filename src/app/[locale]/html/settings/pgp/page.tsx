import { awaitTo } from '@stoqey/client-graphql';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';

import type { PgpPublicKey } from '@/components/types.generated';
import { ApolloWrapper } from '@/lib/apollo-wrapper.client';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_PGP_KEY } from '@/lib/gql/auth/auth.query';

import PgpSettingPage from './pgp';

const pgpPage = async () => {
  console.log('pgpPage');

  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  const [errorPgpKey, pgpKey] = await awaitTo(
    getClient().query<{ data: PgpPublicKey }>({
      query: GET_PGP_KEY,
    }),
  );

  console.log('pgpKey', { pgpKey, errorPgpKey });

  let props: any = {
    message,
    success,
    verified: false,
  };

  const publicKey = _get(pgpKey, 'data.data.key', null);

  if (!isEmpty(publicKey)) {
    props = {
      ...props,
      publicKey,
      verified: true,
    };
  }

  return (
    <ApolloWrapper>
      <PgpSettingPage {...props} />;
    </ApolloWrapper>
  );
};

export default pgpPage;
