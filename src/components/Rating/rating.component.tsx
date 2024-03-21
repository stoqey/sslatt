import {
  AlignItems,
  CoreText,
  Display,
  Icon,
  JustifyContent,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';
import React from 'react';

export interface RatingIconProps {
  rating?: number;
  title?: string | number;
  size?: number;
}

export const RatingIcon = (props: RatingIconProps) => {
  const { rating, title = rating, size = 35 } = props;

  if (!rating) return undefined;

  return (
    <Layout
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
    >
      {new Array(5).fill(0).map((_, i) => {
        const fill = i + 1 <= rating;
        return (
          <Icon
            key={i}
            style={{
              width: size,
              color: 'var(--color-brand-muted-mustard)',
            }}
            asset={fill ? SVGAsset.Star : SVGAsset.StarHollow}
          />
        );
      })}
      <CoreText as="h3" style={{ fontSize: size / 1.5 }}>
        {title}
      </CoreText>
    </Layout>
  );
};

export default RatingIcon;
