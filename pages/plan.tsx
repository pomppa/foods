import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { FormValues, IngredientI, Totals } from '../interfaces';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macroPieChart';
import { calculateTotals } from '../lib/plan-calculator';

type Props = {
  ingredients: IngredientI[];
};

export async function getServerSideProps() {
  const ingredients: IngredientI[] = await getIngredientsData();
  return { props: { ingredients } };
}

export default function Plan(props: Props) {
  const ingredients: IngredientI[] = props.ingredients;
  const dataArr: FormValues[] = Object.values({});
  const totals: Totals = calculateTotals(dataArr, ingredients);

  return (
    <>
      <h2>Plan</h2>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6} lg={4}>
          <PlanForm data={ingredients}></PlanForm>
        </Grid>
        <Grid item>
          <MacroPieChart totals={totals}></MacroPieChart>
        </Grid>
        <MealTable totals={totals}></MealTable>
      </Grid>
    </>
  );
}
