import { NextApiRequest } from 'next';
import { useState } from 'react';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macros';
import MealTable from '../../../components/mealTable';
import { FormValue, IngredientI, Totals } from '../../../interfaces';
import { getIngredientsData } from '../../api/ingredients';
import { getMeal } from '../../api/meals/[id]';
import { calculateTotals } from '../../../components/planCalculator';
import { Button, Fab, Grid } from '@mui/material';
import router from 'next/router';
import SaveMeal from '../../../components/forms/saveMeal';
import SaveIcon from '@mui/icons-material/Save';
import { Meal } from '@prisma/client';

export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<Meal, 'created_at' | 'updated_at'> = await getMeal(
    req.query.id,
  );

  const initialFormValues = meal.formValues;

  const allIngredients: Omit<IngredientI, 'created_at' | 'updated_at'>[] =
    await getIngredientsData();

  return {
    props: { meal, initialFormValues, allIngredients },
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
  const { meal, initialFormValues, allIngredients } = props;

  // const meal: Omit<MealI, 'created_at' | 'updated_at'> = props.meal;

  const [isSavingEnabled, setIsSavingEnabled] = useState(false);
  const [isFabEnabled, setIsFabEnabled] = useState(false);

  const [formValues, setFormValues] = useState<FormValue[]>(initialFormValues);

  const totals: Totals = calculateTotals(formValues, allIngredients);

  const handleChange = (formValues: FormValue[]) => {
    setIsFabEnabled(true);
    setFormValues(formValues);
  };

  const handleSaveMeal = async (mealName: string) => {
    try {
      const response = await fetch(`/api/updateMeal/${meal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: mealName,
          formValues: formValues,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update meal');
      }

      router.push(`/meal/${meal.id}`);
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
      <Grid item xs={12} sx={{ display: { xs: 'none' } }}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <h2>Edit</h2>
        <h4>{meal.name}</h4>
        <small>Edit meal contents</small>
        <PlanForm
          data={allIngredients}
          formValues={formValues}
          onChange={handleChange}
          hasNullValues={hasNullValues}
          isSavingEnabled={isSavingEnabled}
        ></PlanForm>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MacroPieChart totals={totals}></MacroPieChart>
      </Grid>
      <Grid item xs={12}>
        <MealTable totals={totals}></MealTable>
      </Grid>
      <Grid item xs={12}>
        <SaveMeal
          meal={meal.name}
          hasNullValues={hasNullValues}
          onSave={handleSaveMeal}
          isSavingEnabled={isSavingEnabled}
          onButtonClick={handleButtonClick}
        />
      </Grid>
      <Fab
        aria-label="Save"
        color="success"
        disabled={hasNullValues || !isFabEnabled}
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          display: {
            sm: 'none',
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
