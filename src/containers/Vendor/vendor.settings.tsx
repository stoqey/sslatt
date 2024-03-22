import { useMutation, useQuery } from '@apollo/client';
import {
  AlignItems,
  Avatar,
  Button,
  ButtonSize,
  ButtonType,
  CoreButtonType,
  Display,
  FlexDirection,
  FormGroup,
  FormGroupOrientation,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  LoadingButton,
  LoadingStatus,
  Overflow,
  PresenceStatus,
  SVGAsset,
  TextArea,
  Toggle,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { UPDATE_VENDOR_MUTATION } from '@/lib/gql';
import type { CountryType } from '@/lib/gql/country';
import { GET_ALL_COUNTRIES_QUERY } from '@/lib/gql/country';
import { useMeApi, useVendor } from '@/lib/hooks/useUserCache';
import { cdnPath } from '@/lib/utils/api.utils';

import { DropAreaModal } from '../Upload/DropArea.modal';

interface FormData {
  id: string;
  name: string;
  vacation: boolean;
  country: string;
  bio: string;
  avatar: string;
  cover: string;
}

export const VendorSettings = () => {
  const { back, push } = useRouter();

  const user = useMeApi();
  const { vendor } = useVendor();

  console.log('VendorSettings > vendor', vendor);

  const [form, setForm] = useState<FormData>({
    country: 'US',
  } as any);

  const username = user && user.username;
  const { vacation, cover, avatar, country, bio, name = user?.username } = form;

  const handle = (field: string) => {
    return (val: any) => {
      setForm({ ...form, [field]: val.target.value });
    };
  };

  const [updateVendor, { data, loading }] = useMutation(UPDATE_VENDOR_MUTATION);

  const { data: countriesData, loading: loadingCountries } = useQuery<{
    data: CountryType[];
  }>(GET_ALL_COUNTRIES_QUERY);

  const countryOptions =
    countriesData?.data?.map((coun) => ({
      label: coun.name,
      value: coun.isoCode,
    })) || [];

  const onSubmit = () => {
    updateVendor({
      variables: {
        vendor: pick(form, [
          'id',
          'name',
          'vacation',
          'cover',
          'avatar',
          'country',
          'bio',
        ]),
      },
    });
  };

  const onClose = () => {
    back();
  };

  const handleViewClick = () => {
    push(`/store/${user.username}`);
  };

  useEffect(() => {
    if (isEmpty(vendor)) return;
    setForm(vendor as any);
  }, [vendor]);

  const AvatarComponent = () => (
    <DropAreaModal
      defaultFiles={
        isEmpty(avatar)
          ? []
          : [cdnPath(avatar)].map((i) => ({
              uploaded: true,
              url: i,
              filename: i,
              preview: i,
            }))
      }
      multi={false}
      onChangeFiles={(files) => {
        const newPhotos = files.map((file) => file.url);
        const newAvatar = newPhotos[0];
        if (isEmpty(newAvatar)) return;
        setForm({ ...form, avatar: cdnPath(newAvatar as any) });
      }}
      Placeholder={
        <Layout margin={0.5}>
          <Avatar
            size={80}
            alt=""
            userLogin={username}
            presenceIndicator
            presenceStatus={PresenceStatus.Online}
          />
        </Layout>
      }
      Preview={(pp: any) => (
        <Layout margin={0.5}>
          <Avatar
            size={80}
            alt=""
            userLogin={pp.url}
            presenceIndicator
            presenceStatus={PresenceStatus.Online}
            borderRadius={BorderRadius.Small}
            src={pp.uploaded ? cdnPath(pp.preview) : pp.preview}
            // src={cdnPath(avatar)}
          />
        </Layout>
      )}
    />
  );

  return (
    <Layout overflow={Overflow.Scroll}>
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
              <Button
                size={ButtonSize.Small}
                onClick={handleViewClick}
                icon={SVGAsset.Share}
              >
                View Store
              </Button>
            </Layout>
          </Layout>

          <Layout>
            <AvatarComponent />
          </Layout>

          <Layout padding={{ bottom: 2 }}>
            <FormGroup
              label="Store name"
              orientation={FormGroupOrientation.Horizontal}
            >
              <Input
                size={InputSize.Large}
                value={name}
                onChange={handle('name')}
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
                    disabled={loading}
                    label="Vacation"
                    checked={vacation}
                    onChange={(e: any) => {
                      setForm({ ...form, vacation: !vacation });
                    }}
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
                  value={bio}
                  onChange={handle('bio')}
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
              onClick={() => onSubmit()}
              loadingStatus={
                loading ? LoadingStatus.Loading : LoadingStatus.Default
              }
            >
              Save
            </LoadingButton>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default VendorSettings;
