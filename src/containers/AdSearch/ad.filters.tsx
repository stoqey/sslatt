import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionHeaderSize,
  Cursor,
  Display,
  JustifyContent,
  Layout,
  NumberBadge,
  Title,
  TitleSize,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { GET_AD_CATEGORIES } from '@/lib/gql/adcategory/adcategory.query';

export interface AdFiltersState {
  category?: string;
  source?: string;
  from?: number;
  to?: number;
}

interface AdFiltersProps {
  filters: AdFiltersState;
  setFilters: (filters: AdFiltersState) => void;
  resetFilters: () => void;
}

export const useAdFilters = (): AdFiltersProps => {
  const query = useSearchParams();

  const [filters, setFilters] = React.useState<AdFiltersState>({
    category: query.get('category') || '',
    source: query.get('source') || '',
    from: +(query.get('from') || 0),
    to: +(query.get('to') || 0),
  });

  const resetFilters = () => {
    setFilters({
      category: '',
      source: '',
      from: 0,
      to: 0,
    });
  };

  return { filters, setFilters, resetFilters };
};

export default function AdFilters(props: AdFiltersProps) {
  const { filters, setFilters } = props;
  const pathname = usePathname();
  const query = useSearchParams();

  const { push } = useRouter();

  const { data: categoriesData, loading: loadingCategories } =
    useQuery(GET_AD_CATEGORIES);

  const allCategories = (categoriesData && categoriesData.data) || [];

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

  const handleChange = (fieldName: any) => {
    return (e: any) => {
      setFilters({
        ...filters,
        [fieldName]: e.target.value,
      });
    };
  };

  useEffect(() => {
    const queryArgs = pickBy(
      {
        category: query.get('category') || '',
        source: query.get('source') || '',
        from: +(query.get('from') || 0),
        to: +(query.get('to') || 0),
        ...filters,
      },
      identity,
    );

    // TODO apply by button click
    const searchParams = new URLSearchParams(queryArgs as any);
    push(`${pathname}?${searchParams.toString()}`);
  }, [filters]);

  return (
    <Layout padding={{ bottom: 2 }}>
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

      <Layout padding={{ top: 3, bottom: 1 }}>
        <Title size={TitleSize.Small}>Categories</Title>
      </Layout>

      <Layout>
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
                </>
              ),
            },
          }))}
        />
      </Layout>
    </Layout>
  );
}
