'use client';

import {
  Column,
  Display,
  InjectLayout,
  JustifyContent,
  Layout,
} from '@uuixjs/uuixweb';

interface Props {
  size?: any;
  offset?: any;
  children?: any;
}

export const Container = (props: Props) => {
  const { offset, children, size = 6 } = props;
  return (
    <Layout>
      <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
        <Column
          cols={{ default: 12, md: size, lg: size, xl: size, xxl: size }}
          offset={offset}
        >
          <InjectLayout fullWidth>
            <div>{children}</div>
          </InjectLayout>
        </Column>
      </Layout>
    </Layout>
  );
};
