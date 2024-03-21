import fs from 'fs';
import isEmpty from 'lodash/isEmpty';
import request from 'request';

import type { MediaDataType } from '@/components/types.generated';

import { getBackendHost } from '../utils/api.utils';

export const saveFileToLocal = async (
  file: File | Blob,
): Promise<string | undefined> => {
  if (!file || typeof file === 'string') {
    return undefined;
  }
  const ab = await file.arrayBuffer();
  const bf = Buffer.from(ab);
  const newfileName = `${Date.now()}-${file.name}`;
  const fileDir = `/tmp/${newfileName}`;
  await fs.promises.writeFile(fileDir, bf, { encoding: 'binary' });
  return fileDir;
};

interface UploadFilesApiRest {
  authorization: string;
  files: string[];
}

export const uploadFilesApiRest = ({
  authorization,
  files = [],
}: UploadFilesApiRest): Promise<MediaDataType[]> =>
  new Promise((resolve, reject) => {
    const apiServer = `${getBackendHost()}/upload`;

    const req = request.post(
      apiServer,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${authorization}`,
        },
      },
      function (err, resp, body) {
        if (err) {
          return reject(err);
        }
        try {
          const data: MediaDataType[] = JSON.parse(body);
          if (isEmpty(data)) {
            return reject(
              new Error('error uploading image data, please try again later'),
            );
          }
          return resolve(data);
        } catch (error) {
          return reject(error);
        }
      },
    );
    const form = req.form();
    files.forEach((filePath) => {
      form.append('files', fs.createReadStream(filePath));
    });
  });
