/* eslint-disable react/jsx-no-useless-fragment */
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { awaitTo } from '@stoqey/client-graphql';
import {
  AlignItems,
  Avatar,
  Button,
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
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { IAdItem } from '@/components/AdLists/ads.item';
import { Container } from '@/components/container';
import { GET_USER_VENDOR_ADS_LISTING } from '@/lib/gql';
import { startChatFromUsers } from '@/lib/hooks';
import { cdnPath } from '@/lib/utils/api.utils';
import { loginCheck } from '@/lib/utils/auth.utils';
import { niceDec } from '@/lib/utils/number';

import AdsSearchItem, { parseAdItem } from '../../components/AdLists/ads.item';
import { renderLink } from '../../components/Link/link.utils';
import { RatingIcon } from '../../components/Rating';
import ReviewsContainer from '../Review/review';

interface Props {
  username: string;
  store?: boolean;
}

const UVAContainer = (props: Props) => {
  const { slug } = useParams();
  const client = useApolloClient();
  const router = useRouter();
  const { store: isStore = true } = props;
  const username = props.username || slug;

  const [state, setState] = useState({
    tabIndex: isStore ? 1 : 0,
  });

  const setActiveTab = (index: number) => {
    setState((prev) => ({ ...prev, tabIndex: index }));
  };

  const [getUserVendorAds, { data, loading }] = useLazyQuery(
    GET_USER_VENDOR_ADS_LISTING,
  );

  const {
    ads = [],
    store,
    user,
    userstats,
  } = _get(data, 'data.item', {
    item: { ads: [], store: { ratings: 0 }, user: null, userstats: null },
  });

  console.log('GET_USER_VENDOR_ADS_LISTING', {
    isStore,
    data,
    loading,
    ads,
    store,
    user,
  });

  useEffect(() => {
    if (!isEmpty(username)) {
      getUserVendorAds({ variables: { username } });
    }
  }, [username]);

  const memberSince = _get(user, 'createdAt', null);

  // TODO use last active
  const lastActive = _get(user, 'updatedAt', null);

  const userId = _get(user, 'id', '');
  const userName = _get(user, 'username', '');
  const aboutBio = _get(user, 'bio', '');
  const avatar = _get(user, 'avatar', '');
  const vendorAvatar = _get(store, 'avatar', avatar);
  const vendorAboutBio = _get(store, 'bio', aboutBio);
  const vendorStoreName = _get(store, 'name', userName);
  const vendorVacation = _get(store, 'vacation', false);
  const vendorSales = _get(store, 'salesCount', 0);
  const vendorViews = _get(store, 'viewsCount', 0);

  console.log('vendorProps', {
    avatar,
    aboutBio,
    userName,

    vendorAboutBio,
    vendorAvatar,
    vendorStoreName,
    vendorVacation,
    vendorSales,
    vendorViews,
  });
  const adsItems: IAdItem[] = ads.map((ad) => parseAdItem(ad)); // todo convert from ads above

  const tabs = !isStore
    ? [
        { label: 'About', onClick: () => setActiveTab(0) },
        { label: 'Reviews', onClick: () => setActiveTab(1) },
      ]
    : [
        { label: 'About', onClick: () => setActiveTab(0) },
        { label: 'Ads', onClick: () => setActiveTab(1) },
        { label: 'Reviews', onClick: () => setActiveTab(2) },
      ];

  const onLinkTo = (item: IAdItem): string => {
    // if (action === "edit") {
    //   return `/store/ads/${item.id}`;
    // } else if (action === "checkout") {
    //   return `/order/checkout/new?type=ad&typeId=${item.id}`;
    // }
    return `/ad/${item.id}`;
  };

  const onPressMessenger = async () => {
    const checkIfLoggedIn = await loginCheck();
    if (!checkIfLoggedIn) {
      // TODO: show login modal
      return;
    }
    // Check if user is loggedin
    const [errorconvo, chatConvo] = await awaitTo(
      startChatFromUsers({ client, friends: [user] }),
    );
    if (chatConvo) {
      const convoId = chatConvo.id;
      console.log('convoId', convoId);

      if (convoId) {
        return router.push(`/chat/${convoId}${window.location.search}`);
      }

      console.log('failed to start convo');
    }
  };

  return (
    <Layout fullWidth>
      <Layout
        margin={1}
        border={BorderRadius.Rounded}
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

            <Column cols={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
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
                  </Layout>
                )}
              </Layout>
            </Column>

            <Column
              style={{ display: 'flex' }}
              cols={{ xs: 12, sm: 12, md: 9, lg: 9 }}
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
                            title={Math.round(store?.ratings)}
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
                          {vendorSales && (
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
                          {store ? (
                            <CoreLink
                              linkTo={`/store/${userName}`}
                              renderLink={renderLink}
                            >
                              <CoreText
                                as="h4"
                                style={{ color: 'var(--color-text-link)' }}
                              >
                                View store
                              </CoreText>
                            </CoreLink>
                          ) : (
                            <></>
                          )}
                        </Layout>

                        <Layout>
                          {userstats && !Number.isNaN(userstats.spend) && (
                            <CoreText as="h4">{`Spent ${niceDec(
                              userstats.spend,
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
                        <Button
                          icon={SVGAsset.Whisper}
                          onClick={() => onPressMessenger()}
                        >
                          Chat
                        </Button>
                        <CoreText as="h4" />
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
        activeTabIndex={state.tabIndex}
        borderBottom={false}
        tabs={tabs}
      />

      <Layout>
        {/* About */}
        {state.tabIndex === 0 && (
          <Layout fullWidth padding={{ left: 2, right: 2, top: 1 }}>
            <CoreText as="h3" fontWeight={FontWeight.Regular}>
              {isStore ? vendorAboutBio : aboutBio}
            </CoreText>
          </Layout>
        )}

        {state.tabIndex === 1 && isStore && (
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
                    linkTo={onLinkTo(item)}
                  />
                ))}
              </Tower>
            </Layout>
          </Container>
        )}

        {/* User reviews */}
        {state.tabIndex === 1 && !isStore && (
          <Container size={9}>
            <ReviewsContainer filters={{ owner: userId }} />
          </Container>
        )}

        {/* Store Reviews */}
        {state.tabIndex === 2 && isStore && (
          <Container size={9}>
            <ReviewsContainer filters={{ seller: userId }} />
          </Container>
        )}
      </Layout>
    </Layout>
  );
};

export default UVAContainer;
