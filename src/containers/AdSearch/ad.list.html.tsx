import {
  AlignItems,
  Background,
  Button,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  MediaCard,
  MediaCardImage,
  SVGAsset,
  Tower,
  TowerChildWidth,
  TowerGutter,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import React from 'react';

import type {
  AdsSearchItemProps,
  IAdItem,
} from '../../components/AdLists/ads.item';
import AdsSearchItem, { parseAdItem } from '../../components/AdLists/ads.item';
import { renderLink } from '../../components/Link/link.utils';

export interface AdSearchListProps {
  isPublic?: boolean;
  // ...action
  action?: 'edit' | 'checkout' | 'view';
  itemProps?: AdsSearchItemProps;
  ads?: any;

  filters?: string;
}

export const onLinkToAd = (item: IAdItem, action: string): string => {
  if (action === 'edit') {
    return `/html/store/ads/${item.id}`;
  }
  if (action === 'checkout') {
    return `/html/order/checkout/new?type=ad&typeId=${item.id}`;
  }
  return `/html/ad/${item.id}`;
};

export default function AdSearchListHtml(props: AdSearchListProps) {
  const {
    // filters = "field1=wack&field2=zone6",
    isPublic = true,
    action = 'view',
    ads,
  } = props;

  const adsItems: IAdItem[] = ads.map((ad: any) => parseAdItem(ad)); // todo convert from ads above

  return (
    <Layout
      fullWidth
      fullHeight
      display={Display.Flex}
      backgroundColor={Background.Alt2}
      flexDirection={FlexDirection.Column}
    >
      {/* list */}
      {isEmpty(adsItems) && isPublic && (
        <Layout
          fullWidth
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          alignItems={AlignItems.Center}
        >
          <CoreText>No ads found, please try again</CoreText>
          <Link href="/html/">
            <Button type="button">Reset filters</Button>
          </Link>
        </Layout>
      )}

      <Tower
        childWidth={TowerChildWidth.Medium}
        gutterSize={TowerGutter.ExtraSmall}
        placeholderItems={20}
      >
        {!isEmpty(adsItems) &&
          adsItems?.map((item, index) => (
            <AdsSearchItem
              key={index}
              {...item}
              linkTo={onLinkToAd(item, action)}
              {...props.itemProps}
            />
          ))}

        {!isPublic && (
          <MediaCard
            image={
              <MediaCardImage
                linkProps={{ renderLink, linkTo: '/html/store/ads/new' }}
                cover={
                  <Layout
                    background={Background.AccentAlt}
                    fullWidth
                    fullHeight
                    display={Display.Flex}
                    flexDirection={FlexDirection.Column}
                    justifyContent={JustifyContent.Center}
                    alignItems={AlignItems.Center}
                  >
                    <CoreText>Create a new ad for your products</CoreText>
                    <br />
                    <Button icon={SVGAsset.New}>New Ad</Button>
                  </Layout>
                }
              />
            }
          />
        )}
      </Tower>
    </Layout>
  );
}
