'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';

const AdminLayout = ({ children }: any) => {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client={false} isOpen={false} />
        <Layout fullWidth>{children}</Layout>
      </Layout>
    </LayoutPage>
  );
};

export default AdminLayout;
