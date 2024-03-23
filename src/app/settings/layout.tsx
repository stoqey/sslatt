import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

const SettingsLayout = ({ children }: any) => {
  return <ApolloWrapper>{children}</ApolloWrapper>;
};

export default SettingsLayout;
