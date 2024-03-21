import {
  AlignItems,
  Background,
  Button,
  ButtonSize,
  Column,
  CoreLink,
  CoreText,
  Display,
  FlexDirection,
  FontWeight,
  FormGroup,
  Grid,
  GridGutterSize,
  Icon,
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
import { usePathname } from 'next/navigation';
import React from 'react';
import ImageGallery from 'react-image-gallery';

import { PageNotFound } from '@/components/404s/NotFound';
import type {
  AdsListingOutput,
  OrderRatingOutput,
} from '@/components/types.generated';
import { cdnPath } from '@/lib/utils/api.utils';
import { niceDec } from '@/lib/utils/number';
import { parseCountryCode } from '@/lib/utils/text';

import { renderLink } from '../../components/Link/link.utils';
import { RatingIcon } from '../../components/Rating';
import ReviewsContainer from '../Review/review.html';

export interface ADPContainerHTMLProps {
  ad: AdsListingOutput;
  tab?: number;
  reviews?: OrderRatingOutput[];
}

const ADPContainer = (props: ADPContainerHTMLProps) => {
  const { ad, tab = 0, reviews = [] } = props;

  const pathname = usePathname();

  if (isEmpty(ad)) {
    // TODO 404
    return (
      <PageNotFound
        title="Ad not found"
        message="The Ad listing you are looking was not found"
      />
    );
  }

  const {
    title,
    price,
    country,
    shipsFrom,
    shipsTo,
    description,
    ratings = 0,
    ratingsCount = 0,
    reviewsCount = 0,
    salesCount = 0,
  } = ad;

  const adImages = (ad.photos || []).map((photo) => ({
    original: cdnPath(photo),
    thumbnail: cdnPath(photo),
    originalHeight: 250,
    // thumbnailHeight: 70,
  }));

  const AdImage = () => {
    const emptyAdImages = isEmpty(adImages);

    return (
      <Layout fullWidth padding={1}>
        {!emptyAdImages ? (
          <ImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showNav={false}
            items={adImages}
          />
        ) : (
          <Layout
            fullHeight
            fullWidth
            display={Display.Flex}
            justifyContent={JustifyContent.Center}
          >
            <Layout
              background={Background.Overlay}
              style={{ width: '250px', height: '250px' }}
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              justifyContent={JustifyContent.Center}
              alignItems={AlignItems.Center}
            >
              <Icon asset={SVGAsset.MediaImage} />
            </Layout>
          </Layout>
        )}
      </Layout>
    );
  };

  const tabs = [
    { label: 'About', linkTo: `/html/ad/${ad.id}` },
    {
      label: `Reviews ${
        isEmpty([reviewsCount]) || !reviewsCount ? '' : `(${reviewsCount})`
      }`,
      linkTo: `/html/ad/${ad.id}/reviews`,
    },
  ];

  const userName = _get(ad, 'owner.username', '');
  // const description = _get(ad, "description", "");

  // console.log("ad", ad);

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
              {/* IMAGE */}
              <AdImage />
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

                    {!isEmpty(userName) && (
                      <Layout
                        display={Display.Flex}
                        justifyContent={JustifyContent.Between}
                        padding={1}
                      >
                        <CoreLink
                          linkTo={`/html/store/${userName}`}
                          renderLink={renderLink}
                        >
                          <CoreText
                            as="h4"
                            style={{ color: 'var(--color-text-link)' }}
                          >
                            @{userName}
                          </CoreText>
                        </CoreLink>

                        {salesCount && (
                          <CoreText as="h4">sold {salesCount}</CoreText>
                        )}
                      </Layout>
                    )}

                    {/* <Layout
                      display={Display.Flex}
                      justifyContent={JustifyContent.Between}
                      padding={1}
                    >
                      <CoreText as="h4">Physical</CoreText>
                      <CoreText as="h4"> x in stock</CoreText>
                    </Layout> */}

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
                    <Layout
                      style={{ height: 2, background: 'grey', opacity: 0.4 }}
                    />
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
                    >
                      <CoreText as="h4">Ships from :</CoreText>
                      <CoreText as="h4">{parseCountryCode(shipsFrom)}</CoreText>
                    </Layout>
                    <Layout
                      fullWidth
                      display={Display.Flex}
                      justifyContent={JustifyContent.Between}
                      margin={{ bottom: 1 }}
                    >
                      <CoreText as="h4">Ships to :</CoreText>
                      <CoreText as="h4">{parseCountryCode(shipsTo)}</CoreText>
                    </Layout>

                    <form action="/api/order/checkout">
                      <input
                        type="hidden"
                        name="pathname"
                        value={pathname}
                        hidden
                      />
                      <input type="hidden" name="type" value="ad" hidden />
                      <input
                        type="hidden"
                        name="typeId"
                        value={`${ad.id}`}
                        hidden
                      />
                      <FormGroup label="Quantity">
                        <Input
                          size={InputSize.Large}
                          type={InputType.Number}
                          name="qty"
                          icon={SVGAsset.Edit}
                          iconRight
                          defaultValue="1"
                        />
                      </FormGroup>

                      {/* Checkout */}
                      <Layout padding={{ top: 1 }} fullWidth>
                        <Button fullWidth type="submit" size={ButtonSize.Large}>
                          Checkout
                        </Button>
                      </Layout>
                    </form>
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
                __html: (description || '').replaceAll('\n', '<br />'),
              }}
            />
          </Layout>
        )}

        {/* Reviews */}
        {tab === 1 && (
          <Layout fullWidth padding={1}>
            <ReviewsContainer ratings={reviews} />
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

export default ADPContainer;
