import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { FormValue, IngredientI, Totals } from '../interfaces';
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

  const handleChange = (formValues: FormValue[]) => {
    setFormValues(formValues);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Plan a meal</h2>
          <small>Select ingredients from the dropdown and input weight</small>
          <PlanForm data={allIngredients} onChange={handleChange}></PlanForm>
        </Grid>
        <Grid item xs={6}>
          <MacroPieChart totals={totals}></MacroPieChart>
        </Grid>
      </Grid>
      <Grid sx={{ mt: '50px', mb: '50px' }}>
        <MealTable totals={totals}></MealTable>
      </Grid>
    </>
  );
}
