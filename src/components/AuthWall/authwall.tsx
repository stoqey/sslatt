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

import { MessageSuccessHtml } from '@/containers/actions.html';

import { SslattIcon } from '../logo/icon';

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
  // const [blobUrl, setBlobUrl] = React.useState<string | undefined >(null);
  // #39FF14
  const { captcha = '', iv, encrypted, message = '', success = false } = props;
  // const cols = { default: 12, md: 6, lg: 6, xl: 6, xxl: 6 };

  // useEffect(() => {
  //   if (process.browser) {
  //     const filebinary = atob(captcha);
  //     const myUint8Array = Uint8Array.from(filebinary, (c) => c.charCodeAt(0));
  //     const blob = new Blob([myUint8Array], { type: 'image/png' });
  //     const myUrl = window.URL.createObjectURL(blob);
  //     setBlobUrl(myUrl);
  //   }
  // }, [captcha]);

  const filebinary = atob(captcha);
  const myUint8Array = Uint8Array.from(filebinary, (c) => c.charCodeAt(0));
  const blob = new Blob([myUint8Array], { type: 'image/png' });

  if (!process.browser) {
    return undefined;
  }

  const blobUrl = window.URL.createObjectURL(blob);

  return (
    <AccentRegion inputColorIsDark>
      <Layout
        className="relative"
        background={Background.AccentAlt2}
        // fullHeight fullWidth
        style={{ background: 'blue', height: '100vh', width: '100vw' }}
      >
        <SnakeBg
          style={{
            backgroundImage: 'url(/snake-bg.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            backgroundSize: 'cover',
            backgroundColor: '#06535b',
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
                      // width: "200px",
                      background: 'white',
                    }}
                    // dangerouslySetInnerHTML={{
                    //   __html: captcha,
                    // }}
                  >
                    {blobUrl && <img src={blobUrl} alt="captcha" />}
                  </Layout>
                )}

                <form action="/api/captcha" method="POST">
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
