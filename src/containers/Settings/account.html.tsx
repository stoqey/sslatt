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
  Overflow,
  SVGAsset,
  TextArea,
  Tower,
} from '@uuixjs/uuixweb';
import type { UserType, VendorType } from '@/components/types.generated';

import Link from 'next/link';
import { MessageSuccessHtml } from '../actions.html';
import React from 'react';
import { cdnPath } from '@/lib/utils/api.utils';
import isEmpty from 'lodash/isEmpty';
import { usePathname } from 'next/navigation';

export interface AccountSettingsProps {
  // eslint-disable-next-line react/no-unused-prop-types
  vendor?: VendorType;
  user?: UserType;
  message?: string;
  success?: boolean;
}

export const AccountSettings = (props: AccountSettingsProps) => {
  const { message = '', success = false } = props;

  if (isEmpty(props.user)) {
    return undefined;
  }

  const { firstname, lastname, coverImage, avatar, country, bio, username } =
    props.user;

  const pathname = usePathname();
  const viewLink = `/html/u/${username}`;
  const logoutLink = `/api/logout`;

  const updateLink = `/api/settings/profile`;

  return (
    <Layout overflow={Overflow.Scroll}>
      <Layout padding={{ bottom: 2, top: 2 }}>
        <MessageSuccessHtml message={message} success={success} />
      </Layout>

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
          margin={{ right: 1 }}
        >
          <Link href={logoutLink}>
            <Button
              variant={ButtonType.Secondary}
              size={ButtonSize.Small}
              icon={SVGAsset.NavLogout}
            >
              Logout
            </Button>
          </Link>
        </Layout>

        <Layout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <Link href={viewLink}>
            <Button size={ButtonSize.Small} icon={SVGAsset.Share}>
              View Profile
            </Button>
          </Link>
        </Layout>
      </Layout>
      <form method="POST" action={updateLink} encType="multipart/form-data">
        <input name="pathname" type="hidden" value={pathname} />
        <input name="avatar" type="hidden" value={avatar as any} />

        {/* Steps and Step Content */}
        <Layout padding={{ left: 2, right: 2 }}>
          <Layout margin={{ top: 2 }}>
            <Layout>
              <Layout padding={{ bottom: 2 }}>
                {/* TOOD styling, cdnUrl */}
                {!isEmpty(avatar) && (
                  <Avatar
                    size={80}
                    userLogin={username}
                    alt={username}
                    src={cdnPath(avatar)}
                  />
                )}
                <FormGroup label="Photo">
                  <input type="file" name="avatarFile" />
                </FormGroup>
              </Layout>
            </Layout>

            <Layout padding={{ bottom: 2 }}>
              <Tower>
                {/* full name? */}
                <FormGroup label="First name">
                  <Input
                    defaultValue={firstname}
                    name="firstname"
                    type={InputType.Text}
                  />
                </FormGroup>
                <FormGroup label="Last name">
                  <Input
                    defaultValue={lastname}
                    name="lastname"
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
                    defaultValue={username}
                    type={InputType.Text}
                  />
                </FormGroup>

                {/* <FormGroup label="Country">
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
              </FormGroup> */}
              </Tower>

              <Layout fullWidth>
                <FormGroup label="Bio">
                  <TextArea
                    defaultValue={bio}
                    name="bio"
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
            <Layout margin={{ right: 1 }}>
              <Button
                type="submit"
                size={ButtonSize.Large}
                icon={SVGAsset.Edit}
                variant={CoreButtonType.Primary}
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

export default AccountSettings;
