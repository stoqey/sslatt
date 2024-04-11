'use client';

/* eslint-disable react/jsx-no-useless-fragment */
import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionHeaderSize,
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
  Cursor,
  Display,
  FormGroup,
  Input,
  InputType,
  JustifyContent,
  Layout,
  Modal,
  ModalSize,
  NumberBadge,
  SVGAsset,
  Title,
  TitleSize,
  Tower,
  TowerChildWidth,
  useDialogState,
} from '@uuixjs/uuixweb';
import { isEmpty, kebabCase } from 'lodash';
import React, { useEffect } from 'react';

import { Container } from '@/components/container';
import type { AdCategoryType } from '@/components/types.generated';
import { GET_AD_CATEGORIES } from '@/lib/gql/adcategory/adcategory.query';

interface Category extends AdCategoryType {
  subcategories?: AdCategoryType[];
}

interface CategoriesState {
  category?: Category;
  subcategory?: Category;
  categories?: Category[];
}

interface CategoryEditProps {
  type: 'category' | 'subcategory';
  category?: Category;
  close: () => void;
  save: (category: Category) => void;
}

const CreateCategory = (props: CategoryEditProps) => {
  const catType = props.type || 'category';
  const editCategory = props.category;
  const [state, setState] = React.useState<Category>({});

  const handleChange = (key: string) => (e: any) => {
    setState({ ...state, [key]: e.target.value });
  };

  useEffect(() => {
    if (isEmpty(state) && !isEmpty(editCategory)) {
      setState(editCategory);
    }
  }, [editCategory]);

  return (
    <Layout padding={3}>
      <Layout>
        <Title size={TitleSize.Small}>
          {editCategory ? `Edit ${state.name}` : 'Create'} {catType}
        </Title>
      </Layout>
      <Layout>
        <Layout>
          <Tower childWidth={TowerChildWidth.Medium}>
            <FormGroup label="Name">
              <Input
                name="name"
                type={InputType.Text}
                value={state.name}
                onChange={handleChange('name')}
              />
            </FormGroup>

            <FormGroup label="Id">
              <Input
                disabled={!!editCategory}
                name="id"
                value={state.id}
                onChange={handleChange('id')}
                type={InputType.Text}
              />
            </FormGroup>
          </Tower>
        </Layout>
        <Layout
          margin={{ top: 1, bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
        >
          <Layout margin={{ right: 1 }}>
            <Button onClick={() => props.save(state)}>
              {editCategory ? 'Update' : 'Create'}
            </Button>
          </Layout>

          <Button variant={ButtonType.Secondary} onClick={props.close}>
            Cancel
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const DeleteCategory = (props: CategoryEditProps) => {
  const catType = props.type || 'category';
  const catName = props.category?.name || '';

  return (
    <Layout padding={3}>
      <Layout>
        <Title size={TitleSize.Small}>
          Delete {catName} {catType}
        </Title>
      </Layout>
      <Layout>
        <Layout
          margin={{ top: 1, bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
        >
          <Layout margin={{ right: 1 }}>
            <Button onClick={() => props.save(props.category as any)}>
              Delete
            </Button>
          </Layout>

          <Button variant={ButtonType.Secondary} onClick={props.close}>
            Cancel
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default function AdminCategories() {
  const [state, setState] = React.useState<CategoriesState>({});
  const { data: categoriesData } = useQuery(GET_AD_CATEGORIES);
  const allCategories = (categoriesData && categoriesData.data) || [];

  const { anchorProps: categoryAnchor, dialogProps: categoryDialog } =
    useDialogState();

  const { anchorProps: subcategoryAnchor, dialogProps: subcategoryDialog } =
    useDialogState();

  const {
    anchorProps: categoryDeleteAnchor,
    dialogProps: categoryDeleteDialog,
  } = useDialogState();

  const {
    anchorProps: subcategoryDeleteAnchor,
    dialogProps: subcategoryDeleteDialog,
  } = useDialogState();

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
      {/* Category modals */}
      <Modal size={ModalSize.Medium} {...categoryDeleteDialog}>
        <DeleteCategory
          type="category"
          category={state.category}
          close={() => categoryDeleteAnchor.onClick()}
          save={(cat) => {
            console.log('delete category', cat);
            // TODO API
            categoryDeleteAnchor.onClick();
          }}
        />
      </Modal>
      <Modal size={ModalSize.Medium} {...categoryDialog}>
        <CreateCategory
          type="category"
          category={state.category}
          close={() => categoryAnchor.onClick()}
          save={(cat) => {
            console.log('category', cat);
            if (state.category) {
              const newCat = (c: Category) => ({ ...c, ...cat });
              // update category { name }
              const newCategories = categories.map((c) => {
                if (c.id === cat.id) {
                  return newCat(c);
                }
                return c;
              });
              setState({
                ...state,
                category: newCat(state.category),
                categories: newCategories,
              });

              // TODO API
            } else {
              // create category { id, name}
              const newCat = {
                ...cat,
                id: cat.id || kebabCase(cat?.name || ''),
              };
              const catExists = state.categories?.some(
                (c) => c.id === newCat.id,
              );
              if (!catExists) {
                const newCategories = state.categories?.concat(newCat);
                setState({ ...state, categories: newCategories });
              }
              // TODO API
            }
            categoryAnchor.onClick();
          }}
        />
      </Modal>

      {/* Subcategory modals */}
      <Modal size={ModalSize.Medium} {...subcategoryDeleteDialog}>
        <DeleteCategory
          type="subcategory"
          category={state.subcategory}
          close={() => subcategoryDeleteAnchor.onClick()}
          save={(cat) => {
            console.log('delete subcategory', cat);
            // TODO API
            subcategoryDeleteAnchor.onClick();
          }}
        />
      </Modal>
      <Modal size={ModalSize.Medium} {...subcategoryDialog}>
        <CreateCategory
          type="subcategory"
          category={state.subcategory}
          close={() => subcategoryAnchor.onClick()}
          save={(subcat) => {
            const { category, subcategory } = state;
            console.log('subcategory', subcat);
            if (subcategory && category) {
              const newsubCat = (c: Category) => ({ ...c, ...subcat });

              const newcategory: Category = category;

              const newSubcategories = category?.subcategories?.map((c) => {
                if (c.id === subcat.id) {
                  return newsubCat(c);
                }
                return c;
              });
              newcategory.subcategories = newSubcategories;

              const newCategories = state?.categories?.map((c) => {
                if (c.id === category?.id) {
                  return newcategory;
                }
                return c;
              });

              setState({
                ...state,
                category: newcategory,
                categories: newCategories,
              });

              // TODO API
            } else if (category) {
              // create category { id, name}
              const newSubCat = {
                ...subcat,
                id: subcat.id || kebabCase(subcat?.name || ''),
              };
              const subcatExists = category.subcategories?.some(
                (c) => c.id === newSubCat.id,
              );
              if (!subcatExists) {
                category.subcategories =
                  category.subcategories?.concat(newSubCat);
                const newCategories = categories.map((c) => {
                  if (c.id === category.id) {
                    return category;
                  }
                  return c;
                });
                setState({
                  ...state,
                  category,
                  categories: newCategories,
                });
              }

              // TODO API
            }
            subcategoryAnchor.onClick();
          }}
        />
      </Modal>

      <Layout
        padding={{ bottom: 1 }}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
      >
        <Layout padding={{ right: 2, left: 2 }}>
          <Button
            onClick={() => {
              setState({ ...state, category: undefined });
              categoryAnchor.onClick();
            }}
          >
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
                  <Layout
                    padding={{ left: 1 }}
                    display={Display.Flex}
                    alignItems={AlignItems.Center}
                  >
                    {`${category.name} `}
                    <Layout padding={{ left: 1 }}>
                      <Button
                        size={ButtonSize.Small}
                        variant={ButtonType.Secondary}
                        icon={SVGAsset.Edit}
                        onClick={() => {
                          setState({ ...state, category });
                          categoryAnchor.onClick();
                        }}
                      />
                    </Layout>
                  </Layout>

                  <Layout
                    padding={{ left: 1 }}
                    display={Display.Flex}
                    alignItems={AlignItems.Center}
                  >
                    <Layout padding={{ right: 1 }}>
                      <Button
                        disabled={category?.count > 0}
                        size={ButtonSize.Small}
                        variant={ButtonType.Alert}
                        icon={SVGAsset.Trash}
                        onClick={() => {
                          setState({ ...state, category });
                          categoryDeleteAnchor.onClick();
                        }}
                      />
                    </Layout>
                    <NumberBadge value={category.count || 0} />
                  </Layout>
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
                      // onClick={() =>
                      //   handleChange('category')({ target: { value: item.id } })
                      // }
                    >
                      <Layout
                        padding={{ left: 1 }}
                        display={Display.Flex}
                        alignItems={AlignItems.Center}
                      >
                        <Title size={TitleSize.Small}>{item.name}</Title>
                        <Layout padding={{ left: 1 }}>
                          <Button
                            size={ButtonSize.Small}
                            variant={ButtonType.Secondary}
                            icon={SVGAsset.Edit}
                            onClick={() => {
                              setState({
                                ...state,
                                category,
                                subcategory: item,
                              });
                              subcategoryAnchor.onClick();
                            }}
                          />
                        </Layout>
                      </Layout>

                      <Layout
                        padding={{ left: 1 }}
                        display={Display.Flex}
                        alignItems={AlignItems.Center}
                      >
                        <Layout padding={{ right: 1 }}>
                          <Button
                            disabled={item?.count > 0}
                            size={ButtonSize.Small}
                            variant={ButtonType.Alert}
                            icon={SVGAsset.Trash}
                            onClick={() => {
                              setState({
                                ...state,
                                category,
                                subcategory: item,
                              });
                              subcategoryDeleteAnchor.onClick();
                            }}
                          />
                        </Layout>
                        <NumberBadge value={item.count || 0} />
                      </Layout>
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
                    <Layout padding={{ left: 1 }}>
                      <Button
                        size={ButtonSize.Small}
                        variant={ButtonType.Secondary}
                        icon={SVGAsset.Plus}
                        onClick={() => {
                          setState({
                            ...state,
                            category,
                            subcategory: undefined,
                          });
                          subcategoryAnchor.onClick();
                        }}
                      >
                        {category.name} subcategory
                      </Button>
                    </Layout>
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
