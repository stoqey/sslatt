import {
  AlignItems,
  Avatar,
  Button,
  ButtonType,
  Column,
  CoreLink,
  CoreText,
  Display,
  FlexDirection,
  FontWeight,
  Grid,
  GridGutterSize,
  JustifyContent,
  Layout,
  LineHeight,
  Overflow,
  Pill,
  PillType,
  PresenceStatus,
  SVGAsset,
  Tabs,
  TabSize,
  TextType,
  Tower,
  TowerChildWidth,
  TowerGutter,
  VerticalAlign,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import React from 'react';

import { PageNotFound } from '@/components/404s/NotFound';
import { Container } from '@/components/container';
import type {
  OrderRatingOutput,
  UserType,
  UserVendorAdsListingPage,
} from '@/components/types.generated';
import { cdnPath } from '@/lib/utils/api.utils';
import { niceDec } from '@/lib/utils/number';

import type { IAdItem } from '../../components/AdLists/ads.item';
import AdsSearchItem, { parseAdItem } from '../../components/AdLists/ads.item';
import { renderLink } from '../../components/Link/link.utils';
import { RatingIcon } from '../../components/Rating';
import { onLinkToAd } from '../AdSearch/ad.list.html';
import ReviewsContainer from '../Review/review.html';

export interface UVAContainerHtmlProps {
  user: UserType;
  username: string;
  store?: boolean;
  data: UserVendorAdsListingPage;
  tab?: number;
  reviews?: OrderRatingOutput[];
}

const UVAContainerHtml = (props: UVAContainerHtmlProps) => {
  const userData = _get(props, 'data.item.user', null);
  const pathname = usePathname();

  if (isEmpty(userData)) {
    // TODO better error page
    return (
      <PageNotFound
        icon={SVGAsset.Warning}
        title={`${props.store ? 'Store' : 'User'} Not found`}
        message="Not found, please try again."
      />
    );
  }

  const {
    store: isStore = true,
    data,
    tab = 0,
    reviews = [],
    user: authUser,
  } = props;

  const {
    ads = [],
    store,
    user,
    userstats,
  } = data.item || {
    ads: [],
    store: { ratings: 0 },
    user: null,
    userstats: null,
  };

  // console.log("GET_USER_VENDOR_ADS_LISTING", {
  //   isStore,
  //   data,
  //   ads,
  //   store,
  //   user,
  // });

  const memberSince = _get(user, 'createdAt', null);

  // TODO use last active
  const lastActive = _get(user, 'updatedAt', null);

  const userId = _get(user, 'id', '');
  const userName = _get(user, 'username', '');
  const aboutBio = _get(user, 'bio', '');
  const avatar = _get(user, 'avatar', '');
  const vendorAvatar = _get(store, 'avatar', avatar);
  const vendorAboutBio = _get(store, 'bio', aboutBio);
  const vendorStoreName = isEmpty(store?.name) ? userName : store?.name;
  const vendorVacation = _get(store, 'vacation', false);
  const vendorSales = _get(store, 'salesCount', 0);

  const isMyProfile = authUser?.username === userName;

  // console.log("vendorProps", {
  //   avatar,
  //   aboutBio,
  //   userName,
  //   vendorAboutBio,
  //   vendorAvatar,
  //   vendorStoreName,
  //   vendorVacation,
  //   vendorSales,
  //   vendorViews,
  // });
  const adsItems: IAdItem[] = ads?.map((ad) => parseAdItem(ad)) as IAdItem[]; // todo convert from ads above

  const tabs = !isStore
    ? [
        { label: 'About', linkTo: `/html/u/${userName}` },
        { label: 'Reviews', linkTo: `/html/u/${userName}/reviews` },
      ]
    : [
        { label: 'About', linkTo: `/html/store/${userName}` },
        { label: 'Ads', linkTo: `/html/store/${userName}/ads` },
        { label: 'Reviews', linkTo: `/html/store/${userName}/reviews` },
      ];

  const StartChatForm = () => {
    return isMyProfile ? null : (
      <Layout
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        padding={1}
      >
        <form action="/api/chat/start" method="POST">
          <input hidden name="pathname" defaultValue={pathname} />
          <input hidden name="friendId" defaultValue={userId as string} />
          <Layout
            flexDirection={FlexDirection.Column}
            display={Display.Flex}
            alignItems={AlignItems.Center}
          >
            <Button
              icon={SVGAsset.Whisper}
              variant={ButtonType.Primary}
              type="submit"
            >
              Chat
            </Button>
            <CoreText as="h4" />
          </Layout>
        </form>
      </Layout>
    );
  };
  return (
    <Layout fullWidth>
      <Layout
        margin={1}
        border
        padding={{ top: 2, left: 2, right: 4, bottom: 2 }}
      >
        <Layout fullWidth margin={0}>
          {/* <AdsDetailsContainer id={slug as any} pathname={router.pathname} /> */}

          <Grid>
            {/* title mobile */}
            <Column cols={{ default: 12 }}>
              <Layout
                padding={{ top: 1, left: 2, right: 4, bottom: 1 }}
                display={Display.Flex}
                breakpointExtraSmall={{ display: Display.Flex }}
                breakpointSmall={{ display: Display.Flex }}
                breakpointMedium={{ display: Display.Hide }}
                breakpointLarge={{ display: Display.Hide }}
                breakpointExtraLarge={{ display: Display.Hide }}
              >
                <Layout flexGrow={1} flexShrink={1} overflow={Overflow.Hidden}>
                  <CoreText
                    style={{
                      textAlign: 'center',
                      color: 'var(--color-text-link)',
                      textTransform: 'uppercase',
                    }}
                    align={VerticalAlign.TextBottom}
                    type={TextType.H2}
                    lineHeight={LineHeight.Heading}
                    lines={1}
                  >
                    {isStore ? vendorStoreName : userName}
                  </CoreText>
                </Layout>
              </Layout>
            </Column>

            <Column cols={{ default: 12, xs: 12, sm: 12, md: 3, lg: 3 }}>
              <Layout
                fullWidth
                padding={1}
                display={Display.Flex}
                flexDirection={FlexDirection.Column}
                alignItems={AlignItems.Center}
                justifyContent={JustifyContent.Center}
              >
                {isStore ? (
                  <Layout padding={1} style={{ display: 'relative' }}>
                    <Avatar
                      size={120}
                      alt=""
                      userLogin={userName}
                      presenceIndicator
                      presenceStatus={PresenceStatus.Online}
                      borderRadius={BorderRadius.Large}
                      src={cdnPath(
                        !isEmpty(vendorAvatar) ? vendorAvatar : avatar,
                      )}
                    />

                    <StartChatForm />
                  </Layout>
                ) : (
                  <Layout margin={0.5}>
                    <Avatar
                      size={120}
                      alt=""
                      userLogin={userName}
                      presenceIndicator
                      presenceStatus={PresenceStatus.Online}
                      src={cdnPath(avatar)}
                    />
                    <StartChatForm />
                  </Layout>
                )}
              </Layout>
            </Column>

            <Column
              style={{ display: 'flex' }}
              cols={{ default: 12, xs: 12, sm: 12, md: 9, lg: 9 }}
            >
              <Grid gutterSize={GridGutterSize.None} style={{ flex: 1 }}>
                {/* Store name desktop */}
                <Column
                  cols={{ default: 12 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Layout
                    padding={{ left: 1, right: 1, bottom: 1 }}
                    display={Display.Flex}
                    breakpointExtraSmall={{ display: Display.Hide }}
                    breakpointSmall={{ display: Display.Hide }}
                    breakpointMedium={{ display: Display.Flex }}
                    breakpointLarge={{ display: Display.Flex }}
                    breakpointExtraLarge={{ display: Display.Flex }}
                  >
                    <Layout
                      flexGrow={1}
                      flexShrink={1}
                      overflow={Overflow.Hidden}
                    >
                      <CoreText
                        type={TextType.H2}
                        lineHeight={LineHeight.Heading}
                        lines={1}
                        style={{
                          color: 'var(--color-text-link)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {isStore ? vendorStoreName : userName}
                      </CoreText>
                    </Layout>
                  </Layout>
                </Column>

                <Column cols={{ default: 12 }}>
                  <Layout
                    fullWidth
                    // style={{ background: "green" }}
                  >
                    {isStore ? (
                      <>
                        {vendorVacation && (
                          <Layout
                            display={Display.Flex}
                            justifyContent={JustifyContent.Center}
                            padding={{ left: 1, right: 1, bottom: 1 }}
                          >
                            <Pill
                              type={PillType.Live}
                              label="VACATION"
                              style={{ fontSize: '15px' }}
                            />
                          </Layout>
                        )}
                        <Layout
                          display={Display.Flex}
                          justifyContent={JustifyContent.Center}
                          padding={{ left: 1, right: 1 }}
                        >
                          {/* <CoreText
                            as="h4"
                            style={{ color: "var(--color-text-link)" }}
                          >
                            TRUST
                          </CoreText> */}
                          {/* <Layout></Layout> */}
                          <RatingIcon
                            rating={store?.ratings}
                            title={store?.ratings && Math.round(store?.ratings)}
                          />
                        </Layout>

                        <Layout
                          display={Display.Flex}
                          justifyContent={JustifyContent.Between}
                          padding={1}
                        >
                          <CoreText
                            as="h4"
                            style={{ color: 'var(--color-text-link)' }}
                          >
                            @{userName}
                          </CoreText>
                          {vendorSales && vendorSales >= 1 && (
                            <CoreText as="h4">sold {vendorSales}</CoreText>
                          )}
                        </Layout>

                        {/* <Layout
                          display={Display.Flex}
                          justifyContent={JustifyContent.Between}
                          padding={1}
                        >
                          <CoreText as="h4">Physical</CoreText>
                          <CoreText as="h4"> x in stock</CoreText>
                        </Layout> */}
                      </>
                    ) : (
                      <Layout
                        display={Display.Flex}
                        justifyContent={JustifyContent.Between}
                        padding={1}
                      >
                        <Layout>
                          {store && (
                            <CoreLink
                              linkTo={`/html/store/${userName}`}
                              renderLink={renderLink}
                            >
                              <CoreText
                                as="h4"
                                style={{ color: 'var(--color-text-link)' }}
                              >
                                View store
                              </CoreText>
                            </CoreLink>
                          )}
                        </Layout>

                        <Layout>
                          {userstats && !Number.isNaN(userstats.spent) && (
                            <CoreText as="h4">{`Spent ${niceDec(
                              userstats?.spent,
                            )}`}</CoreText>
                          )}
                        </Layout>
                      </Layout>
                    )}

                    <Layout
                      display={Display.Flex}
                      justifyContent={JustifyContent.Between}
                      padding={1}
                    >
                      <Layout
                        flexDirection={FlexDirection.Column}
                        display={Display.Flex}
                        alignItems={AlignItems.Center}
                      >
                        <CoreText>Last active</CoreText>
                        <CoreText as="h4">
                          {lastActive
                            ? moment(new Date(lastActive)).fromNow()
                            : null}
                        </CoreText>
                      </Layout>

                      <Layout
                        flexDirection={FlexDirection.Column}
                        display={Display.Flex}
                        alignItems={AlignItems.Center}
                      >
                        <CoreText>Member since</CoreText>
                        <CoreText as="h4">
                          {memberSince
                            ? moment(new Date(memberSince)).fromNow(true)
                            : null}
                        </CoreText>
                      </Layout>
                    </Layout>
                  </Layout>
                </Column>
              </Grid>
            </Column>
          </Grid>
        </Layout>
      </Layout>

      {/* Tabs */}
      <Tabs
        size={TabSize.Large}
        justifyContent={JustifyContent.Center}
        activeTabIndex={tab}
        borderBottom={false}
        tabs={tabs}
      />

      <Layout>
        {/* About */}
        {tab === 0 && (
          <Layout fullWidth padding={{ left: 2, right: 2, top: 1 }}>
            <CoreText
              as="h3"
              fontWeight={FontWeight.Regular}
              dangerouslySetInnerHTML={{
                __html: (
                  (isStore ? vendorAboutBio : aboutBio) || ''
                ).replaceAll('\n', '<br />'),
              }}
            />
          </Layout>
        )}

        {tab === 1 && isStore && (
          <Container size={9}>
            <Layout margin={{ top: 1 }}>
              <Tower
                childWidth={TowerChildWidth.Medium}
                gutterSize={TowerGutter.ExtraSmall}
                placeholderItems={20}
              >
                {adsItems?.map((item) => (
                  <AdsSearchItem
                    meta={false}
                    key={item.id}
                    {...item}
                    linkTo={onLinkToAd(item, 'view')}
                  />
                ))}
              </Tower>
            </Layout>
          </Container>
        )}

        {/* User reviews */}
        {tab === 1 && !isStore && (
          <Container size={9}>
            <ReviewsContainer ratings={reviews} />
          </Container>
        )}

        {/* Store Reviews */}
        {tab === 2 && isStore && (
          <Container size={9}>
            <ReviewsContainer ratings={reviews} />
          </Container>
        )}
      </Layout>
    </Layout>
  );
};

export default UVAContainerHtml;
