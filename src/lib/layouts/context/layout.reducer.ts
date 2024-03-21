// [res] [component] [placement]
export enum ServiceProviders {
  algo = 'algo',
  vuga = 'vuga',
  stq = 'stq',
  ads = 'ads',
  sslatt = 'sslatt',
  // ...TODO other providers
}

export const ServiceProvidersDetails = {
  [ServiceProviders.vuga]: {
    url: 'vuga.tv',
  },
  [ServiceProviders.stq]: {
    url: 'stoqey.com',
  },
};

export type IServiceProvider = keyof typeof ServiceProviders;

export enum LayoutActionType {
  INIT = 'INIT',
  THEME = 'THEME',
  TOGGLE = 'TOGGLE',
  HIDE = 'HIDE',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
}

// LAYOUT TYPES
export type LayoutTheme = 'dark' | 'light';
export type LayoutNavType = 'Top' | 'Bottom';

export interface NavToggle {
  placement: LayoutNavType;
}

export interface LayoutState {
  mobileNavBottom: boolean;
  mobileNavTop: boolean;
  theme: LayoutTheme;
  serviceProvider: IServiceProvider;
}

export const initialState: LayoutState = {
  mobileNavBottom: true,
  mobileNavTop: true,
  theme: 'light',
  serviceProvider: 'sslatt',
};

type Action =
  | { type: LayoutActionType.INIT; payload: LayoutState }
  | { type: LayoutActionType.TOGGLE; payload: NavToggle }
  | { type: LayoutActionType.THEME; payload: LayoutTheme }
  | { type: LayoutActionType.HIDE; payload: object }
  | {
      type: LayoutActionType.SERVICE_PROVIDER;
      payload: IServiceProvider;
    };
// TODO demo

export default function layoutReducer(
  state: LayoutState,
  action: Action,
): LayoutState {
  switch (action.type) {
    case LayoutActionType.INIT:
      return { ...state, ...action.payload };

    case LayoutActionType.TOGGLE:
      return {
        ...state,
        [`mobileNav${action.payload.placement}`]:
          !state[`mobileNav${action.payload.placement}`],
      };

    case LayoutActionType.THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case LayoutActionType.SERVICE_PROVIDER:
      return {
        ...state,
        serviceProvider: action.payload,
      };

    default:
      return { ...initialState, ...state };
  }
}
