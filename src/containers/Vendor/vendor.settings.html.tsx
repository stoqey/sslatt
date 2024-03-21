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
  FormGroupOrientation,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  Overflow,
  SVGAsset,
  TextArea,
  Toggle,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import type {
  CountryType,
  UserType,
  VendorType,
} from '@/components/types.generated';
import { cdnPath } from '@/lib/utils/api.utils';

import { MessageSuccessHtml } from '../actions.html';

export interface VendorSettingsProps {
  vendor: VendorType;
  user?: UserType;
  countries?: CountryType[];
  message?: string;
  success?: boolean;
}

export const VendorSettings = (props: VendorSettingsProps) => {
  const { vendor, user, countries, success, message } = props;

  const pathname = usePathname();

  if (isEmpty(vendor)) return undefined;

  // console.log("VendorSettings > vendor", vendor);

  const username = user && user.username;
  const {
    vacation,
    cover,
    avatar = '',
    country,
    bio,
    name = user?.username,
  } = vendor;

  const countryOptions =
    countries?.map((country) => ({
      label: country.name,
      value: country.isoCode,
    })) || [];

  const viewStoreLink = `/html/store/${username}`;
  const updateLink = `/api/store/update`;
  const backLink = `/html/store`;

  return (
    <Layout overflow={Overflow.Scroll} fullWidth>
      <MessageSuccessHtml message={message} success={success} />

      <form method="POST" action={updateLink} encType="multipart/form-data">
        <input name="pathname" type="hidden" value={pathname} />
        <input name="avatar" type="hidden" value={avatar as any} />

        {/* Steps and Step Content */}
        <Layout padding={{ left: 2, right: 2 }}>
          <Layout margin={{ top: 2 }}>
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
                <Link href={viewStoreLink}>
                  <Button
                    size={ButtonSize.Small}
                    type="button"
                    icon={SVGAsset.Share}
                  >
                    View Store
                  </Button>
                </Link>
              </Layout>
            </Layout>

            <Layout>
              {/* image component */}
              <Layout padding={{ bottom: 2 }}>
                {/* TOOD styling */}
                {!isEmpty(avatar) && (
                  <CoreImage
                    style={{ width: '100px', height: '100px' }}
                    alt={name}
                    src={cdnPath(avatar)}
                  />
                )}
                <FormGroup label="Photo">
                  <input type="file" name="avatarFile" />
                </FormGroup>
              </Layout>
            </Layout>

            <Layout padding={{ bottom: 2 }}>
              <FormGroup
                label="Store name"
                orientation={FormGroupOrientation.Horizontal}
              >
                <Input
                  size={InputSize.Large}
                  defaultValue={name as string}
                  name="name"
                  type={InputType.Text}
                />
              </FormGroup>

              <Layout margin={{ top: 1 }}>
                <FormGroup
                  label="Vacation ?"
                  orientation={FormGroupOrientation.Horizontal}
                >
                  <Layout style={{ display: 'flex', justifyContent: 'center' }}>
                    <Toggle
                      id="vacation"
                      name="vacation"
                      label="Vacation"
                      defaultChecked={vacation as boolean}
                    />
                  </Layout>
                </FormGroup>
              </Layout>
            </Layout>
          </Layout>

          {/* Address and Photos */}
          <Layout>
            <Layout padding={{ bottom: 2 }}>
              {/* <Tower>
              <FormGroup label="Username">
                <Input
                  disabled
                  value={username}
                  onChange={handle("username")}
                  type={InputType.Text}
                />
              </FormGroup>

              <FormGroup label="Country">
                <Select
                  name="country"
                  value={country}
                  onChange={handle("country")}
                >
                  {countryOptions.map((i: any) => (
                    <option value={i.value} key={i.label + i.value}>
                      {i.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Tower> */}

              <Layout fullWidth>
                <FormGroup label="Bio">
                  <TextArea
                    defaultValue={bio as string}
                    name="bio"
                    size={InputSize.Large}
                    rows={15}
                  />
                </FormGroup>
              </Layout>
            </Layout>
          </Layout>
        </Layout>

        <Layout
          display={Display.Flex}
          justifyContent={JustifyContent.End}
          padding={{ bottom: 2, right: 3 }}
        >
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

            <Layout margin={{ right: 1 }}>
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
      </form>
    </Layout>
  );
};

export default VendorSettings;
