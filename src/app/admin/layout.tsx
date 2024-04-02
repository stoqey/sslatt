import React from 'react';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import AdminLayoutWrapper from './admin.layout';

const AdminLayout = ({ children }: any) => {
  return (
    <ApolloWrapper>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </ApolloWrapper>
  );
};

export default AdminLayout;
