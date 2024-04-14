import {
  ButtonIcon,
  Color,
  CoreText,
  FontWeight,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';

import { getConfig } from '@/lib/config';

export const Footer = () => {
  return (
    <Layout display="flex" justifyContent="center" margin={{ top: 10 }}>
      <footer>
        {/* TODO use getConfig().copyright */}
        <CoreText
          fontWeight={FontWeight.Bold}
          color={Color.Alt2}
        >{`${new Date().getFullYear()} © ${getConfig().name}`}</CoreText>

        <Layout display="flex" justifyContent="center">
          <ButtonIcon icon={SVGAsset.Github} />
          <ButtonIcon icon={SVGAsset.Discord} />
          <ButtonIcon icon={SVGAsset.Hash} />
        </Layout>
      </footer>
    </Layout>
  );
};

export default Footer;
