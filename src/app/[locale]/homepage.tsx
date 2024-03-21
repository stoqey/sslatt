'use client';

import type { AuthWallProps } from '@/components/AuthWall/authwall';
import { AuthWall } from '@/components/AuthWall/authwall';

export const HomepagePage = (props: AuthWallProps) => {
  return <AuthWall {...props} />;
};

export default HomepagePage;
