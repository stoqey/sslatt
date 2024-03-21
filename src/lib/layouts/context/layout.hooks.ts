import { usePathname, useRouter } from 'next/navigation';

import { useLayoutDispatch, useLayoutState } from './layout.provider';
import type { LayoutTheme } from './layout.reducer';
import { LayoutActionType } from './layout.reducer';

interface UseLayoutTheme {
  theme?: LayoutTheme;
  changeTheme(theme: LayoutTheme): void;
  toggleColorMode(): void;
}

export const useLayoutTheme = (): UseLayoutTheme => {
  const [theme] = useLayoutState(['theme']);
  const dispatch = useLayoutDispatch();
  const changeTheme = (payload: LayoutTheme) => {
    dispatch({ type: LayoutActionType.THEME, payload });
  };

  const toggleColorMode = () => {
    const colorMode: LayoutTheme = theme === 'dark' ? 'light' : 'dark';
    changeTheme(colorMode as LayoutTheme);
  };

  return { theme, changeTheme, toggleColorMode };
};

export const useIsHome = () => {
  const pathname = usePathname();
  const { push, replace, back } = useRouter();
  const isHome = pathname === '/';
  return { isHome, push, back, replace };
};
