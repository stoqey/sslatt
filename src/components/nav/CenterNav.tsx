import {
  AlignItems,
  ButtonIcon,
  ButtonIconType,
  ButtonSize,
  Column,
  ComboInput,
  DialogLayer,
  Display,
  DropDownMenuWrapper,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  SVGAsset,
  TransitionType,
  useDialogState,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import querystring from 'querystring';
import React, { useState } from 'react';

// data-popper-placement="bottom-start"

export const SearchView = () => {
  const route = useRouter();
  const searchQuery = useSearchParams();
  const pathname = usePathname();
  const q = searchQuery.get('q');

  const [searchText, setSearchText] = useState(q || '');

  const submitSearch = () => {
    if (isEmpty(searchText)) {
      return;
    }

    let appliedFilters: any = { search: searchText };
    const existingSearchQ = pathname.split('?')[1];
    const currentPath = pathname.split('?')[0];
    if (!isEmpty(existingSearchQ)) {
      appliedFilters = querystring.parse(existingSearchQ || '');
      appliedFilters.search = searchText;
    }

    // const newAppliedFilters = pickBy(appliedFilters, identity);
    const newSearchQ = isEmpty(appliedFilters)
      ? ''
      : querystring.stringify(appliedFilters);

    route.push(`${currentPath}?${newSearchQ}`);
  };

  return (
    <form
      id="search-nav"
      onSubmit={(e) => {
        e.preventDefault();
        submitSearch();
      }}
    >
      <Layout
        id="search-input"
        width="90vw"
        breakpointSmall={{
          width: '60vw',
        }}
        breakpointMedium={{
          width: '50vw',
        }}
      >
        <ComboInput
          size={InputSize.Large}
          type={InputType.Search}
          placeholder="Search"
          buttonProps={{
            icon: SVGAsset.NavSearch,
            onClick: () => submitSearch(),
          }}
          value={searchText}
          onChange={(e: any) => setSearchText(e.target.value)}
        />

        {/* <Attached style={{ top: "4rem", left: "unset" }} id="attached">
                <Layout elevation={2} background={Background.Base} fullWidth>
                    {Array.from(Array(13).keys()).map((i) => (
                        <SearchItem key={i} />
                    ))}
                </Layout>
                <div style={{ width: "100px", height: "100px", background: "blue" }} />
            </Attached> */}
      </Layout>
    </form>
  );
};

export const CenterNav = () => {
  const { anchorProps, dialogProps } = useDialogState();

  return (
    <Layout display={Display.Flex} alignItems={AlignItems.Center}>
      {/* Web Input */}
      <Layout
        fullWidth
        display={Display.Hide}
        breakpointSmall={{
          display: Display.Flex,
        }}
      >
        <SearchView />
      </Layout>

      {/* Mobile */}
      <Layout
        breakpointExtraSmall={{
          display: Display.Flex,
        }}
        breakpointSmall={{
          display: Display.Hide,
        }}
      >
        <ButtonIcon
          {...anchorProps}
          aria-label="aria label"
          size={ButtonSize.Default}
          variant={ButtonIconType.Secondary}
          icon={SVGAsset.NavSearch}
        />
        <DialogLayer
          portalClassName="nav-dialog"
          {...dialogProps}
          transitionType={TransitionType.SlideOverBottom}
        >
          <DropDownMenuWrapper elevation={3}>
            <Column cols={{ default: 12 }}>
              <Layout
                display={Display.Flex}
                justifyContent={JustifyContent.Center}
              >
                <SearchView />
              </Layout>
            </Column>
          </DropDownMenuWrapper>
        </DialogLayer>
      </Layout>
    </Layout>
  );
};

export default CenterNav;
