import gql from 'graphql-tag';

import {
  CityTypeFragment,
  CountryTypeFragment,
  StateTypeFragment,
} from './country.fragment';

export const GET_ALL_COUNTRIES_QUERY = gql`
  query GetAllCountries {
    data: getAllCountries {
      ...CountryTypeFragment
    }
  }
  ${CountryTypeFragment}
`;

export const GET_STATE_BY_COUNTRY_QUERY = gql`
  query GetStateByCountry($countryCode: String!) {
    data: getStateByCountry(countryCode: $countryCode) {
      ...StateTypeFragment
    }
  }
  ${StateTypeFragment}
`;

export const GET_CITY_BY_STATE_QUERY = gql`
  query GetCityByState($countryCode: String!, $stateCode: String!) {
    data: getCityByState(countryCode: $countryCode, stateCode: $stateCode) {
      ...CityTypeFragment
    }
  }
  ${CityTypeFragment}
`;
