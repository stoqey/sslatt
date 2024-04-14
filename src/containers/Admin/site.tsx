'use client';

import { useMutation, useQuery } from '@apollo/client';
import {
  AlignItems,
  Avatar,
  Button,
  ButtonSize,
  ButtonType,
  CoreButton,
  CoreButtonType,
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  LoadingButton,
  Overflow,
  PresenceStatus,
  SVGAsset,
  TextArea,
  Toggle,
  Tower,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import { omit } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { SiteSettings } from '@/components/types.generated';
import { GET_SITE_SETTINGS_ADMIN, UPDATE_SITE_SETTINGS_ADMIN } from '@/lib/gql';
import { cdnPath } from '@/lib/utils/api.utils';

import { DropAreaModal } from '../Upload/DropArea.modal';

interface FormData extends SiteSettings {}

export const AdminSiteSettings = () => {
  const { back, push } = useRouter();

  const [form, setForm] = useState<FormData>({} as any);

  const handle = (field: string) => {
    return (val: any) => {
      setForm({ ...form, [field]: val.target.value });
    };
  };

  const {
    logo,
    name,
    slogan,
    description,

    ENABLE_ENDGAME,
    REQUIRE_LOGIN,

    // payments {BTC, XMR}
    ENABLE_BTC,
    ENABLE_XMR,

    BTCPAYSERVER_URL, //= https://xxxxxxx/api/v1
    BTCPAYSERVER_BTC, // =S-xxxxx-BTC
    BTCPAYSERVER_CRON_ENABLED, // =BTC
    BTCPAYSERVER_CRON, // =*/1 * * * *

    WALLET_RPC_URL, // =http://xxxxxxx:38084
    WALLET_RPC_USER, // =rpc_user
    WALLET_RPC_PASSWORD, // =abc123
    WALLET_PATH, // =abc123
    WALLET_PASSWORD, // =abc123
    WALLETS_DIR, // =/Users/ceddy/xmr/xwallet

    MONEROX_URL, // =http://...
    MONEROX_WALLET, //= xxx-xxx-xx-xxx-xxxxxx
    MONEROX_CRON, //= */1 * * * *

    // notifications { xmpp, }
    ENABLE_XMPP,
    XMPP_HOST,
    XMPP_PORT,
    XMPP_JID,
    XMPP_PASSWORD,

    // security { pgp }
    ENABLE_PGP,
    PGP_PUBLIC_KEY,

    theme,
  } = form;

  console.log('form', form);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [updateSiteSettings, { data: updatedSiteSettings, loading }] =
    useMutation<{
      data: { data: SiteSettings; success?: boolean; message?: string };
    }>(UPDATE_SITE_SETTINGS_ADMIN);

  const { data: siteSettings } = useQuery<{
    data: SiteSettings;
  }>(GET_SITE_SETTINGS_ADMIN);

  const onSubmit = () => {
    updateSiteSettings({
      variables: {
        args: form,
      },
    });
  };

  const onClose = () => {
    back();
  };

  const handleViewClick = () => {
    push('/');
  };

  useEffect(() => {
    if (isEmpty(siteSettings) && isEmpty(form)) return;
    setForm(omit(siteSettings?.data, ['feePrices']) as any);
  }, [siteSettings]);

  useEffect(() => {
    if (isEmpty(updatedSiteSettings?.data) || loading) return;
    setForm(omit(updatedSiteSettings?.data?.data, ['feePrices']) as any);
  }, [updatedSiteSettings]);

  const AvatarComponent = () => (
    <DropAreaModal
      accepts={{
        'image/svg': ['.svg'],
      }}
      defaultFiles={
        isEmpty(logo)
          ? []
          : [cdnPath(logo)].map((i) => ({
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
        setForm({ ...form, logo: cdnPath(newAvatar as any) });
      }}
      Placeholder={
        <Layout margin={0.5}>
          <Avatar
            borderRadius={BorderRadius.None}
            presenceIndicator={false}
            size={96}
            alt="Site logo"
            userLogin={name}
            src={!isEmpty(logo) ? cdnPath(logo) : null}
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
                View Site
              </Button>
            </Layout>
          </Layout>

          <Layout>
            <AvatarComponent />
          </Layout>

          {/* 
    
            payments, rates {BTC, XMR}
            notifications { xmpp, }
            security { pgp }
          */}

          <Layout padding={{ bottom: 2 }}>
            <Layout padding={{ bottom: 2 }}>
              <Tower>
                <FormGroup label="Name">
                  <Input
                    value={name}
                    onChange={handle('name')}
                    type={InputType.Text}
                  />
                </FormGroup>
                <FormGroup label="Slogan">
                  <Input
                    value={slogan}
                    onChange={handle('slogan')}
                    type={InputType.Text}
                  />
                </FormGroup>

                <Layout fullWidth>
                  <FormGroup label="Description">
                    <TextArea
                      value={description}
                      onChange={handle('description')}
                      size={InputSize.Large}
                    />
                  </FormGroup>
                </Layout>

                <Layout fullWidth>
                  <FormGroup label="Theme">
                    {/* color picker */}
                    <Layout display="flex">
                      <input
                        type="color"
                        value={theme}
                        onChange={handle('theme')}
                      />
                      <Layout margin={{ left: 1 }}>
                        <CoreButton> See all themes </CoreButton>
                      </Layout>
                    </Layout>
                  </FormGroup>
                </Layout>

                <Layout fullWidth>
                  <FormGroup label="Appearance">{/* color picker */}</FormGroup>
                </Layout>
              </Tower>
            </Layout>

            <CoreText>Payments</CoreText>
            <Layout padding={{ bottom: 2 }}>
              <Tower>
                <FormGroup label="BTC">
                  <Toggle
                    checked={ENABLE_BTC}
                    onChange={() =>
                      handle('ENABLE_BTC')({ target: { value: !ENABLE_BTC } })
                    }
                  />
                  <Layout fullWidth padding={{ left: 2 }}>
                    {[
                      { label: 'BTCPAYSERVER_BTC', value: BTCPAYSERVER_BTC },
                      { label: 'BTCPAYSERVER_CRON', value: BTCPAYSERVER_CRON },
                      {
                        label: 'BTCPAYSERVER_CRON_ENABLED',
                        value: BTCPAYSERVER_CRON_ENABLED,
                      },
                      { label: 'BTCPAYSERVER_URL', value: BTCPAYSERVER_URL },
                    ].map((i) => (
                      <Layout key={i.label}>
                        <CoreText>{i.label.replace('_', ' ')}</CoreText>
                        <Input
                          disabled={!ENABLE_BTC}
                          value={i.value}
                          onChange={handle(i.label)}
                          type={InputType.Text}
                        />
                      </Layout>
                    ))}
                  </Layout>
                </FormGroup>
                <FormGroup label="XMR">
                  <Toggle
                    checked={ENABLE_XMR}
                    onChange={() =>
                      handle('ENABLE_XMR')({ target: { value: !ENABLE_XMR } })
                    }
                  />
                  <Layout fullWidth padding={{ left: 2 }}>
                    {[
                      { label: 'WALLET_RPC_URL', value: WALLET_RPC_URL },
                      { label: 'WALLET_RPC_USER', value: WALLET_RPC_USER },
                      {
                        label: 'WALLET_RPC_PASSWORD',
                        value: WALLET_RPC_PASSWORD,
                      },
                      { label: 'WALLET_PATH', value: WALLET_PATH },
                      { label: 'WALLET_PASSWORD', value: WALLET_PASSWORD },
                      { label: 'WALLETS_DIR', value: WALLETS_DIR },
                      { label: 'MONEROX_URL', value: MONEROX_URL },
                      { label: 'MONEROX_WALLET', value: MONEROX_WALLET },
                      { label: 'MONEROX_CRON', value: MONEROX_CRON },
                    ].map((i) => (
                      <Layout key={i.label}>
                        <CoreText>{i.label.replace('_', ' ')}</CoreText>
                        <Input
                          disabled={!ENABLE_XMR}
                          value={i.value}
                          onChange={handle(i.label)}
                          type={InputType.Text}
                        />
                      </Layout>
                    ))}
                  </Layout>
                </FormGroup>
              </Tower>
            </Layout>

            <CoreText>Notifications</CoreText>
            <Layout padding={{ bottom: 2 }}>
              <Layout padding={{ bottom: 2 }}>
                <Tower>
                  <FormGroup label="XMPP">
                    <Toggle
                      checked={ENABLE_XMPP}
                      onChange={() =>
                        handle('ENABLE_XMPP')({
                          target: { value: !ENABLE_XMPP },
                        })
                      }
                    />
                    <Layout fullWidth padding={{ left: 2 }}>
                      {[
                        { label: 'XMPP_HOST', value: XMPP_HOST },
                        { label: 'XMPP_PORT', value: XMPP_PORT },
                        {
                          label: 'XMPP_JID',
                          value: XMPP_JID,
                        },
                        {
                          label: 'XMPP_PASSWORD',
                          value: XMPP_PASSWORD,
                        },
                      ].map((i) => (
                        <Layout key={i.label}>
                          <CoreText>{i.label.replace('_', ' ')}</CoreText>
                          <Input
                            disabled={!ENABLE_XMPP}
                            value={i.value}
                            onChange={handle(i.label)}
                            type={InputType.Text}
                          />
                        </Layout>
                      ))}
                    </Layout>
                  </FormGroup>
                </Tower>
              </Layout>
            </Layout>

            <CoreText>Security</CoreText>
            <Layout padding={{ bottom: 2 }}>
              <Layout padding={{ bottom: 2 }}>
                <Tower>
                  <FormGroup label="Enable Endgame">
                    <Toggle
                      checked={ENABLE_ENDGAME}
                      onChange={() =>
                        handle('ENABLE_ENDGAME')({
                          target: { value: !ENABLE_ENDGAME },
                        })
                      }
                    />
                  </FormGroup>

                  <FormGroup label="Require Login">
                    <Toggle
                      checked={REQUIRE_LOGIN}
                      onChange={() =>
                        handle('REQUIRE_LOGIN')({
                          target: { value: !REQUIRE_LOGIN },
                        })
                      }
                    />
                  </FormGroup>

                  <FormGroup label="Enable PGP for all">
                    <Toggle
                      checked={ENABLE_PGP}
                      onChange={() =>
                        handle('ENABLE_PGP')({
                          target: { value: !ENABLE_PGP },
                        })
                      }
                    />
                  </FormGroup>

                  <FormGroup label="Public key">
                    <TextArea
                      value={PGP_PUBLIC_KEY}
                      onChange={handle('PGP_PUBLIC_KEY')}
                      size={InputSize.Large}
                      rows={3}
                    />
                  </FormGroup>
                </Tower>
              </Layout>
            </Layout>

            {/* <Tower childWidth={TowerChildWidth.Small}>
              {fields.map((field: any) => (
                <FormGroup key={field} label={field}>
                  <Input
                    value={(form as any)[field]}
                    onChange={handle(field)}
                    type={InputType.Text}
                  />
                </FormGroup>
              ))}
            </Tower> */}
          </Layout>

          {/* <Layout padding={{ bottom: 2 }}>
            <Tower>
              <FormGroup label="First name">
                <Input
                  value={firstname}
                  onChange={handle("firstname")}
                  type={InputType.Text}
                />
              </FormGroup>
              <FormGroup label="Last name">
                <Input
                  value={lastname}
                  onChange={handle("lastname")}
                  type={InputType.Text}
                />
              </FormGroup>
            </Tower>
          </Layout> */}
        </Layout>

        {/* Address and Photos */}
        {/* <Layout>
          <Layout padding={{ bottom: 2 }}>
            <Tower>
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
            </Tower>

            <Layout fullWidth>
              <FormGroup label="Bio">
                <TextArea
                  value={bio}
                  onChange={handle("bio")}
                  size={InputSize.Large}
                />
              </FormGroup>
            </Layout>
          </Layout>
        </Layout> */}
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
                // eslint-disable-next-line no-nested-ternary
                loading
                  ? 'loading'
                  : updatedSiteSettings?.data?.success
                    ? 'success'
                    : 'default'
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

export default AdminSiteSettings;
