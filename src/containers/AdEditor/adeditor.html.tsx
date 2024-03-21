// import { DropAreaModal } from "../Upload/DropArea.modal";
import type { GeoLocationType } from '@stoqey/client-graphql';
import {
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
  CoreButtonType,
  CoreImage,
  Display,
  FlexDirection,
  FormGroup,
  FormLabel,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  Overflow,
  Select,
  SVGAsset,
  TextAlign,
  TextArea,
  Toggle,
  Tower,
} from '@uuixjs/uuixweb';
import { groupBy } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Container } from '@/components/container';
import type {
  AdCategoryType,
  AdsListingOutput,
  CountryType,
} from '@/components/types.generated';
import type { OrderTypeDeliver } from '@/lib/gql';
import { cdnPath } from '@/lib/utils/api.utils';
import { isTorNetwork } from '@/lib/utils/url.util';

import { MessageSuccessHtml } from '../actions.html';

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

export interface AdsEditorProps {
  ad: AdsListingOutput;
  countries?: CountryType[];
  categories?: AdCategoryType[];
  children?: any; // TODO
  message?: string;
  success?: boolean;
}

export const AdsEditorHtml = (props: AdsEditorProps) => {
  const {
    categories = [],
    countries = [],
    message = '',
    success = false,
  } = props;
  const ad = props.ad || {};
  const slug = (props && props.ad?.id) || 'new';
  const isNewPost = slug === 'new';

  const isTor = isTorNetwork();

  const pathname = usePathname();

  const {
    id: adId = 'new',
    country,
    visible,
    name,
    phone,
    description,
    title,
    orderType,
    price,
    subcategory,
    category = '',
    shipsFrom,
    shipsTo,
  } = ad;

  const photos = ad.photos || [];

  const countryOptions =
    countries.map((country) => ({
      label: country.name,
      value: country.isoCode,
    })) || [];

  countryOptions.unshift({
    label: 'Worldwide',
    value: 'all',
  });

  const defaultPhotosFromProps = photos || [];

  const categoriesOptions = [];

  const orderedCategories = groupBy(
    categories.filter((cat) => !isEmpty(cat.category)),
    'category',
  );

  Object.keys(orderedCategories).forEach((key) => {
    // main category
    categoriesOptions.push({
      disabled: true,
      label: key,
      value: key,
    });

    const subs = orderedCategories[key].map((i) => ({
      label: i.name,
      value: i.id,
    }));

    categoriesOptions.push(...subs);
  });

  const viewLink = `/html/ad/${adId}`;
  const deleteLink = `/html/ad/${adId}/delete`;
  const backLink = `/html/store/ads`;
  const upsertLink = `/api/store/ads/upsert`;

  return (
    <Layout overflow={Overflow.Scroll} fullWidth>
      {/* Steps and Step Content */}

      <MessageSuccessHtml message={message} success={success} />

      <form method="POST" action={upsertLink} encType="multipart/form-data">
        <input name="pathname" type="hidden" value={pathname} />
        <input name="id" type="hidden" value={adId as string} />
        <input name="photos" type="hidden" value={JSON.stringify(photos)} />
        <input name="orderType" type="hidden" value="shipping" />
        <Container size={9}>
          <Layout padding={1}>
            {/* Visibility */}
            {!isNewPost && (
              <Layout
                margin={{ top: 2 }}
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
                  <Link href={viewLink}>
                    <Button
                      type="button"
                      size={ButtonSize.Small}
                      icon={SVGAsset.Share}
                    >
                      View Ad
                    </Button>
                  </Link>
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

                    {/* publish api */}
                    <Toggle
                      id="visible"
                      name="visible"
                      label="Public"
                      defaultChecked={visible as any}
                    />
                  </Layout>
                </Layout>
              </Layout>
            )}

            {/* Form */}
            <Layout>
              {/* Info */}
              <Layout margin={{ top: 1 }}>
                {/* <form></form> */}
                <Layout margin={{ bottom: 2 }}>
                  <FormGroup label="Title">
                    <Layout margin={{ bottom: 1 }}>
                      <Input
                        defaultValue={title as string}
                        name="title"
                        size={InputSize.Large}
                        type={InputType.Text}
                        textAlign={TextAlign.Center}
                      />
                    </Layout>
                  </FormGroup>
                </Layout>

                {!isTor && (
                  <Layout padding={{ bottom: 2 }}>
                    <Tower>
                      <FormGroup label="Full name">
                        <Input
                          defaultValue={name as string}
                          name="name"
                          type={InputType.Text}
                        />
                      </FormGroup>

                      <FormGroup label="Contact phone">
                        <Input
                          defaultValue={phone as string}
                          name="phone"
                          type={InputType.Number}
                        />
                      </FormGroup>
                    </Tower>
                  </Layout>
                )}

                {/* TODO only category */}
                {/* <Layout padding={{ bottom: 2 }}>
                <Tower>
                  <FormGroup label="Category">
                    <Select defaultValue={category as string} name="category">
                      {categoriesOptions.map((i: any) => (
                        <option value={i.value} key={i.label + i.value}>
                          {i.label}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  <FormGroup label="Sub category">
                    <Select
                      defaultValue={subcategory as string}
                      name="subcategory"
                    >
                      {subCategoriesOptions.map((i: any) => (
                        <option value={i.value} key={i.label + i.value}>
                          {i.label}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </Tower>
              </Layout> */}

                <Layout padding={{ bottom: 2 }}>
                  <Tower>
                    <FormGroup label="Category">
                      <Select
                        defaultValue={subcategory as string}
                        name="subcategory"
                      >
                        {categoriesOptions.map((i: any) => (
                          <option
                            value={i.value}
                            key={i.label + i.value}
                            {...i}
                          >
                            {i.label}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>

                    <FormGroup label="Price">
                      <Input
                        defaultValue={price as any}
                        name="price"
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
                        {/* TODO country when not shipsFrom, shipsTo */}
                        <FormGroup label="Ships From">
                          <Select
                            name="shipsFrom"
                            defaultValue={shipsFrom as string}
                          >
                            {countryOptions.map((i: any) => (
                              <option value={i.value} key={i.label + i.value}>
                                {i.label}
                              </option>
                            ))}
                          </Select>
                        </FormGroup>

                        <FormGroup label="Ships To">
                          <Select
                            name="shipsTo"
                            defaultValue={shipsTo as string}
                          >
                            {countryOptions.map((i: any) => (
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
                            defaultValue={description as string}
                            name="description"
                            size={InputSize.Large}
                          />
                        </FormGroup>
                      </Layout>
                    </>
                  ) : (
                    <Tower>
                      <FormGroup label="Description">
                        <TextArea
                          defaultValue={description}
                          name="description"
                          size={InputSize.Large}
                        />
                      </FormGroup>
                      <FormGroup label="Address">
                        {/* <Layout padding={{ bottom: 1 }}>
                      <LocationInput
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
                      />
                    </Layout> */}

                        {/* {!hideMap && (
                  <MapBoxSnapshot longitude={geo.lon} latitude={geo.lat} />
                )} */}
                      </FormGroup>
                    </Tower>
                  )}
                </Layout>

                <Layout padding={{ bottom: 2 }}>
                  {/* TOOD styling */}
                  {!isEmpty(defaultPhotosFromProps) && (
                    <CoreImage
                      style={{ width: '200px', height: '200px' }}
                      alt={title}
                      src={cdnPath(defaultPhotosFromProps[0])}
                    />
                  )}
                  <FormGroup label="Photo">
                    <input type="file" name="photoFile" />
                  </FormGroup>
                </Layout>
              </Layout>
            </Layout>

            {/* Actions */}
            <Layout
              fullWidth
              display={Display.Flex}
              justifyContent={
                ad.id ? JustifyContent.Between : JustifyContent.End
              }
              padding={{ top: 2 }}
            >
              {ad.id && (
                <Layout>
                  <Link href={deleteLink}>
                    <Button
                      size={ButtonSize.Large}
                      variant={ButtonType.Alert}
                      type="button"
                    >
                      Delete Ad
                    </Button>
                  </Link>
                </Layout>
              )}

              <Layout display={Display.Flex}>
                <Layout margin={{ left: 1, right: 1 }}>
                  <Link href={backLink}>
                    <Button
                      icon={SVGAsset.Close}
                      size={ButtonSize.Large}
                      variant={ButtonType.Secondary}
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Layout>

                <Layout>
                  <Button
                    size={ButtonSize.Large}
                    icon={SVGAsset.Edit}
                    variant={CoreButtonType.Primary}
                    type="submit"
                  >
                    Save
                  </Button>
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </Container>
      </form>
    </Layout>
  );
};

export default AdsEditorHtml;
