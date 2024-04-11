'use client';

import {
  Avatar,
  Column,
  CoreButtonDropdownType,
  CoreText,
  Grid,
  Layout,
  SplitButton,
} from '@uuixjs/uuixweb';
import React from 'react';

import AdsSearchItem from '@/components/AdLists/ads.item';
import { Container } from '@/components/container';

export const AdminDisputes = () => {
  return (
    <Layout>
      <Container>
        <CoreText as="h3" ellipsis>
          Disputes very asdojf askfgj asfk asfkg asfgk asdfk adfkg adfkg adfgk
          adfgk adsfkjg{' '}
        </CoreText>

        {/* <Tower
          childWidth={TowerChildWidth.Medium}
          gutterSize={TowerGutter.ExtraSmall}
          placeholderItems={20}
          style={{ background: "red" }}
        >
          <AdsSearchItem
            id="asdasdas"
            name="Name"
            description="Description"
            price={100}
            category="Category"
            linkTo="/#"
            image="http://localhost:3037/uploads/1712075717001-287429469.webp"
            owner={{
              avatar:
                "http://localhost:3037/uploads/1712075717001-287429469.webp",
              fullname: "Full Name",
              id: "someid",
            }}
            ratings={4}
            shipsFrom="ALL"
            shipsTo="ALL"
          />
        </Tower> */}

        <Layout display="flex" flexDirection="column">
          <Grid>
            <Column
              cols={{ default: 4 }}
              // style={{ background: "gold", width: "100px", height: "100px" }}
            >
              <Layout>
                <AdsSearchItem
                  id="asdasdas"
                  name="Name"
                  description="Description"
                  price={100}
                  category="Category"
                  linkTo="/#"
                  image="http://localhost:3037/uploads/1712075717001-287429469.webp"
                  owner={{
                    avatar:
                      'http://localhost:3037/uploads/1712075717001-287429469.webp',
                    fullname: 'Full Name',
                    id: 'someid',
                  }}
                  ratings={4}
                  shipsFrom="ALL"
                  shipsTo="ALL"
                  meta={false}
                />
              </Layout>
            </Column>
            <Column
              cols={{ default: 3 }}
              // style={{ background: "green", width: "100px", height: "100px" }}
            >
              <Layout display="flex" flexDirection="column" padding={1}>
                <Layout display="flex" justifyContent="center">
                  <Avatar userLogin="xxxxx" size={60} presenceIndicator />
                </Layout>
                <Layout
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <CoreText as="h4">User Name</CoreText>
                  <CoreText>Sub text user Name</CoreText>
                </Layout>
              </Layout>
            </Column>
            <Column cols={{ default: 4 }}>
              <Layout
                display="flex"
                // justifyContent="center"
                flexDirection="column"
                padding={1}
              >
                <Layout display="flex" justifyContent="center">
                  <CoreText as="h4">Dispute</CoreText>
                </Layout>

                <Layout display="flex" justifyContent="space-between">
                  <Layout margin={{ right: 1 }}>
                    <SplitButton
                      dropdown={{ type: CoreButtonDropdownType.ArrowDown }}
                    >
                      Action X
                    </SplitButton>
                  </Layout>
                  <Layout>
                    <SplitButton
                      dropdown={{ type: CoreButtonDropdownType.ArrowDown }}
                    >
                      Action Z
                    </SplitButton>
                  </Layout>
                </Layout>
                {[
                  { label: 'Label X', value: 'X' },
                  { label: 'Label Z', value: 'Z' },
                  { label: 'Label c', value: 'c' },
                ].map((x) => (
                  <Layout
                    key={x.label}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Layout margin={{ right: 1 }}>
                      <CoreText>{x.label}</CoreText>
                    </Layout>
                    <Layout>
                      <CoreText>{x.value}</CoreText>
                    </Layout>
                  </Layout>
                ))}
              </Layout>
            </Column>
          </Grid>

          <Layout
            style={{ background: 'aliceblue', height: '50px', width: '100%' }}
          />
        </Layout>
      </Container>
    </Layout>
  );
};

export default AdminDisputes;
