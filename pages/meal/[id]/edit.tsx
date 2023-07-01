import { NextApiRequest } from 'next';
import { useState } from 'react';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macros';
import MealTable from '../../../components/mealTable';
import {
  CombinedIngredientMeal,
  FormValue,
  IngredientI,
  MealI,
  Totals,
} from '../../../interfaces';
import {
  getIngredientDataForIds,
  getIngredientsData,
} from '../../api/ingredients';
import { findUniqueMealWithId } from '../../api/meals/[id]';
import { getMealDataForId } from '../../api/meals/[id]/ingredients';
import { calculateTotals } from '../../../components/planCalculator';
import { Button, Grid } from '@mui/material';
import router from 'next/router';

export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<MealI, 'created_at' | 'updated_at'> =
    await findUniqueMealWithId(req.query.id);
  const mealIngredientsData = await getMealDataForId(req.query.id);

  const valuesArray: number[] = mealIngredientsData.map(
    (obj: { ingredient_id: number }) => obj.ingredient_id,
  );

  const ingredientsData: IngredientI[] = await getIngredientDataForIds(
    valuesArray,
  );

  const ingredients: CombinedIngredientMeal[] = mealIngredientsData.map(
    (item: { ingredient_id: number }) => {
      const ingredient = ingredientsData.find(
        (obj) => obj.id === item.ingredient_id,
      );
      return {
        ...item,
        ...ingredient,
      };
    },
  );

  const allIngredients: IngredientI[] = await getIngredientsData();

  return {
    props: { meal, ingredients, allIngredients },
  };
};

/**
 * Edit page component
 *
 * @todo clean props
 * @param props
 * @returns
 */
export default function Edit(props) {
  const meal: Omit<MealI, 'created_at' | 'updated_at'> = props.meal;
  const initialIngredients: CombinedIngredientMeal[] = props.ingredients;
  const allIngredients = props.allIngredients;

  const [formValues, setFormValues] = useState<FormValue[]>(
    initialIngredients.map((item) => ({
      ingredient_id: item.ingredient_id,
      weight: item.ingredient_weight,
    })),
  );

  const totals: Totals = calculateTotals(formValues, allIngredients);

  const handleChange = (formValues: FormValue[]) => {
    setFormValues(formValues);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <h2>Edit</h2>
        <h3>Meal name: {meal.name}</h3>
        <small>Edit meal contents</small>
        <PlanForm
          data={allIngredients}
          formValues={formValues}
          onChange={handleChange}
        ></PlanForm>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MacroPieChart totals={totals}></MacroPieChart>
      </Grid>
      <Grid item xs={12}>
        <MealTable totals={totals}></MealTable>
      </Grid>
    </Grid>
  );
}
