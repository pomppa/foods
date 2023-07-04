import { NextApiRequest } from 'next';
import { useState } from 'react';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macros';
import MealTable from '../../../components/mealTable';
import { FormValue, IngredientI, Totals } from '../../../types';
import { getIngredientDataForIds } from '../getIngredientDataForIds';
import { getMeal } from '../../api/getMeal/[id]';
import { calculateTotals } from '../../../components/totalsCalculator';
import { Button, Fab, Grid } from '@mui/material';
import router from 'next/router';
import SaveMeal from '../../../components/forms/saveMeal';
import SaveIcon from '@mui/icons-material/Save';
import { Meal } from '@prisma/client';
import BackIcon from '@mui/icons-material/ArrowBack';

type Props = {
  meal: Omit<Meal, 'created_at' | 'updated_at'>;
  initialFormValues: FormValue[];
  ingredientDataForIds: IngredientI[];
};
export const getServerSideProps = async (req: NextApiRequest) => {
  const meal = await getMeal(req.query.id);

  const initialFormValues = meal.formValues as FormValue[];

  const ingredientIds = initialFormValues.map((value) => value.ingredient_id);

  const ingredientDataForIds = await getIngredientDataForIds(ingredientIds);

  return {
    props: { meal, initialFormValues, ingredientDataForIds },
  };
};

/**
 * Edit page component
 *
 * @param props
 * @returns
 */
export default function Edit(props: Props) {
  const { meal, initialFormValues, ingredientDataForIds } = props;

  const [isSavingEnabled, setIsSavingEnabled] = useState(false);
  const [isFabEnabled, setIsFabEnabled] = useState(false);

  const [formValues, setFormValues] = useState<FormValue[]>(initialFormValues);

  const totals: Totals = calculateTotals(formValues, ingredientDataForIds);

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

      router.push(`/meals/${meal.id}`);
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

  const handleBack = () => {
    router.push('/meals');
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
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          position: 'sticky',
          zIndex: 1,
          bottom: '16px',
          maxWidth: 'calc(100% - 16px)',
          margin: '0 auto',
        }}
      >
        <Fab
          aria-label="Save"
          color="primary"
          disabled={hasNullValues || !isFabEnabled}
          sx={{
            display: {
              marginBottom: '8px',
              sm: isSavingEnabled ? 'none' : 'flex',
              xs: isSavingEnabled ? 'none' : 'flex',
            },
          }}
          onClick={handleFabClick}
        >
          <SaveIcon />
        </Fab>
        <Fab
          aria-label="Back"
          color="secondary"
          disabled={isSavingEnabled}
          onClick={handleBack}
        >
          <BackIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}
