import type { UserType } from '@stoqey/client-graphql';
import {
  Background,
  Display,
  FontSize,
  InjectLayout,
  JustifyContent,
  Layout,
  Position,
  ZIndex,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import React from 'react';

import type { Badge, PairRate, WalletOutput } from '../types.generated';
import LeftNav from './LeftNav';
import RightNav from './RightNav';

export interface NavProps {
  theme?: string;
  user?: UserType;
  rates?: PairRate[];
  wallets?: WalletOutput[];
  badges?: Badge[];
}

export const Nav = (props: NavProps) => {
  return (
    <InjectLayout
      zIndex={ZIndex.Above}
      elevation={1}
      position={Position.Fixed}
      background={Background.Base}
      fullWidth
      border={BorderRadius.None}
    >
      <nav>
        <Layout
          display={Display.Flex}
          padding={1}
          fullWidth
          justifyContent={JustifyContent.Between}
          fontSize={FontSize.Size4}
          height="5rem"
        >
          <LeftNav {...props} />
          {/* <CenterNav {...props} /> */}
          <RightNav {...props} />
        </Layout>
      </nav>
    </InjectLayout>
  );
};

export default Nav;
