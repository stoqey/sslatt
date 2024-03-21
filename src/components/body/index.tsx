import {
  Display,
  FlexDirection,
  InjectLayout,
  Layout,
  Overflow,
} from '@uuixjs/uuixweb';
import React from 'react';

export const BodyContent = ({ children }: any) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      {/* sidebar */}
      {/* <div>
                <Layout
                    width={`${show ? "15" : "5"}rem`}
                    display={Display.Flex}
                    flexDirection={FlexDirection.Column}
                    overflow={Overflow.Scroll}
                >
                    <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
                        <ButtonIcon aria-label="" icon={SVGAsset.LeftColumnClose} onClick={() => setShow(!show)} />
                        {Array.from(Array(13).keys()).map((i) => (
                            <Layout key={i} margin={0.5}>
                                <Avatar
                                    size={30}
                                    alt=""
                                    userLogin={`qoi${i}`}
                                    presenceIndicator
                                    presenceStatus={PresenceStatus.Online}
                                />
                            </Layout>
                        ))}
                    </Layout>
                </Layout>
            </div> */}

      {/* main content */}
      <InjectLayout
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        fullWidth
        fullHeight
        overflow={Overflow.Hidden}
      >
        <main style={{ marginTop: '5rem' }}>
          <Layout display={Display.Flex} className="scrollable-area">
            <div
              style={{ width: '100%', height: '100%' }}
              className="simple-scroll-content"
            >
              {children}
            </div>
          </Layout>
        </main>
      </InjectLayout>
    </Layout>
  );
};
export default BodyContent;
