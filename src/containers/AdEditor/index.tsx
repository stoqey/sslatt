import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client';
import type { GeoLocationType } from '@stoqey/client-graphql';
import {
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
  CoreButtonType,
  Display,
  FlexDirection,
  FormGroup,
  FormLabel,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  LoadingButton,
  LoadingStatus,
  Modal,
  ModalSize,
  Overflow,
  Select,
  SVGAsset,
  TextAlign,
  TextArea,
  Toggle,
  Tower,
  useDialogState,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Container } from '@/components/container';
// import LocationInput from "../../components/LocationInput";
import { OrderTypeDeliver } from '@/lib/gql';
import { GET_AD_CATEGORIES } from '@/lib/gql/adcategory/adcategory.query';
import type { AdsListingOutput, AdsListingType } from '@/lib/gql/adslisting';
import { GET_AD_LISTING } from '@/lib/gql/adslisting';
import type { CityType, CountryType, StateType } from '@/lib/gql/country';
import {
  GET_ALL_COUNTRIES_QUERY,
  GET_CITY_BY_STATE_QUERY,
  GET_STATE_BY_COUNTRY_QUERY,
} from '@/lib/gql/country';
import { createUpdateAdListing } from '@/lib/hooks/apiAdsListing';
import { isLongitude } from '@/lib/utils/location';
import { isTorNetwork } from '@/lib/utils/url.util';

import { DropAreaModal } from '../Upload/DropArea.modal';
import { DeleteAdAction } from './ads.actions';

interface FormData {
  name?: string;
  phone?: string;
  title?: string;
  description?: string;
  photos?: string[];

  price: number;
  visible?: boolean;
  category?: string;
  subcategory?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  geo?: GeoLocationType;
  orderType?: keyof typeof OrderTypeDeliver;
}

interface Props {
  postId: string;
  children?: any;
  onClose?: () => void;
}

export const useAdsEditor = (postId: string) => {
  const client = useApolloClient();
  const isNewPost = postId === 'new';

  const [loadAdListing, { called, loading, data }] = useLazyQuery<{
    data: AdsListingOutput;
  }>(GET_AD_LISTING, { fetchPolicy: 'network-only' });

  const post: Partial<AdsListingOutput> = (data && data.data) || {};

  const save = (ad: Partial<AdsListingType>, success?: any, error?: any) =>
    createUpdateAdListing({
      client,
      args: {
        ...post, // old post
        ...ad, // updated ad
      } as any,
      success,
      error,
    });

  React.useEffect(() => {
    if (!isNewPost) {
      loadAdListing({ variables: { id: postId } });
    }
  }, [postId]);

  return {
    loadAdListing,
    save,
    post,
  };
};

export const AdsEditor = (props: Partial<Props>) => {
  const { push, back } = useRouter();
  const onClose = () => (props.onClose ? props.onClose() : back());
  const slug = (props && props.postId) || 'new';
  const isNewPost = slug === 'new';

  const isTor = isTorNetwork();

  const [loading, setLoading] = useState(false);

  const { anchorProps: deleteAnchorProps, dialogProps: deleteDialogProps } =
    useDialogState();

  const { post, save, loadAdListing } = useAdsEditor(slug);

  const [form, setForm] = useState<FormData>({
    country: 'US',
  } as any);

  const handle = (field: string) => {
    return (val: any) => {
      setForm({ ...form, [field]: val.target.value });
    };
  };

  const {
    address = '',
    country,
    visible,
    state,
    city,
    name,
    phone,
    description,
    title,
    orderType,
    price,
    subcategory,
  } = form;
  const geo = form && form.geo;
  const photos = form.photos || [];
  const hideMap = !isLongitude(geo && geo.lon) || !(geo && geo.lon);

  const { data: categoriesData, loading: loadingCategories } =
    useQuery(GET_AD_CATEGORIES);

  const { data: countriesData, loading: loadingCountries } = useQuery<{
    data: CountryType[];
  }>(GET_ALL_COUNTRIES_QUERY);

  const [getStateByCountry, { loading: loadingState, data: stateData }] =
    useLazyQuery<{ data: StateType[] }>(GET_STATE_BY_COUNTRY_QUERY);

  const [getCityByStateCountry, { loading: loadingCity, data: cityData }] =
    useLazyQuery<{ data: CityType[] }>(GET_CITY_BY_STATE_QUERY);

  const countryOptions =
    countriesData?.data?.map((country) => ({
      label: country.name,
      value: country.isoCode,
    })) || [];
  const stateOptions =
    stateData?.data?.map((state) => ({
      label: state.name,
      value: state.isoCode,
    })) || [];
  const cityOptions =
    cityData?.data?.map((city) => ({ label: city.name, value: city.name })) ||
    [];

  const defaultPhotosFromProps = photos || [];

  const categories = (categoriesData && categoriesData.data) || [];
  const categoriesOptions = categories
    .filter((cat) => isEmpty(cat.category))
    .map((i) => ({
      label: i.name,
      value: i.id,
    }));

  const category = form.category || categoriesOptions[0]?.value || '';

  const subCategoriesOptions = categories
    .filter((cat) => cat.category === category)
    .map((i) => ({
      label: i.name,
      value: i.id,
    }));

  // console.log("category", { category, categories, subCategoriesOptions });

  React.useEffect(() => {
    if (post.createdAt) {
      setForm(post as FormData);
    }
  }, [post]);

  useEffect(() => {
    if (!isEmpty(country)) {
      getStateByCountry({ variables: { countryCode: country } });
    }
  }, [country]);

  useEffect(() => {
    if (!isEmpty(state)) {
      getCityByStateCountry({
        variables: { countryCode: country, stateCode: state },
      });
    }
  }, [state]);

  const savePost = () => {
    const success = async (updatedAd: AdsListingType) => {
      setLoading(false);
      if (isNewPost) {
        // redirect to new post Id
        return push(`/ad/myads/${updatedAd.id}`);
      }
      // else just refresh ad data
      return setForm(updatedAd as FormData);
    };
    const error = async (e: Error) => {
      setLoading(false);
    };

    const newGeo = () => {
      const selectedCountry = countriesData?.data?.find(
        (c) => c.isoCode === country,
      );
      const selectedState = stateData?.data?.find((c) => c.isoCode === state);
      const selectedCity = cityData?.data?.find((c) => c.name === state);

      if (selectedCity && selectedCity.latitude && selectedCity.longitude) {
        return {
          lat: +selectedCity.latitude,
          lon: +selectedCity.longitude,
        };
      }

      if (selectedState && selectedState.latitude && selectedState.longitude) {
        return {
          lat: +selectedState.latitude,
          lon: +selectedState.longitude,
        };
      }

      if (
        selectedCountry &&
        selectedCountry.latitude &&
        selectedCountry.longitude
      ) {
        return {
          lat: +selectedCountry.latitude,
          lon: +selectedCountry.longitude,
        };
      }

      return {
        lat: 0,
        lon: 0,
      };
    };

    let newAd: AdsListingType = form as any;

    if (isTor) {
      // set geo from static
      newAd.geo = newGeo();
      newAd.address = `${city}, ${state}`;
    }

    newAd = {
      ...newAd,
      category: form.category || categoriesOptions[0]?.value || '',
      price: +newAd.price,
    };

    // console.log("newAd", newAd);

    setLoading(true);
    save(newAd, success, error);
  };

  const handleViewClick = () => {
    return push(`/ad/${post.id}`);
  };

  return (
    <Layout overflow={Overflow.Scroll}>
      {/* Steps and Step Content */}
      <Modal {...deleteDialogProps} size={ModalSize.Large}>
        <DeleteAdAction
          id={post && post.id}
          close={() => {
            deleteDialogProps.onRequestClose();
            push(`/store/ads/new`, null, { shallow: true });
          }}
        />
      </Modal>

      <Container size={9}>
        <Layout padding={{ left: 2, right: 2 }}>
          {/* Info */}
          <Layout margin={{ top: 2 }}>
            {!isNewPost && (
              <Layout
                fullWidth
                display={Display.Flex}
                justifyContent={JustifyContent.End}
              >
                <Layout
                  display={Display.Flex}
                  flexDirection={FlexDirection.Column}
                  justifyContent={JustifyContent.Center}
                  alignItems={AlignItems.Center}
                >
                  <Button
                    size={ButtonSize.Small}
                    onClick={handleViewClick}
                    icon={SVGAsset.Share}
                  >
                    View Ad
                  </Button>
                </Layout>
                <Layout
                  padding={{ left: 2, right: 2 }}
                  display={Display.Flex}
                  flexDirection={FlexDirection.Column}
                  alignItems={AlignItems.End}
                >
                  <Layout
                    display={Display.Flex}
                    flexDirection={FlexDirection.Column}
                    justifyContent={JustifyContent.Center}
                    alignItems={AlignItems.Center}
                  >
                    <FormLabel
                      id="public"
                      label={!visible ? 'Not published' : 'Published'}
                    />
                    <Toggle
                      id="public"
                      disabled={loading}
                      label="Public"
                      checked={visible}
                      onChange={(e: any) => {
                        setForm({ ...form, visible: !visible });
                        savePost();
                      }}
                    />
                  </Layout>
                </Layout>
              </Layout>
            )}
            <Layout margin={{ bottom: 2 }}>
              <FormGroup label="Title">
                <Layout margin={{ bottom: 1 }}>
                  <Input
                    value={title}
                    onChange={handle('title')}
                    size={InputSize.Large}
                    type={InputType.Text}
                    textAlign={TextAlign.Center}
                    defaultValue="Title"
                  />
                </Layout>
              </FormGroup>
            </Layout>

            <Layout padding={{ bottom: 2 }}>
              <Tower>
                <FormGroup label="Full name">
                  <Input
                    value={name}
                    onChange={handle('name')}
                    type={InputType.Text}
                  />
                </FormGroup>
                <FormGroup label="Contact phone">
                  <Input
                    value={phone}
                    onChange={handle('phone')}
                    type={InputType.Number}
                  />
                </FormGroup>
              </Tower>
            </Layout>

            <Layout padding={{ bottom: 2 }}>
              <Tower>
                <FormGroup label="Category">
                  <Select value={category} onChange={handle('category')}>
                    {categoriesOptions.map((i: any) => (
                      <option value={i.value} key={i.label + i.value}>
                        {i.label}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup label="Sub category">
                  <Select value={subcategory} onChange={handle('subcategory')}>
                    {subCategoriesOptions.map((i: any) => (
                      <option value={i.value} key={i.label + i.value}>
                        {i.label}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </Tower>
            </Layout>

            <Layout padding={{ bottom: 2 }}>
              <Tower>
                <FormGroup label="Order Type">
                  <Select value={orderType} onChange={handle('orderType')}>
                    {Object.keys(OrderTypeDeliver).map((key) => (
                      <option value={key}>{OrderTypeDeliver[key]}</option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup label="Price">
                  <Input
                    value={price as any}
                    onChange={handle('price')}
                    type={InputType.Number}
                  />
                </FormGroup>
              </Tower>
            </Layout>
          </Layout>

          {/* Address and Photos */}
          <Layout>
            <Layout padding={{ bottom: 2 }}>
              {isTor ? (
                <>
                  <Tower>
                    {/* Country, state, city picker / input */}
                    <FormGroup label="Country">
                      <Select
                        name="country"
                        value={country}
                        onChange={handle('country')}
                      >
                        {countryOptions.map((i: any) => (
                          <option value={i.value} key={i.label + i.value}>
                            {i.label}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>

                    <FormGroup label="State">
                      <Select
                        name="state"
                        value={state}
                        onChange={handle('state')}
                      >
                        {stateOptions.map((i: any) => (
                          <option value={i.value} key={i.label + i.value}>
                            {i.label}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>

                    <FormGroup label="City">
                      <Select
                        name="city"
                        value={city}
                        onChange={handle('city')}
                      >
                        {cityOptions.map((i: any) => (
                          <option value={i.value} key={i.label + i.value}>
                            {i.label}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>
                  </Tower>

                  <Layout fullWidth>
                    <FormGroup label="Description">
                      <TextArea
                        rows={12}
                        value={description}
                        onChange={handle('description')}
                        size={InputSize.Large}
                      />
                    </FormGroup>
                  </Layout>
                </>
              ) : (
                <Tower>
                  <FormGroup label="Description">
                    <TextArea
                      value={description}
                      onChange={handle('description')}
                      size={InputSize.Large}
                    />
                  </FormGroup>
                  <FormGroup label="Address">
                    <Layout padding={{ bottom: 1 }}>
                      {/* <LocationInput
                        placeholder={address}
                        onLocation={(location, details) => {
                          const formatted_address = details.formatted_address;
                          const addressComponents =
                            (details && details.address_components) || [];
                          const newCity = addressComponents.find((addy) =>
                            addy.types.includes("locality")
                          );
                          const newState = addressComponents.find((addy) =>
                            addy.types.includes("administrative_area_level_1")
                          );
                          const newCountry = addressComponents.find((addy) =>
                            addy.types.includes("country")
                          );
                          const newZipCode = addressComponents.find((addy) =>
                            addy.types.includes("postal_code")
                          );

                          const newGeo: GeoLocationType = {
                            lat: location.lat,
                            lon: location.lng,
                          };

                          setForm({
                            ...form,
                            city: newCity && newCity.long_name,
                            country: newCountry && newCountry.long_name,
                            zipCode: newZipCode && newZipCode.long_name,
                            state: newState && newState.long_name,
                            geo: newGeo,
                            address: formatted_address,
                          });
                        }}
                      /> */}
                    </Layout>

                    {/* {!hideMap && (
                  <MapBoxSnapshot longitude={geo.lon} latitude={geo.lat} />
                )} */}
                  </FormGroup>
                </Tower>
              )}
            </Layout>

            <Layout padding={{ bottom: 2 }}>
              <FormGroup label="Photos">
                <DropAreaModal
                  defaultFiles={defaultPhotosFromProps?.map((i) => ({
                    uploaded: true,
                    url: i,
                    filename: i,
                    preview: i,
                  }))}
                  multi
                  onChangeFiles={(files) => {
                    const newPhotos = files.map((file) => file.url);
                    setForm({ ...form, photos: newPhotos });
                  }}
                />
              </FormGroup>
            </Layout>
          </Layout>
        </Layout>
      </Container>

      {/* Actions */}
      <Container size={10}>
        <Layout
          display={Display.Flex}
          justifyContent={post.id ? JustifyContent.Between : JustifyContent.End}
          padding={{ bottom: 2, right: 3 }}
        >
          {post.id && (
            <Layout>
              <Button
                size={ButtonSize.Large}
                variant={ButtonType.Alert}
                onClick={() => deleteAnchorProps.onClick()}
              >
                Delete Ad
              </Button>
            </Layout>
          )}

          <Layout display={Display.Flex}>
            <Layout margin={{ left: 1, right: 1 }}>
              <Button
                icon={SVGAsset.Close}
                size={ButtonSize.Large}
                variant={ButtonType.Secondary}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </Layout>

            <Layout margin={{ right: 1 }}>
              <LoadingButton
                size={ButtonSize.Large}
                icon={SVGAsset.Edit}
                variant={CoreButtonType.Primary}
                // size={ButtonSize.Large}
                onClick={() => savePost()}
                loadingStatus={
                  loading ? LoadingStatus.Loading : LoadingStatus.Default
                }
              >
                Save
              </LoadingButton>
            </Layout>
          </Layout>
        </Layout>
      </Container>
    </Layout>
  );
};

export default AdsEditor;
