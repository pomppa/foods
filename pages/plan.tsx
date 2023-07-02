import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { FormValue, IngredientI, Totals } from '../interfaces';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macros';
import { calculateTotals } from '../components/planCalculator';
import { useState } from 'react';
import SaveMeal from '../components/forms/saveMeal';

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
  const [isSavingEnabled, setIsSavingEnabled] = useState(false);

  const allIngredients: IngredientI[] = props.allIngredients;
  const totals: Totals = calculateTotals(formValues, allIngredients);

  const handleChange = (formValues: FormValue[]) => {
    setFormValues(formValues);
  };

  const handleSaveMeal = (mealName) => {
    // Perform saving functionality here using mealName and formValues
    console.log(`Saving meal "${mealName}" with form values:`, formValues);
  };

  const handleButtonClick = (value: boolean) => {
    setIsSavingEnabled(value);
  };

  const hasNullValues =
    formValues.length === 0 ||
    formValues.some(
      ({ ingredient_id, weight }) => ingredient_id === null || weight === null,
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <h2>Plan a meal</h2>
        <small>Select ingredients from the dropdown and input weight</small>
        <PlanForm
          data={allIngredients}
          onChange={handleChange}
          hasNullValues={hasNullValues}
          isSavingEnabled={isSavingEnabled}
        ></PlanForm>
      </Grid>
      <Grid item xs={12} md={6}>
        <MacroPieChart totals={totals}></MacroPieChart>
      </Grid>
      <Grid item xs={12}>
        <MealTable totals={totals}></MealTable>
      </Grid>
      <Grid item xs={12}>
        <SaveMeal
          hasNullValues={hasNullValues}
          onSave={handleSaveMeal}
          isSavingEnabled={isSavingEnabled}
          onButtonClick={handleButtonClick}
        />
      </Grid>
    </Grid>
  );
}
