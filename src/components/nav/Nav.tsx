// import { Tickers } from "../../containers/St3/Ticker";
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
import React from 'react';

import CenterNav from './CenterNav';
import LeftNav from './LeftNav';
import RightNav from './RightNav';

export interface NavProps {
  user?: UserType;
}

export const Nav = (props: NavProps) => {
  return (
    <InjectLayout
      zIndex={ZIndex.Above}
      elevation={1}
      position={Position.Fixed}
      background={Background.Base}
      fullWidth
      {...props}
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
          <LeftNav />
          <CenterNav />
          <RightNav {...props} />
        </Layout>
        {/* {isStq && !isTor ? <Tickers /> : null} */}
      </nav>
    </InjectLayout>
  );
};

export default Nav;
