import * as React from 'react';
import { StyleSheet } from 'react-native';
import type {
  GooglePlaceDetail,
  Point,
} from 'react-native-google-places-autocomplete';

import { getBackendHost } from '@/lib/utils/api.utils';

import { GooglePlacesAutocomplete } from '../GooglePlacesAutocomplete';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS; // never save your real api key in a snack!

interface Props {
  onLocation?: (location: Point, details?: Partial<GooglePlaceDetail>) => void;
  placeholder?: string;
  renderLeftButton?: any;
  renderRightButton?: any;
}

export const LocationInput = (props: Props & any) => {
  const {
    onLocation = (a: any) => {},
    placeholder = 'Search',
    ...others
  } = props;
  return (
    <GooglePlacesAutocomplete
      debounce={500}
      fetchDetails
      placeholder={placeholder}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en', // language of the results
      }}
      onPress={(data, details = null) => {
        if (details) {
          const { location } = details.geometry;
          // run location update
          onLocation(location, details);
        }
      }}
      onFail={(error) => console.error(error)}
      requestUrl={{
        url: `${getBackendHost()}/proxy/https://maps.googleapis.com/maps/api`,
        useOnPlatform: 'web',
      }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      {...others}
    />
  );
};

// TODO fix theme styling
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
});

export default LocationInput;
