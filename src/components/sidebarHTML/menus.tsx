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

const adminWithdrawRequestList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Requests',
  slug: '/admin/withdraw',
};

const adminAdsList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'All Ads',
  slug: '/admin/ads',
};

const postList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'All Post',
  slug: '/admin/post',
};
const postCreate: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Post Create',
  slug: '/admin/post/create',
};

const pushList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Push',
  slug: '/admin/push',
};
const pushCreate: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Create Push',
  slug: '/admin/push/create',
};

const pushSend: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Send Push',
  slug: '/admin/push/send',
};
export const adminMenus: IMenu[] = [
  {
    iconAsset: SVGAsset.Plus,
    title: 'Withdraws',
    menu: [adminWithdrawRequestList],
    slug: '/admin/html/withdraw',
  },
  {
    iconAsset: SVGAsset.Plus,
    title: 'Ads',
    menu: [adminAdsList],
    slug: '/admin/ads',
  },
  {
    iconAsset: SVGAsset.Heart,
    title: 'Push',
    menu: [pushList, pushCreate, pushSend],
    slug: '/admin/push',
  },
];

// ----------------------------------------- CLIENT
const profileSettings: MenuItemProps = {
  iconAsset: SVGAsset.Gear,
  children: 'Profile',
  slug: '/html/settings/profile',
};

const pgpSettings: MenuItemProps = {
  iconAsset: SVGAsset.Gear,
  children: 'PGP',
  slug: '/html/settings/pgp',
};

const passwordSettings: MenuItemProps = {
  iconAsset: SVGAsset.Gear,
  children: 'Password',
  slug: '/html/settings/password',
};

const ordersList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'All Orders',
  slug: '/html/order',
};

const walletList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Wallets',
  slug: '/html/wallet',
};

const walletWithdrawsList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Withdraws',
  slug: '/html/wallet/withdraw',
};

const walletTransactionsList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'Transactions',
  slug: '/html/wallet/transactions',
};

// ADS / STORE
// ADS / STORE
// ADS / STORE

const myAdsList: MenuItemProps = {
  iconAsset: SVGAsset.Gift,
  children: 'My Ads',
  slug: '/html/store/ads',
};

const adsDashboard: MenuItemProps = {
  iconAsset: SVGAsset.NavDashboard,
  children: 'Dashboard',
  slug: '/html/store',
};

const storeSettings: MenuItemProps = {
  iconAsset: SVGAsset.NavDashboard,
  children: 'Settings',
  slug: '/html/store/settings',
};

export const adsStoreMenus = {
  iconAsset: SVGAsset.NavDashboard,
  title: 'Store',
  menu: [adsDashboard, myAdsList, storeSettings],
  slug: '/html/store',
};

export const clientMenus: IMenu[] = [
  {
    iconAsset: SVGAsset.Gear,
    title: 'Settings',
    menu: [profileSettings, pgpSettings, passwordSettings],
    slug: '/html/settings',
  },
  {
    iconAsset: SVGAsset.Document,
    title: 'Orders',
    menu: [ordersList],
    slug: '/html/order',
  },
  {
    iconAsset: SVGAsset.BountyBoard,
    title: 'Wallet',
    menu: [walletList, walletWithdrawsList, walletTransactionsList],
    slug: '/html/wallet',
  },
  {
    iconAsset: SVGAsset.NavDashboard,
    title: 'Store',
    menu: null,
    slug: '/html/store',
  },
];
