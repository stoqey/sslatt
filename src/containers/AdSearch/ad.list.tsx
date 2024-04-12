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
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import type {
  AdsSearchItemProps,
  IAdItem,
} from '@/components/AdLists/ads.item';
import { useAdsData } from '@/lib/hooks/useAds';

import AdsSearchItem, { parseAdItem } from '../../components/AdLists/ads.item';
import { renderLink } from '../../components/Link/link.utils';
import type { AdFiltersState } from './ad.filters';

interface AdSearchListProps {
  // ... search query
  filters?: AdFiltersState;
  resetFilters?: () => void;
  isPublic?: boolean;
  // ...action
  action?: 'edit' | 'checkout' | 'view';
  itemProps?: AdsSearchItemProps;
  viewMode?: AdsSearchItemProps['viewMode'];
}

export default function AdSearchList(props: AdSearchListProps) {
  const {
    // filters = "field1=wack&field2=zone6",
    isPublic = true,
    action = 'view',
    resetFilters,
    viewMode,
  } = props;

  const allfilters = {
    ...(props.filters || {}),
    subcategory: (props.filters || {}).category,
    category: null,
  };

  const query = useSearchParams();
  const { push } = useRouter();

  const search = (query.get('search') || '') as string;
  const before = new Date();

  const {
    ads = [],
    fetchOlder,
    hasNext,
  } = useAdsData({
    before: null,
    limit: 10,
    filters: allfilters,
    search,
    isPublic,
  });

  const adsItems: IAdItem[] = ads.map((ad) => parseAdItem(ad)); // todo convert from ads above

  const onNewAdClick = () => {
    push(`/store/ads/new`);
  };

  const onLinkTo = (item: IAdItem): string => {
    if (action === 'edit') {
      return `/store/ads/${item.id}`;
    }
    if (action === 'checkout') {
      return `/order/checkout/new?type=ad&typeId=${item.id}`;
    }
    return `/ad/${item.id}`;
  };

  const linkTo = (item: IAdItem) =>
    `/order/checkout/new?type=ad&typeId=${item.id}`;

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
          <Button
            onClick={() => {
              resetFilters();
              push(`/`, null, { shallow: true });
            }}
          >
            Reset filters
          </Button>
        </Layout>
      )}

      <Tower
        childWidth={TowerChildWidth.Medium}
        gutterSize={TowerGutter.ExtraSmall}
        placeholderItems={20}
      >
        {!isEmpty(adsItems) &&
          adsItems?.map((item) => (
            <AdsSearchItem
              key={item?.id}
              {...item}
              linkTo={onLinkTo(item)}
              {...props.itemProps}
              viewMode={viewMode}
            />
          ))}

        {!isPublic && (
          <MediaCard
            image={
              <MediaCardImage
                linkProps={{ renderLink, linkTo: '/store/ads/new' }}
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
