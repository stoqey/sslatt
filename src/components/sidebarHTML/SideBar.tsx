import type { VerticalNavigationItemProps } from '@uuixjs/uuixweb';
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
} from '@uuixjs/uuixweb';
import { styled } from '@uuixjs/uuixweb-lib';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import type { VendorType } from '../types.generated';
import { adminMenus, adsStoreMenus, clientMenus } from './menus';

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
  openSideBar: boolean;
  client?: boolean;
  isOpen?: boolean;
  vendor?: VendorType;
  user?: VendorType;
}

export const StyledSubMenuItem = styled.label`
  p {
    padding-left: 4rem;
  }
`;

const ColOpenSideBar = styled(VerticalNavigationItem)<{ open: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.open ? 'end' : 'start')};

  .vertical-navigation-item-base__text-container {
    padding-right: 0 !important;
    margin-right: 0 !important;
  }
`;

export const VerticalSideBar = ({
  client = false,
  openSideBar = false,
  vendor,
}: VerticalSideBarProps) => {
  const pathname = usePathname();

  const open = openSideBar;

  let menus = client ? clientMenus : adminMenus;

  if (!isEmpty(vendor)) {
    menus = menus.map((menu) => {
      if (menu.slug === '/html/store') {
        return adsStoreMenus;
      }
      return menu;
    });
  }

  const pathnames = pathname.split('/');

  const NavItem = (item: IMenu) => {
    const menuItems = item.menu as MenuItemProps[];
    const slugend = item.slug.split('/').pop();
    const isOpened = pathnames.includes(slugend);

    return (
      <>
        <Link href={item.slug}>
          <VerticalNavigationItem
            iconAsset={item.iconAsset}
            selected={isOpened}
          />
        </Link>

        {open && (
          <Attached direction="right">
            <DropDownMenuWrapper>
              {menuItems.map((subitem, index) => (
                <VerticalNavigationItem key={subitem.slug}>
                  {subitem.children}
                </VerticalNavigationItem>
              ))}
            </DropDownMenuWrapper>
          </Attached>
        )}
      </>
    );
  };

  const openSideBarLink = '/api/openSidebar';

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
              {() => (
                <VerticalNavigation>
                  <form action={openSideBarLink} method="POST">
                    <input type="hidden" value={pathname} name="pathname" />
                    <ColOpenSideBar
                      id="openSideBar"
                      type="submit"
                      iconAsset={
                        open ? SVGAsset.ColSlideLeft : SVGAsset.ColSlideRight
                      }
                      open={open}
                    />
                  </form>

                  {menus.map((item) => {
                    // return  <MenuItem index={menu.slug} item={menu} onCloseGroup={onCloseGroup} onOpenGroup={onOpenGroup} openGroupIDs={openGroupIDs} />
                    const { menu, slug, title, iconAsset } = item;

                    if (Array.isArray(menu)) {
                      const menuItems = menu as MenuItemProps[];
                      const slugend = slug.split('/').pop();
                      // const isOpened = openGroupIDs.includes(slugend);
                      // TODO NTH: Fix this api
                      const isOpened = true;

                      return open ? (
                        <VerticalNavigationGroup
                          key={item.title}
                          label={item.title}
                          iconAsset={item.iconAsset}
                          open={isOpened}
                        >
                          {menuItems.map((subitem) => {
                            return (
                              <Link href={subitem?.slug || ''} key={item.slug}>
                                <StyledSubMenuItem id={subitem.slug}>
                                  <VerticalNavigationItem
                                    selected={subitem.slug === pathname}
                                  >
                                    {subitem.children}
                                  </VerticalNavigationItem>
                                </StyledSubMenuItem>
                              </Link>
                            );
                          })}
                        </VerticalNavigationGroup>
                      ) : (
                        <NavItem {...item} />
                      );
                    }

                    const selected = slug === pathname;

                    return open ? (
                      <Link href={slug}>
                        <VerticalNavigationItem
                          iconAsset={iconAsset}
                          selected={selected}
                        >
                          {title}
                        </VerticalNavigationItem>
                      </Link>
                    ) : (
                      <Link href={slug}>
                        <VerticalNavigationItem
                          iconAsset={iconAsset}
                          children=""
                          selected={selected}
                        />
                      </Link>
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
