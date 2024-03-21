import type { ApolloClient } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { WalletOutput } from '@roadmanjs/wallet-client';
import { MY_WALLET_QUERY } from '@roadmanjs/wallet-client';
import { awaitTo } from '@stoqey/client-graphql';
import { useEffect, useState } from 'react';

// getMyWallets
// getTransactions(deposits), no withdraws this not a money system

interface GetMyWallets {
  client: ApolloClient<any>;
  currencies: string[];
  createNew: boolean;
}

export const getMyWallets = async (
  args: GetMyWallets,
): Promise<WalletOutput[] | undefined> => {
  const { client, currencies, createNew } = args;

  const [, data] = await awaitTo(
    client.query<{ data: WalletOutput[] }>({
      query: MY_WALLET_QUERY,
      variables: { currency: currencies, createNew },
      fetchPolicy: 'network-only',
    }),
  );

  if (data?.data) {
    return data.data.data;
  }

  return undefined;
};

/**
 * Get wallets for a user
 * @param currencies
 * @returns
 */
export const useWallets = (currencies: string[], createNew = false) => {
  const client = useApolloClient();
  const [wallets, setWallets] = useState<WalletOutput[]>([]);

  useEffect(() => {
    const getwallets = async () => {
      const fetchedWallets = await getMyWallets({
        createNew,
        currencies,
        client,
      });

      if (fetchedWallets) {
        setWallets(fetchedWallets);
      }
    };

    getwallets();
  }, currencies);

  return wallets;
};

// useTransactions
