import type { NextRouter } from 'next/router';

export const getQueryParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  //   @ts-ignore
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
};

export const updateUrlQuery = (router: NextRouter, params: any) => {
  const currentQueryParams = getQueryParams() || {};
  const newParams = params || {};
  return router.push({
    pathname: router.pathname,
    query: { ...currentQueryParams, ...newParams },
  });
};
