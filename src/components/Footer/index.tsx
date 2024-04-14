import {
  ButtonIcon,
  Color,
  CoreText,
  FontWeight,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';

export const Footer = () => {
  return (
    <Layout
      display="flex"
      justifyContent="center"
      margin={{ top: 5, bottom: 1 }}
    >
      <footer>
        {/* TODO use getConfig().copyright */}
        {/* TODO use getConfig().socials */}
        <CoreText
          fontWeight={FontWeight.Bold}
          color={Color.Alt2}
        >{`${new Date().getFullYear()} © SSLATT`}</CoreText>

        <Layout display="flex" justifyContent="center">
          <a href="https://github.com/stoqey/sslatt" target="_blank">
            <ButtonIcon icon={SVGAsset.Github} />
          </a>
          <a href="https://discord.gg/SYN73V8M" target="_blank">
            <ButtonIcon icon={SVGAsset.Discord} />
          </a>
          {/* <a href="https://join.slack.com/t/stoqey/shared_invite/zt-oc45mh6a-2yDrtEsp5gdIAoDzY1TeGQ" target='_blank'>
          <ButtonIcon icon={SVGAsset.Hash} />
          </a> */}
        </Layout>
      </footer>
    </Layout>
  );
};

export default Footer;
