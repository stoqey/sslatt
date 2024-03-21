import { Display, Layout, Tab, TabWrapper, Title } from '@uuixjs/uuixweb';
import React from 'react';

export const TopNav = () => {
  return (
    <Layout display={Display.Flex} padding={1}>
      {/* {Object.keys(["some", "Menus"]).map((k, i) => (
                <Layout key={k} padding={{ left: i > 0 ? 1 : 0 }}>
                    <Title>{i}</Title>
                </Layout>
            ))} */}

      <Layout>
        <TabWrapper>
          <Tab active>
            {' '}
            <Title>Following</Title>
          </Tab>
          <Tab>
            <Title>Browse</Title>
          </Tab>
        </TabWrapper>
      </Layout>
    </Layout>
  );
};

export default TopNav;
