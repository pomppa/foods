import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { findUniqueMealWithId } from '../api/meals/[id]';
import { getMealDataForId } from '../api/meals/[id]/ingredients';
import {
  MealInterface,
  FormValue,
  IngredientI,
  MealIngredientI,
  MealI,
  CombinedIngredientMeal,
} from '../../interfaces';
import { NextApiRequest } from 'next';
import MealTable from '../../components/mealTable';
import MacroPieChart from '../../components/macros';
import { getIngredientDataForIds } from '../api/ingredients';
import { calculateTotals } from '../../components/planCalculator';

type Props = {
  meal: MealInterface;
  ingredients: CombinedIngredientMeal[];
};

/**
 * @todo return all in one object?
 * @param req
 * @returns
 */
export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<MealI, 'created_at' | 'updated_at'> =
    await findUniqueMealWithId(req.query.id);

  const mealIngredients: MealIngredientI[] = await getMealDataForId(
    req.query.id,
  );

  const valuesArray: number[] = mealIngredients.map((obj) => obj.ingredient_id);

  const ingredientData: IngredientI[] = await getIngredientDataForIds(
    valuesArray,
  );

  const ingredients: CombinedIngredientMeal[] = mealIngredients.map((item) => {
    const ingredient: IngredientI = ingredientData.find(
      (obj) => obj.id === item.ingredient_id,
    );
    return {
      ...item,
      ...ingredient,
    };
  });
  return {
    props: { meal, ingredients },
  };
};

/**
 * Meal page component.
 *
 * @param props
 * @returns
 */
export default function Meal(props: Props) {
  const router = useRouter();
  const ingredients: CombinedIngredientMeal[] = props.ingredients;

  const formValues: FormValue[] = ingredients.map((item) => ({
    ingredient_id: item.ingredient_id,
    weight: Number(item.ingredient_weight),
  }));

  const totals = calculateTotals(formValues, ingredients);

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
        <Button
          sx={{ ml: '10px' }}
          variant="outlined"
          onClick={() => router.push(router.asPath + '/edit')}
        >
          Edit meal
        </Button>
      </Grid>
      <Grid item xs={12}>
        <h2>{props.meal.name}</h2>
        <MealTable totals={totals}></MealTable>
      </Grid>
      <Grid item xs={12}>
        <MacroPieChart totals={totals}></MacroPieChart>
      </Grid>
    </Grid>
  );
}
