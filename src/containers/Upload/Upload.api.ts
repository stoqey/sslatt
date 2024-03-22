import type { ApolloClient } from '@apollo/client';
import type { MediaDataType } from '@roadmanjs/firebase-client';
import { UPLOAD_FILES_FASTDFS_MUTATION } from '@roadmanjs/firebase-client';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import { accessTokenManager } from '@/lib/storage/deviceStorage';
import { getBackendHost } from '@/lib/utils/api.utils';

interface DataResponse {
  data?: MediaDataType[];
}

/**
 *
 * @param param0
 * @returns
 */

export const uploadFilesApiRest = async ({
  files,
  error,
  success,
}: {
  files: File[];
  error?: (error: Error) => Promise<any>;
  success?: (data: MediaDataType[]) => Promise<any>;
}) => {
  try {
    const authorization = await accessTokenManager.get();

    if (isEmpty(files)) {
      throw new Error('files cannot be empty');
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await axios.post(`${getBackendHost()}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${authorization}`,
      },
    });

    const dataResponse: DataResponse = response;

    console.log('Files uploaded:', response.data);

    if (isEmpty(dataResponse)) {
      throw new Error('error uploading files, please try again later');
    }

    const { data }: { data?: MediaDataType[] } = dataResponse;

    console.log(`data response images ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await success(data);
      return console.log(`images successful ${data && data.length}`);
    }
    throw new Error('error uploading image data, please try again later');
  } catch (err) {
    console.error(err);
    if (error) {
      await error(err as any);
    }
  }
};

export const uploadFilesApi = async ({
  files,
  client,
  error,
  success,
}: {
  files: File[];
  client: ApolloClient<any>;
  error?: (error: Error) => Promise<any>;
  success?: (data: MediaDataType[]) => Promise<any>;
}) => {
  try {
    if (isEmpty(files)) {
      throw new Error('files cannot be empty');
    }

    const { data: dataResponse, errors }: any = await client.mutate({
      mutation: UPLOAD_FILES_FASTDFS_MUTATION,
      variables: {
        files,
      },
      fetchPolicy: 'no-cache',
      // context: {
      //   headers: { 'Apollo-Require-Preflight': 'true' }
      // }
    });

    if (isEmpty(dataResponse)) {
      throw new Error('error uploading files, please try again later');
    }

    const { data }: { data?: MediaDataType[] } = dataResponse;

    console.log(`data response images ${data && data.length}`);

    if (!isEmpty(data)) {
      //   Successful
      await success(data);
      return console.log(
        `portfolios data is successful ${data && data.length}`,
      );
    }
    throw new Error('error getting portfolios data, please try again later');
  } catch (err) {
    console.error(err);
    if (error) await error(err as any);
  }
};
