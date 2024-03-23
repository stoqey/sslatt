import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

const OrderLayout = ({ children }: any) => {
  return <ApolloWrapper>{children}</ApolloWrapper>;
};

export default OrderLayout;
