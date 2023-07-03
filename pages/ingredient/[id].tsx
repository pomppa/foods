import React from 'react';
import { findUniqueIngredient } from '../api/ingredients/[id]';
import { Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import router from 'next/router';
import { NextApiRequest } from 'next';
import { IngredientInterface } from '../../types';

type Props = {
  ingredientJson: string;
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const ingredient = await findUniqueIngredient(req.query.id);
  const ingredientJson = JSON.stringify(ingredient);

  return { props: { ingredientJson } };
};

/**
 * @todo use components
 * @param props
 * @returns
 */
export default function Ingredient(props: Props) {
  const data: IngredientInterface = JSON.parse(props.ingredientJson);
  const { name, kcal, protein, fat, carbs } = data;
  return (
    <Grid container spacing={2} sx={{ paddingTop: 3 }}>
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Calories" secondary={kcal} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Protein" secondary={protein + ' g'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Carbs" secondary={carbs + ' g'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Fat" secondary={fat + ' g'} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
