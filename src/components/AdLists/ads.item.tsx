import type { UserType } from '@roadmanjs/auth-client';
import {
  AlignItems,
  Avatar,
  Background,
  CoreImage,
  CoreLink,
  Display,
  FlexDirection,
  Icon,
  JustifyContent,
  Layout,
  MediaCard,
  MediaCardImage,
  MediaCardMeta,
  MediaCardStat,
  MediaCardTitle,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { cdnPath } from '@/lib/utils/api.utils';
import { niceDec } from '@/lib/utils/number';
import { parseCountryCode } from '@/lib/utils/text';

import { renderLink } from '../Link/link.utils';
import { RatingIcon } from '../Rating';

export interface IAdItem {
  id?: string;
  image?: any;
  name?: string;
  category: string;

  favorite?: boolean; // TODO

  title?: string;
  description?: string;
  owner?: UserType;

  price: number;
  views: number;
  ratings?: number;
  ratingsCount?: number; // not required
  reviews?: number;
  sales?: number;
  shipsFrom?: string;
  shipsTo?: string;
}

export const parseAdItem = (ad: any): IAdItem => ({
  id: ad.id,
  name: ad.name,
  image: ad.photos && ad.photos[0],
  category: ad.category,
  title: ad.title,
  description: ad.description,
  views: ad.viewsCount,
  ratings: ad.ratings,
  reviews: ad.reviewsCount,
  price: ad.price,
  owner: ad.owner,
  sales: ad.salesCount,
  shipsFrom: ad.shipsFrom,
  shipsTo: ad.shipsTo,
});

export interface AdsSearchItemProps {
  viewMode?: 'list' | 'grid';
  linkTo?: string; // link to main\
  meta?: boolean;
  // links to meta media
}

type Props = IAdItem & AdsSearchItemProps;

export default function AdsSearchItem(props: Props) {
  const {
    image,
    viewMode = 'grid',
    id: adId,
    linkTo,
    meta = true,
    views,
    sales,
    reviews,
    ratings,
    category,
    price,
    ratingsCount,
    shipsFrom = '',
    shipsTo = '',
  } = props;

  const title = `${props.title ?? ''}`;
  const description = `${props.description ?? ''}`;

  const adImage = cdnPath(image);
  const ownerAvatar = cdnPath(_get(props, 'owner.avatar', image));
  const ownerUsername = _get(props, 'owner.username', '');

  const linkToStore = linkTo?.startsWith('/html')
    ? `/html/store/${ownerUsername}`
    : `/store/${ownerUsername}`;

  switch (viewMode) {
    case 'list':
      return (
        <MediaCard
          meta={
            <MediaCardMeta
              image={
                <CoreLink renderLink={renderLink} linkTo={linkTo} targetBlank>
                  {isEmpty(adImage) ? (
                    <Avatar
                      borderRadius={BorderRadius.None}
                      size={60}
                      alt={title}
                      userLogin={title}
                    />
                  ) : (
                    <CoreImage src={adImage} alt={title} />
                  )}
                </CoreLink>
              }
              title={{
                linkTo,
                lines: 2,
                children: title,
                renderLink,
              }}
              links={
                !meta
                  ? []
                  : [
                      {
                        linkTo,
                        children: description,
                        renderLink,
                      },
                    ]
              }
            />
          }
        />
      );

    default:
    case 'grid':
      return (
        <MediaCard
          image={
            <MediaCardImage
              linkProps={{
                linkTo,
                renderLink,
              }}
              image={
                !isEmpty(adImage) && <CoreImage src={adImage} alt={title} />
              }
              topLeft={
                <MediaCardStat children={category} icon={SVGAsset.Browse} />
              }
              topRight={
                !isEmpty(shipsFrom) &&
                !isEmpty(shipsTo) && (
                  <Layout display={Display.Flex}>
                    <MediaCardStat children={parseCountryCode(shipsFrom)} />
                    <MediaCardStat
                      icon={SVGAsset.ArrowRight}
                      children={parseCountryCode(shipsTo)}
                    />
                  </Layout>
                )
              }
              bottomLeft={
                !isEmpty([price]) && <MediaCardStat children={niceDec(price)} />
              }
              bottomRight={
                <Layout display={Display.Flex}>
                  {!isEmpty([ratings]) && (
                    <Layout padding={{ right: 1 }}>
                      <MediaCardStat
                        children={
                          <RatingIcon
                            size={19}
                            rating={ratings}
                            title={Math.round(ratings)}
                          />
                        }
                      />
                    </Layout>
                  )}

                  {sales && sales >= 1 && (
                    <MediaCardStat
                      icon={SVGAsset.NavDashboard}
                      children={sales}
                    />
                  )}
                </Layout>
              }
              cover={
                isEmpty(image) && (
                  <Layout
                    background={Background.Overlay}
                    fullWidth
                    fullHeight
                    display={Display.Flex}
                    flexDirection={FlexDirection.Column}
                    justifyContent={JustifyContent.Center}
                    alignItems={AlignItems.Center}
                  >
                    <Icon asset={SVGAsset.MediaImage} />
                  </Layout>
                )
              }
            />
          }
          meta={
            meta ? (
              <MediaCardMeta
                image={
                  <CoreLink
                    linkTo={isEmpty(ownerUsername) ? linkTo : linkToStore}
                    renderLink={renderLink}
                  >
                    <Avatar
                      src={!isEmpty(ownerAvatar) && ownerAvatar}
                      alt={ownerUsername}
                      size={50}
                      userLogin={ownerUsername}
                    />
                  </CoreLink>
                }
                title={{
                  lines: 1,
                  linkTo,
                  renderLink,
                  children: title,
                }}
                links={[
                  // {
                  //   linkTo: "#",
                  //   children: ownerUsername,
                  // },
                  {
                    linkTo: isEmpty(ownerUsername) ? '#' : linkToStore,
                    renderLink,
                    children: isEmpty(ownerUsername) ? '' : `${ownerUsername}`,
                  },
                ]}
              />
            ) : (
              <MediaCardTitle lines={1}>{title}</MediaCardTitle>
            )
          }
        />
      );
  }
}
