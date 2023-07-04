import React from 'react';
import IngredientForm from '../../components/forms/ingredientForm';
import { Grid, Typography } from '@mui/material';

export default function Ingredients() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" mt={2}>
          New food item
        </Typography>
        <IngredientForm></IngredientForm>
      </Grid>
    </Grid>
  );
}
