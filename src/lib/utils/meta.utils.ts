export const sslattSeo = [
  { name: 'application-name', content: 'SSLATT' },
  { name: 'theme-color', content: '#ffffff' },
  {
    property: 'title',
    content: 'SSLATT',
  },
  {
    name: 'description',
    content: 'SSLATT',
  },

  { property: 'og:site_name', content: 'sslatt' },
  { property: 'og:type', content: 'website' },

  {
    property: 'og:title',
    content: 'SSLATT',
  },

  //   SEO Image
  { property: 'og:image', content: `/img/da-snake.png?size=180&icon` },

  {
    property: 'og:description',
    content: 'SSLATT',
  },
];

const stqSeo = [
  { name: 'application-name', content: 'Stoqey' },
  { name: 'theme-color', content: '#ffffff' },
  {
    name: 'keywords',
    content: `gme stock, amc stock, stock, btc to usd, silver price, dogecoin,
            silver, cryptocurrency, stocks to buy now, btc, amc, stock screener,
            sndl, gold, aphria stock, stock market, ethereum price, sndl stock,
            scr stock, scr stock, zom stock, gme stock price, penny stocks,  investing services, invest service, trading services, trade service, trading account services, trade account, invest account, business account, stocks, stocks investing, crypto, crypto investing, bitcoin, ico, contracts, ethereum, dogecoin, stoqey, STQ`,
  },

  {
    property: 'title',
    content: 'Stoqey - Predict Stocks and Crypto',
  },
  {
    name: 'description',
    content: 'Predict Stocks and Crypto',
  },

  { property: 'twitter:card', content: 'summary' },
  { property: 'twitter:site', content: '@stoqey_' },

  { property: 'og:site_name', content: 'stoqey' },
  { property: 'og:url', content: `https://stoqey.com` },
  { property: 'og:type', content: 'website' },

  {
    property: 'og:title',
    content: 'Stoqey - Predict Stocks and Crypto',
  },

  //   SEO Image
  { property: 'og:image', content: `/img/stq-banner.png?size=180&icon` },

  {
    property: 'og:description',
    content: 'Predict Stocks and Crypto',
  },
];

const vugaSeo = [
  { name: 'application-name', content: 'VugaTV' },
  { name: 'theme-color', content: '#ffffff' },
  {
    name: 'keywords',
    content: ``,
  },

  {
    property: 'title',
    content: 'Vuga - The leading media hub!',
  },
  {
    name: 'description',
    content: 'The leading media hub!',
  },

  { property: 'twitter:card', content: 'summary' },
  { property: 'twitter:site', content: '@GetVuga' },

  { property: 'og:site_name', content: 'vuga' },
  { property: 'og:url', content: `https://vuga.tv` },
  { property: 'og:type', content: 'website' },

  {
    property: 'og:title',
    content: 'Vuga - The leading media hub!',
  },

  //   SEO Image
  { property: 'og:image', content: `/img/vuga.png?size=180&icon` },

  {
    property: 'og:description',
    content: 'The leading media hub!',
  },
];

const meta = {
  stq: stqSeo,
  vuga: vugaSeo,
  sslatt: sslattSeo,
};

export const getSeoMeta = (service: any = 'sslatt') => {
  return meta[service];
};

const titles = {
  stq: 'Stoqey - Predict Stocks and Crypto',
  vuga: 'Vuga - The leading media hub!',
  sslatt: 'SSLATT',
};

export const getSeoTitle = (service: any) => {
  return titles[service];
};

const favicons = {
  stq: '/img/stq-bot.png',
  vuga: '/img/providers/vuga-app-color.png',
  sslatt: '/img/da-snake.png',
};

export const getSeoFavicons = (service: any) => {
  return favicons[service];
};
