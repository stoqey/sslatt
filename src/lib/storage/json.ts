import isEmpty from 'lodash/isEmpty';

export const JSONDATA = (
  data: any,
): Record<string, any> | string | undefined => {
  if (isEmpty(data) || !data) {
    return undefined;
  }

  try {
    if (typeof data !== 'object') {
      return JSON.parse(data);
    }
    return data;
  } catch (error) {
    console.error(error);
    return data;
  }
};
