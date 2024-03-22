import * as React from 'react';

import {
  Attached,
  Display,
  DropDownMenuWrapper,
  FlexDirection,
  Layout,
  SVGAsset,
  VerticalNavigation,
  VerticalNavigationGroup,
  VerticalNavigationItem,
  VerticalNavigationStateProvider,
  useDialogState,
} from '@uuixjs/uuixweb';
import { adminMenus, adsStoreMenus, clientMenus } from './menus';
import { useMeApi, useVendor } from '@/lib/hooks/useUserCache';
import { usePathname, useRouter } from 'next/navigation';

import type { VerticalNavigationItemProps } from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';

interface MenuItemProps extends VerticalNavigationItemProps {
  slug?: string;
}

interface IMenu {
  iconAsset: any;
  title: string;
  menu: MenuItemProps | MenuItemProps[];
  slug: string;
}

interface VerticalSideBarProps {
  client?: boolean;
  isOpen?: boolean;
}

export const VerticalSideBar = ({
  client = false,
  isOpen = false,
}: VerticalSideBarProps) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [state, setState] = React.useState({
    open: isOpen,
    // menus: client ? clientMenus : adminMenus,
  });

  // TODO auth
  const user = useMeApi();
  const { vendor } = useVendor();
  const { open } = state;

  let menus = client ? clientMenus : adminMenus;

  if (!isEmpty(vendor)) {
    menus = menus.map((menu) => {
      if (menu.slug === '/store') {
        return adsStoreMenus;
      }
      return menu;
    });
  }

  const pathnames = pathname.split('/');

  const NavItem = (item: IMenu) => {
    const { anchorProps, dialogProps } = useDialogState();

    const { show, onRequestClose } = dialogProps || {};
    // const isOpen = pathnames.includes(item.slug);
    const menuItems = item.menu as MenuItemProps[];

    const slugend = item.slug.split('/').pop() || "";
    const isOpened = pathnames.includes(slugend);

    return (
      <>
        <VerticalNavigationItem
          iconAsset={item.iconAsset}
          {...anchorProps}
          selected={isOpened}
        >{""}</VerticalNavigationItem>
        {show && (
          <Attached direction="right">
            <DropDownMenuWrapper>
              {menuItems.map((subitem, index) => (
                <VerticalNavigationItem
                  key={subitem.slug}
                  onClick={() => {
                    push(subitem?.slug || '/');
                  }}
                >
                  {subitem.children}
                </VerticalNavigationItem>
              ))}
            </DropDownMenuWrapper>
          </Attached>
        )}
      </>
    );
  };

  return (
    <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
      <Layout
        display={Display.Flex}
        style={{ height: '-webkit-fill-available' }}
      >
        <div style={{ width: open ? 200 : 60 }}>
          <Layout fullHeight border>
            <VerticalNavigationStateProvider
              defaultOpenGroupIDs={[...pathnames]}
            >
              {({ openGroupIDs, onOpenGroup, onCloseGroup }) => (
                <VerticalNavigation>
                  <VerticalNavigationItem
                    onClick={() => {
                      setState({ open: !state.open });
                    }}
                    iconAsset={
                      state.open
                        ? SVGAsset.ColSlideLeft
                        : SVGAsset.ColSlideRight
                    }
                  >{""}</VerticalNavigationItem>

                  {menus.map((item) => {
                    // return  <MenuItem index={menu.slug} item={menu} onCloseGroup={onCloseGroup} onOpenGroup={onOpenGroup} openGroupIDs={openGroupIDs} />
                    const { menu, slug, title, iconAsset } = item;

                    if (Array.isArray(menu)) {
                      const menuItems = menu as MenuItemProps[];
                      const slugend = slug.split('/').pop();
                      const isOpened = openGroupIDs.includes(slugend);

                      return open ? (
                        <VerticalNavigationGroup
                          key={item.title}
                          label={item.title}
                          iconAsset={item.iconAsset}
                          open={isOpened}
                          onOpen={() => onOpenGroup(slugend)}
                          onClose={() => onCloseGroup(slugend)}
                        >
                          {menuItems.map((subitem, index) => {
                            return (
                              <VerticalNavigationItem
                                key={item.slug}
                                selected={subitem.slug === pathname}
                                onClick={() => {
                                  push(subitem.slug);
                                }}
                              >
                                {subitem.children}
                              </VerticalNavigationItem>
                            );
                          })}
                        </VerticalNavigationGroup>
                      ) : (
                        <NavItem {...item} />
                      );
                    }

                    const onClick = () => {
                      push(slug);
                    };

                    const selected = slug === pathname;

                    return open ? (
                      <VerticalNavigationItem
                        iconAsset={iconAsset}
                        selected={selected}
                        onClick={onClick}
                      >
                        {title}
                      </VerticalNavigationItem>
                    ) : (
                      <VerticalNavigationItem
                        iconAsset={iconAsset}
                        children=""
                        selected={selected}
                        onClick={onClick}
                      />
                    );
                  })}

                  <div style={{ height: '400px' }} />
                </VerticalNavigation>
              )}
            </VerticalNavigationStateProvider>
            <div style={{ height: '50vh' }} />
          </Layout>
        </div>
      </Layout>
    </Layout>
  );
};

export default VerticalSideBar;
