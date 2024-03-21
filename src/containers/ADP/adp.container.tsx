import { useLazyQuery } from '@apollo/client';
import {
  Button,
  ButtonSize,
  Column,
  CoreLink,
  CoreText,
  Display,
  FontWeight,
  FormGroup,
  Grid,
  GridGutterSize,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  LineHeight,
  Overflow,
  SVGAsset,
  Tabs,
  TabSize,
  TextType,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import type { AdsListingOutput } from '@/lib/gql';
import { GET_AD_LISTING } from '@/lib/gql';
import { niceDec } from '@/lib/utils/number';

import { renderLink } from '../../components/Link/link.utils';
import { RatingIcon } from '../../components/Rating';
import ReviewsContainer from '../Review/review';

const ADPContainer = () => {
  const router = useRouter();
  const { push } = router;
  const { slug } = useParams();

  const [state, setState] = useState({
    tabIndex: 0,
    qty: 1,
  });

  const [getAdListing, { loading = true, data, called }] = useLazyQuery<{
    data: AdsListingOutput;
  }>(GET_AD_LISTING, {
    fetchPolicy: 'network-only',
  });

  const setActiveTab = (index: number) => {
    setState((prev) => ({ ...prev, tabIndex: index }));
  };

  useEffect(() => {
    if (!isEmpty(slug)) {
      getAdListing({ variables: { id: slug } });
    }
  }, [slug]);

  const ad: AdsListingOutput = (data && data.data) || ({} as any);
  const {
    title,
    price,
    country,
    description,
    ratings = 0,
    ratingsCount = 0,
    reviewsCount = 0,
  } = ad;
  const adImages = (ad.photos || []).map((photo) => ({
    original: photo,
    thumbnail: photo,
    originalHeight: 250,
    // thumbnailHeight: 70,
  }));

  const tabs = [
    { label: 'About', onClick: () => setActiveTab(0) },
    {
      label: `Reviews ${
        isEmpty([reviewsCount]) || !reviewsCount ? '' : `(${reviewsCount})`
      }`,
      onClick: () => setActiveTab(1),
    },
  ];

  const userName = _get(ad, 'owner.username', '');
  // const description = _get(ad, "description", "");

  console.log('ad', ad);

  // TODO add qty
  const checkoutLink = () => {
    push(`/order/checkout/new?type=ad&typeId=${ad.id}&qty=${state.qty}`);
  };

  return (
    <Layout fullWidth>
      {/* <Layout
        padding={{ top: 1, left: 2, right: 4, bottom: 1 }}
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
          // ellipsis
        >
          <CoreText
            type={TextType.H2}
            // fontSize={FontSize.Size5}
            lineHeight={LineHeight.Heading}
            ellipsis
          >
            {title}
          </CoreText>
        </Layout>

        <CoreText type={TextType.H2}>.....</CoreText>
      </Layout> */}
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
                <Layout
                  flexGrow={1}
                  flexShrink={1}
                  overflow={Overflow.Hidden}
                  // ellipsis
                >
                  <CoreText
                    type={TextType.H2}
                    // fontSize={FontSize.Size5}
                    lineHeight={LineHeight.Heading}
                    // ellipsis
                    lines={2}
                  >
                    {title}
                  </CoreText>
                </Layout>
              </Layout>
            </Column>
            <Column cols={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
              <Layout fullWidth padding={1}>
                {!isEmpty(adImages) && <ImageGallery items={adImages} />}
              </Layout>
            </Column>

            <Column cols={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
              <Grid style={{ height: '100%' }} gutterSize={GridGutterSize.None}>
                {/* Title desktop */}
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
                        lines={2}
                      >
                        {title}
                      </CoreText>
                    </Layout>
                  </Layout>
                </Column>

                <Column
                  cols={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    // background: "blue",
                  }}
                >
                  <Layout
                    fullWidth
                    // style={{ background: "green" }}
                  >
                    <Layout
                      fullWidth
                      display={Display.Flex}
                      justifyContent={JustifyContent.End}
                      padding={{ left: 1, right: 1 }}
                    >
                      <RatingIcon rating={ratings} title={`${ratingsCount}`} />
                    </Layout>

                    <Layout
                      fullWidth
                      display={Display.Flex}
                      justifyContent={JustifyContent.Between}
                      padding={{ left: 1, right: 1 }}
                    >
                      <CoreText
                        as="h2"
                        style={{ color: 'var(--color-text-link)' }}
                      >
                        {niceDec(price)}
                      </CoreText>
                      {/* <RatingIcon rating={4} title="4 (3k)" /> */}
                    </Layout>

                    <Layout
                      display={Display.Flex}
                      justifyContent={JustifyContent.Between}
                      padding={1}
                    >
                      <CoreLink
                        linkTo={!isEmpty(userName) ? `/store/${userName}` : '#'}
                        renderLink={renderLink}
                      >
                        <CoreText
                          as="h4"
                          style={{ color: 'var(--color-text-link)' }}
                        >
                          @{userName}
                        </CoreText>
                      </CoreLink>

                      <CoreText as="h4">sold x</CoreText>
                    </Layout>

                    <Layout
                      display={Display.Flex}
                      justifyContent={JustifyContent.Between}
                      padding={1}
                    >
                      <CoreText as="h4">Physical</CoreText>
                      <CoreText as="h4"> x in stock</CoreText>
                    </Layout>

                    {/* {new Array(2).fill(0).map((_, i) => (
                      <Layout
                        key={i}
                        display={Display.Flex}
                        justifyContent={JustifyContent.Between}
                        padding={1}
                      >
                        <CoreText as="h4">Label for {i} :</CoreText>
                        <CoreText as="h4">{i}</CoreText>
                      </Layout>
                    ))} */}
                    {/* use divider */}
                    <Layout style={{ height: 2, background: 'grey' }} />
                  </Layout>
                </Column>
                <Column
                  cols={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Layout fullWidth padding={1}>
                    {/* TODO shipTo, shipFrom, shipOptions */}
                    {/* {new Array(4).fill(0).map((_, i) => (
                      <Layout
                        key={i}
                        display={Display.Flex}
                        justifyContent={JustifyContent.Between}
                        padding={1}
                      >
                        <CoreText as="h4">Label for {i} :</CoreText>
                        <CoreText as="h4">{i}</CoreText>
                      </Layout>
                    ))} */}

                    <Layout
                      fullWidth
                      display={Display.Flex}
                      justifyContent={JustifyContent.Between}
                      padding={1}
                    >
                      <CoreText as="h4">Ships from :</CoreText>
                      <CoreText as="h4">{country}</CoreText>
                    </Layout>

                    {/* Option */}
                    {/* Qty */}
                    <FormGroup label="Quantity">
                      <Input
                        fullWidth
                        size={InputSize.Large}
                        type={InputType.Number}
                        name="quantity"
                        value={state.qty as any}
                        onChange={(e: any) =>
                          setState({ ...state, qty: e.target.value })
                        }
                        icon={SVGAsset.Edit}
                        iconRight
                        defaultValue="1"
                      />
                    </FormGroup>

                    {/* Checkout */}
                    <Layout padding={{ top: 1 }} fullWidth>
                      <Button
                        size={ButtonSize.Large}
                        onClick={checkoutLink}
                        fullWidth
                      >
                        Checkout
                      </Button>
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
              {description}
            </CoreText>
          </Layout>
        )}

        {/* Reviews */}
        {state.tabIndex === 1 && (
          <Layout fullWidth padding={1}>
            <ReviewsContainer filters={{ typeId: ad.id }} />
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

export default ADPContainer;
