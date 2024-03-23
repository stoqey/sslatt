import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

const WalletLayout = ({ children }: any) => {
  return <ApolloWrapper>{children}</ApolloWrapper>;
};

export default WalletLayout;
