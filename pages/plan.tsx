import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { FormValues, IngredientI, Totals } from '../interfaces';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macroPieChart';
import { calculateTotals } from '../lib/plan-calculator';
import { useState } from 'react';

type Props = {
  allIngredients: IngredientI[];
};

export async function getServerSideProps() {
  const allIngredients: IngredientI[] = await getIngredientsData();
  return { props: { allIngredients } };
}

/**
 * @param props
 * @returns
 */
export default function Plan(props: Props) {
  const [formValues, setFormValues] = useState([]);

  const allIngredients: IngredientI[] = props.allIngredients;
  const totals: Totals = calculateTotals(formValues, allIngredients);

  const handleChange = (formValues: FormValues[]) => {
    setFormValues(formValues);
  };

  return (
    <>
      <h2>Plan</h2>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6} lg={4}>
          <PlanForm data={allIngredients} onChange={handleChange}></PlanForm>
        </Grid>
        <Grid item>
          <MacroPieChart totals={totals}></MacroPieChart>
        </Grid>
        <MealTable totals={totals}></MealTable>
      </Grid>
    </>
  );
}
