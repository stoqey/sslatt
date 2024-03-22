import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER_PROFILE } from '@roadmanjs/auth-client';
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
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  LoadingButton,
  LoadingStatus,
  Overflow,
  PresenceStatus,
  Select,
  SVGAsset,
  TextArea,
  Tower,
} from '@uuixjs/uuixweb';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { CountryType } from '@/lib/gql/country';
import { GET_ALL_COUNTRIES_QUERY } from '@/lib/gql/country';
import { useMeApi } from '@/lib/hooks/useUserCache';
import { cdnPath } from '@/lib/utils/api.utils';

import { DropAreaModal } from '../Upload/DropArea.modal';

interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  // phone: string; TODO add phone
  // email: undefined,
  // website: undefined,
  // address: undefined,
  country: string;
  bio: string;
  // city: undefined,
  // state: undefined,
  // zipcode: undefined,
  avatar: string;
  coverImage: string;
}

export const AccountSettings = () => {
  const { back, push } = useRouter();

  const user = useMeApi();
  // const { post, save, loadAdListing } = useAdsEditor(slug);

  const [form, setForm] = useState<FormData>({
    country: 'US',
  } as any);

  const handle = (field: string) => {
    return (val: any) => {
      setForm({ ...form, [field]: val.target.value });
    };
  };

  const { firstname, lastname, coverImage, avatar, country, bio, username } =
    form;

  const [updateUserProfile, { data, loading }] =
    useMutation(UPDATE_USER_PROFILE);

  const { data: countriesData, loading: loadingCountries } = useQuery<{
    data: CountryType[];
  }>(GET_ALL_COUNTRIES_QUERY);

  const updatedProfile = _get(data, 'data.data', null);

  const countryOptions =
    countriesData?.data?.map((cou) => ({
      label: cou.name,
      value: cou.isoCode,
    })) || [];

  const onSubmit = () => {
    updateUserProfile({
      variables: {
        user: pick(form, [
          'firstname',
          'lastname',
          'coverImage',
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
    push(`/u/${username}`);
  };

  useEffect(() => {
    if (isEmpty(user)) return;
    setForm(user as any);
  }, [user]);

  // useEffect(() => {
  //   if (isEmpty(updatedProfile)) return;
  //   setForm(updatedProfile as any);
  // }, [updatedProfile]);

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
                View Profile
              </Button>
            </Layout>
          </Layout>

          <Layout>
            <AvatarComponent />
          </Layout>

          <Layout padding={{ bottom: 2 }}>
            <Tower>
              <FormGroup label="First name">
                <Input
                  value={firstname}
                  onChange={handle('firstname')}
                  type={InputType.Text}
                />
              </FormGroup>
              <FormGroup label="Last name">
                <Input
                  value={lastname}
                  onChange={handle('lastname')}
                  type={InputType.Text}
                />
              </FormGroup>
            </Tower>
          </Layout>
        </Layout>

        {/* Address and Photos */}
        <Layout>
          <Layout padding={{ bottom: 2 }}>
            <Tower>
              <FormGroup label="Username">
                <Input
                  disabled
                  value={username}
                  onChange={handle('username')}
                  type={InputType.Text}
                />
              </FormGroup>

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
            </Tower>

            <Layout fullWidth>
              <FormGroup label="Bio">
                <TextArea
                  value={bio}
                  onChange={handle('bio')}
                  size={InputSize.Large}
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

export default AccountSettings;
