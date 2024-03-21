import { UPDATE_USER_PROFILE } from '@roadmanjs/auth-client';
import { addSeconds } from 'date-fns';
import { identity, pickBy } from 'lodash';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { saveFileToLocal, uploadFilesApiRest } from '@/lib/hooksServer/media';
import { getMe } from '@/lib/hooksServer/user';
import { escapeText } from '@/lib/utils/text';

const baseUrl = '/html/profile';

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

  // TODO just use full name
  let id;
  let firstname;
  let lastname;
  let avatar;
  let avatarFile;
  let bio;
  let existingUser;
  // shipsTo, shipsFrom,
  let pathname = baseUrl;

  try {
    const accessToken = cookieStore.get('accessToken')?.value || '';

    const formData = await req.formData();

    pathname = formData.get('pathname') as string;

    id = formData.get('id') as string;

    firstname = formData.get('firstname') as string;
    if (isEmpty(firstname)) throw new Error('Invalid firstname');
    firstname = escapeText(firstname);

    lastname = formData.get('lastname') as string;
    if (isEmpty(firstname)) throw new Error('Invalid lastname');
    lastname = escapeText(lastname);

    bio = formData.get('bio') as string;
    if (isEmpty(bio)) throw new Error('Invalid bio');
    bio = escapeText(bio);

    // parse photos
    avatar = formData.get('avatar') as string;

    avatarFile = formData.get('avatarFile') as Blob;

    existingUser = await getMe();

    if (!existingUser) throw new Error('Invalid profile');

    console.log('api/profile req.form', {
      id,
      firstname,
      lastname,
      avatar,
      avatarFile,
      bio,
      pathname,
    });

    if (avatarFile && !isEmpty([avatarFile]) && avatarFile.size > 0) {
      console.log('api/profile avatarFile', avatarFile);
      const photoPath = await saveFileToLocal(avatarFile);
      console.log('api/profile photoPath', photoPath);

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
      console.log('api/profile avatarFile is empty', avatarFile);
    }

    const args = pickBy(
      {
        // ...existingUser,
        firstname,
        lastname,
        bio,
        avatar,
      },
      identity,
    );

    console.log('api/profile args', args);

    const variables = {
      user: args,
    };

    const api = await getClient().mutate<{ data: ResType }>({
      mutation: UPDATE_USER_PROFILE,
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
    console.log('error update profile', error);
    const message = (error && error?.message) || `Failed to update profile`;
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
