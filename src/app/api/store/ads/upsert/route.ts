import { awaitTo } from '@stoqey/client-graphql';
import { addSeconds } from 'date-fns';
import { identity, omit, pickBy } from 'lodash';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import type {
  AdsListingOutput,
  AdsListingType,
  ResType,
} from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { CREATE_AD_LISTING_MUTATION, GET_AD_LISTING } from '@/lib/gql';
import { getAdCategories } from '@/lib/hooksServer/ads';
import { saveFileToLocal, uploadFilesApiRest } from '@/lib/hooksServer/media';
import { escapeText } from '@/lib/utils/text';

const baseUrl = '/html/store/ads';

export async function GET() {
  const res = new Response(null, {
    headers: {
      Refresh: `10; url=${baseUrl}`,
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  // TODO generic messages
  const cookieStore = cookies();
  const in3Secs = addSeconds(new Date(), 5);
  const in3SecsStr = in3Secs.toUTCString();

  let id;
  let isNew;
  let title;
  let description;
  let price;
  let subcategory = '';
  let orderType;
  let photos;
  let photoFile;
  let shipsTo;
  let shipsFrom;
  let existingAd = {} as AdsListingType;
  let pathname = baseUrl;
  let visible;

  try {
    const accessToken = cookieStore.get('accessToken')?.value || '';

    const formData = await req.formData();

    pathname = formData.get('pathname') as string;

    visible = (formData.get('visible') as string) === 'on';

    id = formData.get('id') as string;
    isNew = id === 'new';

    title = formData.get('title') as string;
    if (isEmpty(title)) throw new Error('Invalid ad title');
    title = escapeText(title);

    description = formData.get('description') as string;
    if (isEmpty(description)) throw new Error('Invalid ad description');
    description = escapeText(description);

    price = +(formData.get('price') as string);
    if (Number.isNaN(price)) throw new Error('Invalid ad price');

    subcategory = formData.get('subcategory') as string;
    if (isEmpty(subcategory)) throw new Error('Invalid ad category');

    const allCategories = await getAdCategories();
    if (isEmpty(allCategories)) throw new Error('Cannot get ad categories');
    const categoryItem = allCategories.find((c) => c.id === subcategory);
    if (isEmpty(categoryItem)) throw new Error('Invalid ad category');

    orderType = formData.get('orderType') as string;
    if (isEmpty(orderType)) throw new Error('Invalid ad orderType');

    // parse photos
    photos = formData.get('photos') as string;
    if (!isEmpty(photos)) {
      photos = JSON.parse(photos);
    } else {
      photos = [];
    }

    photoFile = formData.get('photoFile') as Blob;

    shipsTo = formData.get('shipsTo') as string;
    if (isEmpty(shipsTo)) throw new Error('Invalid ad shipsTo');

    shipsFrom = formData.get('shipsFrom') as string;
    if (isEmpty(shipsFrom)) throw new Error('Invalid ad shipsFrom');

    // console.log("api/store/ads/upsert req.form", {
    //     id, isNew, title, name, description, price, category, subcategory, orderType, photos, shipsTo, shipsFrom,
    // })

    // get existing ad
    if (!isNew) {
      const [, existingAdData] = await awaitTo(
        getClient().query<{ data: AdsListingOutput }>({
          query: GET_AD_LISTING,
          variables: {
            id,
          },
        }),
      );

      const existingAdItem: AdsListingOutput = _get(
        existingAdData,
        'data.data',
        null as any,
      );

      if (!isEmpty(existingAdItem)) {
        existingAd = {
          ...(existingAdItem as any),
          owner: existingAdItem.owner?.id,
        };
      }
    }

    if (photoFile && !isEmpty([photoFile]) && photoFile.size > 0) {
      console.log('api/store/ads/upsert photoFile', photoFile);
      const photoPath = await saveFileToLocal(photoFile);
      console.log('api/store/ads/upsert photoPath', photoPath);

      if (!isEmpty(photoPath)) {
        const uploadedMediaFile = await uploadFilesApiRest({
          files: [photoPath as string],
          authorization: accessToken,
        });
        const newMediaFile = uploadedMediaFile[0];

        // console.log("api/store/ads/upsert newMediaFile", newMediaFile);

        if (isEmpty(newMediaFile)) {
          throw new Error('Failed to upload photo');
        }

        const newPhoto = newMediaFile.url;
        // TODO do i need to concat or place ?
        // if (!isEmpty(photos)) {
        //     photos.push(newPhoto);
        // } else {
        //     photos = [newMediaFile.url];
        // }
        photos = [newPhoto];
      }
    } else if (isEmpty(photos)) {
      throw new Error('Please add a photo');
    } else {
      console.log('api/store/ads/upsert photoFile is empty', photoFile);
    }

    const args = pickBy(
      {
        ...(isNew ? {} : omit(existingAd, ['__typename', 'geo'])),
        title,
        description,
        price,
        category: categoryItem.category,
        subcategory: categoryItem.id,
        orderType,
        photos,
        shipsTo,
        shipsFrom,
      },
      identity,
    );

    if (!isNew) {
      args.visible = visible;
    }

    const variables = {
      args,
    };

    const api = await getClient().mutate<{ data: ResType }>({
      mutation: CREATE_AD_LISTING_MUTATION,
      variables,
    });

    // console.log("api/store/ads/upsert api", JSON.stringify(api));

    if (isEmpty(api.data?.data)) throw api.errors as any;

    const success = _get(api, 'data.data.success', false);
    const message = _get(api, 'data.data.message', '');

    if (!success) throw new Error(message);

    const newAd: AdsListingType = _get(
      api,
      'data.data.data',
      {} as AdsListingType,
    );
    // console.log("api/store/ads/upsert newAd", JSON.stringify(newAd));
    const newAdId = newAd.id;
    cookieStore.set('refresh', 'true', { expires: in3Secs });
    cookieStore.set('message', message, { expires: in3Secs });
    cookieStore.set('success', `${success}`, { expires: in3Secs });

    const redirectUrl = isNew ? `${baseUrl}/${newAdId}` : pathname;

    return new Response(null, {
      headers: {
        Refresh: `0; url=${redirectUrl}`,
      },
    });
  } catch (error: any) {
    console.log('error upsert ad', error);
    const message = (error && error?.message) || `Failed to create store`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=${pathname}`,
        'Set-Cookie': `message=${message}; path=/; expires=${in3SecsStr}`,
      },
    });

    res.headers.append(
      'Set-Cookie',
      `success=false; path=/; expires=${in3SecsStr}`,
    );
    return res;
  }
}
