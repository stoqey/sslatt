import gql from 'graphql-tag';

import { AdCategoryTypeFragment } from './adcategory.fragment';

export const GET_AD_CATEGORIES = gql`
  query GetAdCategories {
    data: getAdCategories {
      ...AdCategoryFragment
    }
  }
  ${AdCategoryTypeFragment}
`;

export const GET_AD_CATEGORY = gql`
  query GetAdCategories($id: String!) {
    data: getAdCategories(id: $id) {
      ...AdCategoryFragment
    }
  }
  ${AdCategoryTypeFragment}
`;
