import { Grid } from '@mui/material';
import { findUniqueMealWithId } from '../api/meals/[id]';
import { FormValue, IngredientI, Totals } from '../../interfaces';
import { NextApiRequest } from 'next';
import MealTable from '../../components/mealTable';
import MacroPieChart from '../../components/macros';
import { getIngredientDataForIds } from '../api/ingredients';
import { calculateTotals } from '../../components/planCalculator';
import { Meal } from '@prisma/client';

type Props = {
  mealName: string;
  ingredients: IngredientI[];
  formValues: FormValue[];
};

/**
 *
 * @param req
 * @returns
 */
export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<Meal, 'created_at' | 'updated_at'> =
    await findUniqueMealWithId(req.query.id);

  const mealName: string = meal.name;

  const formValues: FormValue[] = JSON.parse(String(meal.formValues));

  const ingredients: IngredientI[] = await getIngredientDataForIds(
    formValues.map((value) => value.ingredient_id),
  );

  return {
    props: { mealName, ingredients, formValues },
  };
};

/**
 * Meal page component.
 *
 * @param props
 * @returns
 */
export default function MealPage(props: Props) {
  const { mealName, formValues, ingredients } = props;

  const totals: Totals = calculateTotals(formValues, ingredients);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>{mealName}</h2>
        <MealTable totals={totals}></MealTable>
      </Grid>
      <Grid item xs={12}>
        <MacroPieChart totals={totals}></MacroPieChart>
      </Grid>
    </Grid>
  );
}
