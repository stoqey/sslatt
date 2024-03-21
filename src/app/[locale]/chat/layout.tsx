import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
