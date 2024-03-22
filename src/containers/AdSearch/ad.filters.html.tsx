/* eslint-disable react/jsx-no-useless-fragment */
import {
  Accordion,
  AccordionHeaderSize,
  Button,
  Cursor,
  Display,
  JustifyContent,
  Layout,
  NumberBadge,
  SVGAsset,
  Title,
  TitleSize,
} from '@uuixjs/uuixweb';
import { BorderRadius, styled } from '@uuixjs/uuixweb-lib';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import React from 'react';

import type { AdCategoryType } from '@/components/types.generated';

export interface AdFiltersState {
  category?: string;
  source?: string;
  from?: number;
  to?: number;
}

interface AdFiltersProps {
  categories: AdCategoryType[];
  filters?: AdFiltersState;
}

const AccordionWrapper = styled(Layout)`
  overflow: scroll;
  height: 90vh;
  .accordion-header ~ div {
    display: block !important;
  }

  .tw-number-badge__badge {
    background-color: var(--color-text-brand) !important;
  }
`;

export default function AdFilters(props: AdFiltersProps) {
  const { categories: allCategories = [], filters = {} as any } = props;

  const categories = allCategories
    .filter((cat) => isEmpty(cat.category))
    .map((cat) => ({
      ...cat,
      subcategories: allCategories.filter(
        (subcat) => subcat.category === cat.id,
      ),
    }));

  const categoriesOptions = allCategories.map((i) => ({
    label: i.name,
    value: i.id,
  }));

  return (
    <Layout border={BorderRadius.None}>
      {/* <FormGroup label="Category">
        <Select value={category} onChange={handleChange("category")}>
          {categoriesOptions.map((i: any) => (
            <option value={i.value} key={i.label + i.value}>
              {i.label}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup label="Source">
        <Input
          type={InputType.Text}
          onChange={handleChange("source")}
          value={source}
        />
      </FormGroup> */}

      {/* <Tower>
        <FormGroup label="From">
          <Input
            type={InputType.Number}
            onChange={handleChange("from")}
            value={from as any}
          />
        </FormGroup>
        <FormGroup label="To">
          <Input
            type={InputType.Number}
            onChange={handleChange("to")}
            value={to as any}
          />
        </FormGroup>
      </Tower> */}

      <Layout
        display={Display.Flex}
        padding={{ top: 1, bottom: 1 }}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Title size={TitleSize.Small}>Categories</Title>
        {!isEmpty(filters) && (
          <Link href="/html/">
            <Layout margin={{ left: 1 }}>
              <Button icon={SVGAsset.Close}>Reset</Button>
            </Layout>
          </Link>
        )}
      </Layout>

      <AccordionWrapper id="accordion-wrapper">
        <Accordion
          items={categories.map((category) => ({
            open: true,
            header: {
              size: AccordionHeaderSize.Narrow,
              title: (
                <Link href={`html?category=${category.id}`}>
                  <Layout
                    cursor={Cursor.Pointer}
                    display={Display.Flex}
                    justifyContent={JustifyContent.Between}
                  >
                    {`${category.name} `}
                    <NumberBadge value={category.count || 0} />
                  </Layout>
                </Link>
              ),
            },
            body: {
              children: (
                <>
                  {category.subcategories?.map((item) => (
                    <Link key={item.id} href={`html?category=${item.id}`}>
                      <Layout
                        cursor={Cursor.Pointer}
                        padding={{ top: 1 }}
                        justifyContent={JustifyContent.Between}
                        display={Display.Flex}
                        key={item.name}
                      >
                        <Title size={TitleSize.Small}>{item.name}</Title>
                        <NumberBadge value={item.count || 0} />
                      </Layout>
                    </Link>
                  ))}
                </>
              ),
            },
          }))}
        />
      </AccordionWrapper>
    </Layout>
  );
}
