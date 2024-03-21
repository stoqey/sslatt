import gql from 'graphql-tag';

export interface AdCategoryType {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  category?: string;
  count?: number;
}

export const AdCategoryTypeFragment = gql`
  fragment AdCategoryFragment on AdCategoryType {
    id
    createdAt
    updatedAt
    name
    category
    count
  }
`;
