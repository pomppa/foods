import prisma from '../lib/prisma';
import React from 'react';
import IngredientForm from '../components/forms/ingredientForm';
import Link from 'next/link';
import { IngredientInterface } from '../interfaces';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

type Props = {
  ingredientsJson: string;
};

export const getServerSideProps = async () => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });

  const ingredientsJson = JSON.stringify(ingredients);

  return { props: { ingredientsJson } };
};

export default function Ingredients(props: Props) {
  const data: IngredientInterface[] = JSON.parse(props.ingredientsJson);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Add a new ingredient</h2>
          <small>Input name and macronutrients</small>
          <IngredientForm></IngredientForm>{' '}
        </Grid>
        <Grid item xs={6}>
          <List>
            <h2>Your ingredients</h2>
            <small>
              A list of ingredients created by you, sorted by creation date
            </small>
            <Box
              sx={{
                mt: '10px',
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              {data.map((x) => {
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
            </Box>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
