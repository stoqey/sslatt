import {
  AlignItems,
  Avatar,
  CoreLink,
  CoreText,
  Display,
  FontWeight,
  Layout,
  PresenceStatus,
  Tag,
} from '@uuixjs/uuixweb';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React from 'react';

import type { OrderRatingOutput } from '@/components/types.generated';
import { cdnPath } from '@/lib/utils/api.utils';
import { niceDec } from '@/lib/utils/number';

import { renderLink } from '../../components/Link/link.utils';
import { RatingIcon } from '../../components/Rating';

interface Props {
  ratings: OrderRatingOutput[];
}

export const ReviewsContainer = (props: Props) => {
  const { ratings } = props;

  if (isEmpty(ratings)) return undefined;

  return (
    <Layout fullWidth>
      {ratings.map((rating) => {
        const buyerUsername = _get(rating, 'buyer.username', '');
        return (
          <Layout
            fullWidth
            border
            padding={2}
            key={rating.id}
            margin={{ bottom: 1 }}
          >
            <Layout display={Display.Flex} fullWidth>
              {/* Image */}
              <Layout>
                <Layout margin={0.5}>
                  <Avatar
                    size={80}
                    alt=""
                    userLogin={rating?.owner?.username}
                    src={rating.owner?.avatar && cdnPath(rating?.owner?.avatar)}
                    presenceIndicator
                    presenceStatus={PresenceStatus.Online}
                  />
                </Layout>
              </Layout>

              {/* Review */}
              <Layout style={{ flex: 1 }}>
                <Layout display={Display.Flex} margin={{ left: 1 }}>
                  <RatingIcon
                    size={30}
                    rating={rating?.rating as any}
                    title={rating?.rating?.toFixed(2)}
                  />
                  <Layout
                    display={Display.Flex}
                    alignItems={AlignItems.Center}
                    margin={{ left: 1, right: 1 }}
                  >
                    <CoreText as="h5">
                      {moment(rating.createdAt).fromNow()}
                    </CoreText>
                    <Layout margin={{ left: 1, right: 1 }}>
                      <Tag
                        label={niceDec(
                          (rating.order?.price || 0) *
                            (rating.order?.quantity || 1),
                        )}
                      />
                    </Layout>
                  </Layout>
                </Layout>

                <Layout padding={{ left: 1, right: 1, top: 1 }}>
                  <Layout display={Display.Flex}>
                    <Layout padding={{ right: 1 }}>
                      <CoreLink
                        renderLink={renderLink}
                        linkTo={`/html/u/${buyerUsername}`}
                      >
                        <CoreText as="h4" lines={2}>
                          {rating?.buyer?.username}
                        </CoreText>
                      </CoreLink>
                    </Layout>
                    <CoreText as="h4">for</CoreText>

                    <Layout padding={{ left: 1 }}>
                      <CoreLink
                        renderLink={renderLink}
                        linkTo={`/html/ad/${rating.ad?.id}`}
                      >
                        <CoreText as="h4" lines={2}>
                          {rating.ad?.title}
                        </CoreText>
                      </CoreLink>
                    </Layout>
                  </Layout>
                </Layout>
              </Layout>
            </Layout>
            <Layout padding={{ left: 1, right: 1, top: 1 }}>
              <CoreText as="h4" fontWeight={FontWeight.Regular}>
                {rating.review}
              </CoreText>
            </Layout>
          </Layout>
        );
      })}
    </Layout>
  );
};

export default ReviewsContainer;
