import Link from 'next/link';
import React from 'react';

export const renderLink = (props: any) => (
  <Link href={props.linkTo}>{props.children}</Link>
);
