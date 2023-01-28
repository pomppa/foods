import prisma from '../lib/prisma';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import IngredientForm from '../components/forms/ingredientForm';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';

export const getServerSideProps = async () => {
  const ingredients = await prisma.ingredient.findMany();
  const ingredientsJson = JSON.stringify(ingredients);

  return { props: { ingredientsJson } };
};

export default function Ingredients(props) {
  const data = JSON.parse(props.ingredientsJson);

  return (
    <>
      <Head>
        <title>Foods - Ingredients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div>
            <h1>Ingredients</h1>
            <p>Add a new ingredient</p>
          </div>
          <IngredientForm></IngredientForm>{' '}
        </Grid>
        <Grid item xs={6}>
          <h2> All ingredients </h2>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <Box
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <List>
              {data.map((x, i) => {
                return (
                  <>
                    <Link href={'ingredient/' + x.id}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={x.name} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </>
                );
              })}
            </List>
          </Box>{' '}
        </Grid>
      </Grid>
    </>
  );
}
