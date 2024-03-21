import gql from 'graphql-tag';

export const GET_PGP_KEY = gql`
  query GetPgpKey {
    data: getPgpKey {
      id
      verified
      key
      owner
    }
  }
`;
