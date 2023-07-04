import { Fab, Grid, Typography } from '@mui/material';
import { FormValue, IngredientI, Totals } from '../types';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macros';
import { calculateTotals } from '../components/totalsCalculator';
import { useState } from 'react';
import SaveMeal from '../components/forms/saveMeal';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/router';
import StickyFabs from '../components/stickyFabs';

/**
 * @param props
 * @returns
 */
export default function Plan() {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValue[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientI[]>(
    [],
  );

  const [isSavingEnabled, setIsSavingEnabled] = useState(false);

  const totals: Totals = calculateTotals(formValues, selectedIngredients);

  const handleChange = async (formValues: FormValue[]) => {
    setFormValues(formValues);
    const ingredientIds = formValues.map((value) => value.ingredient_id);

    if (
      ingredientIds.length > 0 &&
      !formValues.some((formValue) => formValue.ingredient_id === null)
    ) {
      try {
        const response = await fetch('api/getIngredientsWithIds', {
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
        setSelectedIngredients(ingredients);
      } catch (error) {
        router.push('/plan');
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
        <Typography variant="h5" mt={2}>
          Plan a meal
        </Typography>
        <Typography variant="body2" mt={2}>
          Select food items and input weights
        </Typography>
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
      <Grid
        container
        justifyContent="flex-end"
        sx={{
          position: 'sticky',
          zIndex: 1,
          bottom: '16px',
          maxWidth: 'calc(100% - 16px)',
          margin: '0 auto',
          left: 0,
          right: 0,
        }}
      >
        <Grid item xs={12}>
          <StickyFabs
            primaryFabVisible={true}
            primaryFabDisabled={hasNullValues || isSavingEnabled}
            onPrimaryClick={handleFabClick}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
