import { Fab, Grid } from '@mui/material';
import { getIngredientsWithSelect } from './api/ingredients';
import { FormValue, IngredientI, Totals } from '../types';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macros';
import { calculateTotals } from '../components/totalsCalculator';
import { useState } from 'react';
import SaveMeal from '../components/forms/saveMeal';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/router';

type Props = {
  ingredientIdsAndNames: IngredientI[];
};

export async function getServerSideProps() {
  const ingredientIdsAndNames: IngredientI[] = await getIngredientsWithSelect();
  return { props: { ingredientIdsAndNames } };
}

/**
 * @param props
 * @returns
 */
export default function Plan(props: Props) {
  const { ingredientIdsAndNames } = props;
  console.log(ingredientIdsAndNames);
  const router = useRouter();

  const [formValues, setFormValues] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  const [isSavingEnabled, setIsSavingEnabled] = useState(false);

  const totals: Totals = calculateTotals(formValues, allIngredients);

  const handleChange = async (formValues: FormValue[]) => {
    setFormValues(formValues);
    const ingredientIds = formValues.map((value) => value.ingredient_id);

    if (ingredientIds.length > 0) {
      try {
        const response = await fetch('api/getIngredients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredientIds }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }

        const ingredients = await response.json();
        setAllIngredients(ingredients);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveMeal = async (mealName: string) => {
    try {
      const response = await fetch('/api/saveMeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealName: mealName,
          formValues: formValues,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save meal');
      }

      const {
        data: { id },
      } = await response.json();

      router.push(`/meals/${id}`);
    } catch (error) {
      router.push('/plan');
    }
  };

  const handleButtonClick = (value: boolean) => {
    setIsSavingEnabled(value);
  };

  const hasNullValues =
    formValues.length === 0 ||
    formValues.some(
      ({ ingredient_id, weight }) =>
        ingredient_id === null || weight === null || weight == 0,
    );

  const handleFabClick = () => {
    setIsSavingEnabled(true);

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 0);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <h2>Plan a meal</h2>
        <small>Select ingredients from the dropdown and input weight</small>
        <PlanForm
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
      <Fab
        aria-label="Save"
        color="primary"
        disabled={hasNullValues}
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          display: {
            sm: isSavingEnabled ? 'none' : 'flex',
            xs: isSavingEnabled ? 'none' : 'flex',
          },
        }}
        onClick={handleFabClick}
      >
        <SaveIcon />
      </Fab>
    </Grid>
  );
}
