'use client';

/* eslint-disable react/jsx-no-useless-fragment */
import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionHeaderSize,
  AlignItems,
  Button,
  CoreButton,
  Cursor,
  Display,
  JustifyContent,
  Layout,
  NumberBadge,
  Title,
  TitleSize,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';

import { Container } from '@/components/container';
import type { AdCategoryType } from '@/components/types.generated';
import { GET_AD_CATEGORIES } from '@/lib/gql/adcategory/adcategory.query';

interface Category {
  subcategories: AdCategoryType[];
}

interface CategoriesState {
  category?: Category;
  categories?: Category[];
}

export default function AdminCategories() {
  const [state, setState] = React.useState<CategoriesState>({});
  const { data: categoriesData } = useQuery(GET_AD_CATEGORIES);
  const allCategories = (categoriesData && categoriesData.data) || [];

  const categories = state.categories || [];

  useEffect(() => {
    if (isEmpty(allCategories)) return;

    if (isEmpty(state.category)) {
      const newCategories = allCategories
        .filter((cat) => isEmpty(cat.category))
        .map((cat) => ({
          ...cat,
          subcategories: allCategories.filter(
            (subcat) => subcat.category === cat.id,
          ),
        }));
      setState({ ...state, categories: newCategories });
    }
  }, [allCategories]);

  return (
    <Layout padding={{ top: 3, bottom: 1 }}>
      <Layout
        padding={{ bottom: 1 }}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
      >
        <Layout padding={{ right: 2, left: 2 }}>
          <Button onClick={() => console.log('Add Category')}>
            Add Category
          </Button>
        </Layout>
        <Layout>
          <Title size={TitleSize.Small}>Categories</Title>
        </Layout>
      </Layout>

      <Container size={11}>
        <Accordion
          items={categories.map((category) => ({
            header: {
              size: AccordionHeaderSize.Narrow,
              title: (
                <Layout
                  cursor={Cursor.Pointer}
                  display={Display.Flex}
                  justifyContent={JustifyContent.Between}
                >
                  {`${category.name} `}
                  <NumberBadge value={category.count || 0} />
                </Layout>
              ),
            },
            body: {
              children: (
                <>
                  {category.subcategories?.map((item) => (
                    <Layout
                      cursor={Cursor.Pointer}
                      padding={{ top: 1 }}
                      justifyContent={JustifyContent.Between}
                      display={Display.Flex}
                      key={item.name}
                      onClick={() =>
                        handleChange('category')({ target: { value: item.id } })
                      }
                    >
                      <Title size={TitleSize.Small}>{item.name}</Title>
                      <NumberBadge value={item.count || 0} />
                    </Layout>
                  ))}
                  <Layout
                    cursor={Cursor.Pointer}
                    padding={{ top: 1 }}
                    justifyContent={JustifyContent.Between}
                    display={Display.Flex}
                    // onClick={() =>
                    //   handleChange("category")({ target: { value: item.id } })
                    // }
                  >
                    <CoreButton>Add {category.name} sub categories</CoreButton>
                  </Layout>
                </>
              ),
            },
          }))}
        />
      </Container>
    </Layout>
  );
}
