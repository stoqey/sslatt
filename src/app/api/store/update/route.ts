import { addSeconds } from 'date-fns';
import { identity, pickBy } from 'lodash';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { UPDATE_VENDOR_MUTATION } from '@/lib/gql';
import { saveFileToLocal, uploadFilesApiRest } from '@/lib/hooksServer/media';
import { getVendor } from '@/lib/hooksServer/vendor';
import { escapeText } from '@/lib/utils/text';

const baseUrl = '/html/store/settings';

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
  let name;
  let avatar;
  let avatarFile;
  let bio;
  let vacation;
  let existingVendor;
  // shipsTo, shipsFrom,
  let pathname = baseUrl;

  try {
    const accessToken = cookieStore.get('accessToken')?.value || '';

    const formData = await req.formData();

    pathname = formData.get('pathname') as string;

    id = formData.get('id') as string;

    name = formData.get('name') as string;
    if (isEmpty(name)) throw new Error('Invalid name');
    name = escapeText(name);

    bio = formData.get('bio') as string;
    if (isEmpty(bio)) throw new Error('Invalid bio');
    bio = escapeText(bio);

    // TODO is checked
    vacation = (formData.get('vacation') as string) === 'on';

    // parse photos
    avatar = formData.get('avatar') as string;

    avatarFile = formData.get('avatarFile') as Blob;

    existingVendor = await getVendor();

    if (!existingVendor) throw new Error('Invalid vendor');

    console.log('api/store/update req.form', {
      id,
      name,
      avatar,
      avatarFile,
      bio,
      vacation,
      pathname,
    });

    if (avatarFile && !isEmpty([avatarFile]) && avatarFile.size > 0) {
      console.log('api/store/update avatarFile', avatarFile);
      const photoPath = await saveFileToLocal(avatarFile);
      console.log('api/store/update photoPath', photoPath);

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
        avatar = newPhoto;
      }
    } else {
      console.log('api/store/update avatarFile is empty', avatarFile);
    }

    const args = pickBy(
      {
        ...existingVendor,
        name,
        bio,
        vacation,
        avatar,
      },
      identity,
    );

    console.log('api/store/update args', args);

    const variables = {
      vendor: args,
    };

    const api = await getClient().mutate<{ data: ResType }>({
      mutation: UPDATE_VENDOR_MUTATION,
      variables,
    });

    if (isEmpty(api.data?.data)) throw api.errors;

    const success = _get(api, 'data.data.success', false);
    const message = _get(api, 'data.data.message', '');

    if (!success) throw new Error(message);

    cookieStore.set('refresh', 'true', { expires: in3Secs });
    cookieStore.set('message', message, { expires: in3Secs });
    cookieStore.set('success', `${success}`, { expires: in3Secs });

    return new Response(null, {
      headers: {
        Refresh: `0; url=${pathname}`,
      },
    });
  } catch (error: any) {
    console.log('error upsert store', error);
    const message = (error && error?.message) || `Failed to update store`;
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
