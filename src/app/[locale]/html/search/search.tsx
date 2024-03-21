/* eslint-disable @next/next/no-img-element */

'use client';

import {
  Color,
  Column,
  CoreText,
  Display,
  FlexDirection,
  FontWeight,
  Grid,
  GridGutterSize,
  JustifyContent,
  Layout,
  MediaCardStat,
  SVGAsset,
} from '@uuixjs/uuixweb';
import React from 'react';

import type {
  AdCategoryType,
  AdsListingOutputPagination,
  SiteSettings,
} from '@/components/types.generated';
import type { AdFiltersState } from '@/containers/AdSearch/ad.filters.html';
import AdFilters from '@/containers/AdSearch/ad.filters.html';
import AdSearchListHtml from '@/containers/AdSearch/ad.list.html';

const bannerStyle = { opacity: 0.3 };

// const TopBanners = () => {
//   const maxHeight = '150px';
//   const imgStyle = {
//     ...bannerStyle,
//     maxHeight,
//   };

//   return (
//     <InjectLayout fullWidth>
//       <Grid>
//         <Column cols={3}>
//           <Layout
//             fullWidth
//             fullHeight
//             alignItems={JustifyContent.Center}
//             display={Display.Flex}
//             flexDirection={FlexDirection.Column}
//           >
//             <img style={imgStyle} src="/sslatt-sq.png" />
//             <CoreText
//               textAlign="center"
//               children="Advertise here"
//               fontWeight={FontWeight.Bold}
//               color={Color.Alt2}
//             />
//           </Layout>
//         </Column>
//         <Column cols={6}>
//           <Layout
//             fullWidth
//             fullHeight
//             justifyContent={JustifyContent.Center}
//             display={Display.Flex}
//             flexDirection={FlexDirection.Column}
//           >
//             <img style={imgStyle} src="/slatt-slime.gif" />
//             <CoreText
//               textAlign="center"
//               children="Advertise here"
//               fontWeight={FontWeight.Bold}
//               color={Color.Alt2}
//             />
//           </Layout>
//           {/*  */}
//         </Column>
//         <Column cols={3}>
//           <Layout
//             fullWidth
//             fullHeight
//             alignItems={JustifyContent.Center}
//             display={Display.Flex}
//             flexDirection={FlexDirection.Column}
//           >
//             <img style={imgStyle} src="/sslatt-sq-2.png" />
//             <CoreText
//               textAlign="center"
//               children="Advertise here"
//               fontWeight={FontWeight.Bold}
//               color={Color.Alt2}
//             />
//           </Layout>
//         </Column>
//       </Grid>
//     </InjectLayout>
//   );
// };

const SideBanner = () => {
  return (
    <Layout fullWidth>
      <img
        alt="Advertise here"
        style={bannerStyle}
        src="/sslatt-ad-rect.jpeg"
      />
      <CoreText fontWeight={FontWeight.Bold} color={Color.Alt2}>
        Advertise here
      </CoreText>
    </Layout>
  );
};

interface FooterProps {
  siteSettings?: SiteSettings;
}
const Footer = (props: FooterProps) => {
  const { siteSettings = {} as any } = props;
  const adCount = siteSettings.adCount || 0;
  const userCount = siteSettings.userCount || 0;
  const vendorCount = siteSettings.vendorCount || 0;

  return (
    <Layout>
      <Layout
        margin={{ top: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Between}
        flexDirection={FlexDirection.Column}
      >
        <MediaCardStat
          icon={SVGAsset.Account}
        >{`${userCount} clients`}</MediaCardStat>
        <MediaCardStat
          icon={SVGAsset.NavDashboard}
        >{`${vendorCount} stores`}</MediaCardStat>
        <MediaCardStat
          icon={SVGAsset.Document}
        >{`${adCount} listings`}</MediaCardStat>
      </Layout>

      <Layout
        margin={{ top: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
      >
        <CoreText
          fontWeight={FontWeight.Bold}
          color={Color.Alt2}
        >{`${new Date().getFullYear()} © SSLATT`}</CoreText>
      </Layout>
    </Layout>
  );
};

interface Props {
  siteSettings?: SiteSettings;
  filters?: AdFiltersState;
  categoriesData: AdCategoryType[];
  adsData: AdsListingOutputPagination;
}

export function AdsSearchPage(props: Props) {
  const filters = props.filters || {};
  const categories = props.categoriesData || [];
  const ads = (props.adsData && props.adsData.items) || [];

  return (
    <Layout display={Display.Flex} fullWidth fullHeight>
      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        fullWidth
      >
        {/* Top view */}
        {/* <Layout
          borderBottom={BorderRadius.None}
          padding={{ top: 2 }}
          fullWidth
          breakpointExtraSmall={{
            display: Display.Hide,
          }}
          breakpointSmall={{
            display: Display.Hide,
          }}
          breakpointMedium={{
            display: Display.Flex,
          }}
          style={{ height: "200px" }}
        >
          <TopBanners />
        </Layout> */}

        <Grid gutterSize={GridGutterSize.Small}>
          {/* Filters */}
          <Column cols={{ default: 3 }}>
            <Layout padding={2}>
              <AdFilters categories={categories} filters={filters} />
            </Layout>
          </Column>
          <Column cols={{ default: 7 }}>
            <Layout padding={2}>
              <AdSearchListHtml isPublic action="view" ads={ads} />
            </Layout>
          </Column>
          <Column cols={{ default: 2 }}>
            <Layout
              padding={2}
              breakpointExtraSmall={{
                display: Display.Hide,
              }}
              breakpointSmall={{
                display: Display.Hide,
              }}
              breakpointMedium={{
                display: Display.Flex,
              }}
              flexDirection={FlexDirection.Column}
            >
              <SideBanner />
              <Footer {...props} />
            </Layout>
          </Column>
        </Grid>
      </Layout>
    </Layout>
  );
}

export default AdsSearchPage;
