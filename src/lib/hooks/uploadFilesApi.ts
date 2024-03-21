import type { ApolloClient } from '@apollo/client';
import type {
  FileStringInput,
  MediaDataType,
} from '@roadmanjs/firebase-client';
import { UPLOAD_STRING_FILES_MUTATION } from '@roadmanjs/firebase-client';

export const uploadFilesApi = async ({
  files,
  client,
}: {
  files: FileStringInput[];
  client: ApolloClient<any>;
}): Promise<MediaDataType[]> => {
  // console.log('portfolios are', JSON.stringify(args));

  try {
    const userId = 'ceddymuhoza';

    const { data: dataResponse }: any = await client.mutate({
      mutation: UPLOAD_STRING_FILES_MUTATION,
      variables: {
        owner: userId,
        files,
      },
      fetchPolicy: 'no-cache',
    });

    if (!dataResponse) {
      throw new Error('error getting portfolio data');
    }

    const { data }: { data?: MediaDataType[] } = dataResponse;

    console.log(`data response images ${data && data.length}`);

    if (data) {
      //   Successful
      return data;
    }
    throw new Error('error getting uploading data, please try again later');
  } catch (err) {
    throw err;
  }
};
