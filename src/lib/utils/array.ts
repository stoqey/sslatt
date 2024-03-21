/**
 * convert object to array if not array.
 * useful for endpoints that return one object or multiple
 * @param item
 * @returns
 */
export const Arrayify = (item: Object | Object[]) => {
  if (Array.isArray(item)) {
    return item;
  }

  if (typeof item === 'object') {
    return [item];
  }

  return item;
};
