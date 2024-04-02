import type { VerticalNavigationItemProps } from '@uuixjs/uuixweb';
import { SVGAsset } from '@uuixjs/uuixweb';

interface MenuItemProps extends VerticalNavigationItemProps {
  slug?: string;
}

interface IMenu {
  iconAsset: any;
  title: string;
  menu: MenuItemProps | MenuItemProps[];
  slug: string;
}

export const adminMenus: IMenu[] = [
  {
    iconAsset: SVGAsset.Gear,
    title: 'Settings',
    slug: '/admin/site',
    menu: [
      {
        children: 'Site settings',
        slug: '/admin/site/settings',
      },
      {
        children: 'Category settings',
        slug: '/admin/site/categories',
      },
    ],
  },
  // users,
  // orders
  {
    iconAsset: SVGAsset.BountyBoard,
    title: 'Wallet',
    slug: '/admin/wallet',
    menu: [
      {
        children: 'All wallets',
        slug: '/admin/wallet',
      },
      {
        children: 'Withdraw Requests',
        slug: '/admin/wallet/withdraw',
      },
    ],
  },
  {
    iconAsset: SVGAsset.NavDashboard,
    title: 'Stores',
    slug: '/admin/store',
    menu: [
      {
        children: 'All Stores',
        slug: '/admin/store',
      },
      {
        children: 'All Ads',
        slug: '/admin/store/ads',
      },
    ],
  },
  {
    iconAsset: SVGAsset.ChatRiskFlag,
    title: 'Disputes',
    slug: '/admin/disputes',
    menu: [
      {
        children: 'All Disputes',
        slug: '/admin/disputes',
      },
      { children: 'Dispute Requests', slug: '/admin/disputes/requests' },
    ],
  },
  {
    iconAsset: SVGAsset.MessagesSC,
    title: 'Tickets',
    slug: '/admin/tickets',
    menu: [
      {
        children: 'Tickets',
        slug: '/admin/tickets',
      },
    ],
  },
];

// ----------------------------------------- CLIENT
const profileSettings: MenuItemProps = {
  iconAsset: SVGAsset.Gear,
  children: 'Profile',
  slug: '/settings/profile',
};

const pgpSettings: MenuItemProps = {
  iconAsset: SVGAsset.Gear,
  children: 'PGP',
  slug: '/settings/pgp',
};

const passwordSettings: MenuItemProps = {
  iconAsset: SVGAsset.Gear,
  children: 'Password',
  slug: '/settings/password',
};

const ordersList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'All Orders',
  slug: '/order',
};

const walletList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Wallets',
  slug: '/wallet',
};

const walletWithdrawsList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Withdraws',
  slug: '/wallet/withdraw',
};

const walletTransactionsList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Transactions',
  slug: '/wallet/transactions',
};

// ADS / STORE
// ADS / STORE
// ADS / STORE

const myAdsList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'My Ads',
  slug: '/store/ads',
};

const adsDashboard: MenuItemProps = {
  iconAsset: SVGAsset.NavDashboard,
  children: 'Dashboard',
  slug: '/store',
};

const storeSettings: MenuItemProps = {
  iconAsset: SVGAsset.NavDashboard,
  children: 'Settings',
  slug: '/store/settings',
};

export const adsStoreMenus = {
  iconAsset: SVGAsset.NavDashboard,
  title: 'Store',
  menu: [adsDashboard, myAdsList, storeSettings],
  slug: '/store',
};

export const clientMenus: IMenu[] = [
  {
    iconAsset: SVGAsset.Gear,
    title: 'Settings',
    menu: [profileSettings, pgpSettings, passwordSettings],
    slug: '/settings',
  },
  {
    iconAsset: SVGAsset.Document,
    title: 'Orders',
    menu: [ordersList],
    slug: '/order',
  },
  {
    iconAsset: SVGAsset.BountyBoard,
    title: 'Wallet',
    menu: [walletList, walletWithdrawsList, walletTransactionsList],
    slug: '/wallet',
  },
  {
    iconAsset: SVGAsset.NavDashboard,
    title: 'Store',
    menu: null,
    slug: '/store',
  },
];
