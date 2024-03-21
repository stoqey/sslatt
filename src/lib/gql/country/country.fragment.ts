import gql from 'graphql-tag';

export interface TimezoneType {
  zoneName?: string;
  gmtOffset?: number;
  gmtOffsetName?: string;
  abbreviation?: string;
  tzName?: string;
}

export const TimezoneTypeFragment = gql`
  fragment TimezoneTypeFragment on TimezoneType {
    zoneName
    gmtOffset
    gmtOffsetName
    abbreviation
    tzName
  }
`;

export interface CountryType {
  isoCode?: string;
  name?: string;
  phonecode?: string;
  flag?: string;
  currency?: string;
  latitude?: string;
  longitude?: string;
  timezones?: TimezoneType[];
}

export const CountryTypeFragment = gql`
  fragment CountryTypeFragment on CountryType {
    isoCode
    name
    phonecode
    currency
    latitude
    longitude
    timezones {
      ...TimezoneTypeFragment
    }
  }
  ${TimezoneTypeFragment}
`;

export interface StateType {
  isoCode?: string;
  name?: string;
  countryCode?: string;
  latitude?: string;
  longitude?: string;
}

export const StateTypeFragment = gql`
  fragment StateTypeFragment on StateType {
    isoCode
    name
    countryCode
    latitude
    longitude
  }
`;

export interface CityType {
  isoCode?: string;
  name?: string;
  countryCode?: string;
  stateCode?: string;
  latitude?: string;
  longitude?: string;
}

export const CityTypeFragment = gql`
  fragment CityTypeFragment on CityType {
    isoCode
    name
    countryCode
    stateCode
    latitude
    longitude
  }
`;
