/* eslint-disable @next/next/no-img-element */

'use client';

import {
  AccentRegion,
  Background,
  FormGroup,
  Input,
  InputSize,
  InputType,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { styled } from '@uuixjs/uuixweb-lib';
import React from 'react';

import { SslattIcon } from '@/components/logo/icon';
import { MessageSuccessHtml } from '@/containers/actions.html';

const SnakeBg = styled(Layout)`
  .cls-snake-1,
  .cls-snake-2 {
    fill: none;
    stroke: red;
  }

  .cls-scales-2 {
    stroke: red;
    stroke-miterlimit: 10;
    stroke-width: 4px;
  }
`;

export interface AuthWallProps {
  captcha?: string;
  iv?: string;
  encrypted?: string;
  message?: string;
  success?: boolean;
}

export const AuthWall = (props: AuthWallProps) => {
  const { captcha = '', iv, encrypted, message = '', success = false } = props;

  const [hasJs, setHasJs] = React.useState(false);

  React.useEffect(() => {
    setHasJs(true);
  }, []);

  return (
    <AccentRegion inputColorIsDark>
      <Layout
        className="relative"
        background={Background.AccentAlt2}
        style={{ background: 'blue', height: '100vh', width: '100vw' }}
      >
        <SnakeBg
          background={Background.Overlay}
          style={{
            backgroundImage: 'url(/snake-bg.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            backgroundSize: 'cover',
            // backgroundColor: '#06535b',
            position: 'absolute',
            height: '100vh',
            width: '100vw',
            left: 0,
            top: 0,
          }}
        >
          {/* <div style={{ width: "50vw", height: "50vh" }}>
            <SnakeBgIcon />
          </div> */}

          <Layout
            display="flex"
            alignItems="center"
            justifyContent="center"
            fullHeight
            fullWidth
            flexDirection="column"
          >
            <SslattIcon scale={2} />
            <Layout>
              {/* <Layout>
                <CoreText as="h5" color={Color.Overlay}>
                  Redirecting in ...
                </CoreText>
              </Layout> */}

              {/* <Layout>
                <TimerCountDown />
              </Layout> */}

              <Layout
                background={Background.Overlay}
                padding={5}
                textAlign="center"
              >
                <MessageSuccessHtml message={message} success={success} />

                {captcha && (
                  <Layout
                    margin={{ top: 1 }}
                    style={{
                      background: 'white',
                    }}
                  >
                    {iv && <img src={`/xcaptcha?key=${iv}`} alt="captcha" />}
                  </Layout>
                )}

                <form action="/api/captcha" method="POST">
                  <input type="hidden" name="js" value={hasJs} />
                  <input type="hidden" name="encryptedi" value={iv} />
                  <input type="hidden" name="encryptedx" value={encrypted} />
                  {/* image render */}
                  <FormGroup label="Confirm code">
                    <Input
                      style={{ fontSize: '1.5rem' }}
                      size={InputSize.Large}
                      name="confirmCode"
                      type={InputType.Text}
                      icon={SVGAsset.Lock}
                    />
                  </FormGroup>
                </form>
              </Layout>
            </Layout>
          </Layout>
        </SnakeBg>
      </Layout>
    </AccentRegion>
  );
};
