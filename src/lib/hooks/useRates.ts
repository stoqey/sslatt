import { useQuery } from '@apollo/client';
import { FETCH_RATES_QUERY } from '@roadmanjs/wallet-client';
import { isEmpty } from 'lodash';

import type { PairRate } from '@/components/types.generated';
import { getConfig } from '@/lib/config';

export const useRates = (currencyPairs?: string) => {
  let pairs = currencyPairs;

  const currencies = [
    { currency: 'BTC', enabled: getConfig().ENABLE_BTC },
    { currency: 'XMR', enabled: getConfig().ENABLE_XMR },
  ];

  if (isEmpty(pairs)) {
    pairs = currencies
      .filter((c) => c.enabled)
      .map((c) => `${c.currency.toLocaleUpperCase()}_USD`)
      .join(',');
  }

  const { data, loading, refetch } = useQuery<{
    data: PairRate[];
  }>(FETCH_RATES_QUERY as any, {
    variables: { pairs },
    fetchPolicy: 'network-only',
  });

  const rates = data?.data || [];

  return {
    rates,
    loading,
    refetch,
  };
};

export default useRates;
