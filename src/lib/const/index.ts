import { getConfig } from '@/lib/config';

/**
 * Enum screens
 */
export enum SCREENS {
  // pages
  Home = '/',
  Login = '/login',
  Chat = '/chat',
  Wallet = '/wallet',
  EditAccount = '/settings/account',

  Algo = '/algo',

  Ads = '/ad',
  MyAds = '/ad/myads',

  Stq = '/stq',
  StqSavedSearch = '/stq/saved',

  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Services = 'Services',
  Notification = 'Notification',
  Settings = 'Settings',
  ChatScreen = 'ChatScreen', // main screen
  ChatList = 'ChatList',
  ChatMessage = 'ChatMessage',
  ChatEdit = 'ChatEdit',
  Cards = 'Cards',
  Product = 'Product',
  Post = 'Post',
  UserProfile = 'UserProfile', // current loggedin, or something private to user
  ProfileView = 'ProfileView', // public SEO profile
  Stocks = 'Stocks',
}

export default SCREENS;

export const walletscurrenciesSSr = () => {
  const allCurrencies = [
    { currency: 'BTC', enabled: getConfig().ENABLE_BTC },
    { currency: 'XMR', enabled: getConfig().ENABLE_XMR },
  ];

  return allCurrencies.filter((c) => c.enabled).map((c) => c.currency);
};
