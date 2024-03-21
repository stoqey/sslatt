import { useRouter } from 'next/router';

import { AdsList } from '@/components/AdLists';
import type { IAdItem } from '@/components/AdLists/ads.item';
import SCREENS from '@/lib/consts';
import { useAdsData } from '@/lib/hooks/useAds';

export default function AdsListContainer() {
  const { push } = useRouter();
  const {
    ads = [],
    fetchOlder,
    hasNext,
  } = useAdsData({ before: new Date(), limit: 10 });

  const adsItems: IAdItem[] = ads.map((ad) => ({
    id: ad.id,
    image: ad.photos && ad.photos[0],
    title: ad.title,
    subtitle: ad.description, // todo subscract
    location: ad.address, // plus all address
    phone: ad.phone,
    rate: ad.price,
    status: ad.status,
  })); // todo convert from ads above

  // fetch useChatConvo
  return (
    <>
      {/* Screen goes here */}
      {/* TODO custom views  */}
      <AdsList
        viewMode="grid"
        // @ts-ignore
        data={adsItems}
        onEndReached={(info) => {
          if (hasNext) {
            fetchOlder();
          }
        }}
        onEndReachedThreshold={0.5}
        removeClippedSubviews
        onScrollEndDrag={() => console.log('end')}
        onScrollBeginDrag={() => console.log('start')}
        onSelect={(ad: IAdItem) => push(`${SCREENS.MyAds}/${ad.id}`)}
      />
    </>
  );
}
