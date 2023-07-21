import { useState } from 'react';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macros';
import MealTable from '../../../components/mealTable';
import { FormValue, IngredientI, Totals } from '../../../types';
import { getIngredientDataForIds } from '../../../lib/getIngredientDataForIds';
import { getMeal } from '../../api/getMeal/[id]';
import { calculateTotals } from '../../../components/totalsCalculator';
import { Grid, Typography } from '@mui/material';
import router from 'next/router';
import SaveMeal from '../../../components/forms/saveMeal';
import { Meal } from '@prisma/client';
import StickyFabs from '../../../components/stickyFabs';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/authOptions';

type Props = {
  meal: Omit<Meal, 'created_at' | 'updated_at'>;
  initialFormValues: FormValue[];
  ingredientDataForIds: IngredientI[];
};

export const getServerSideProps: GetServerSideProps<Props> = async function ({
  req,
  res,
  query,
}) {
  const { id } = query;

  const session = await getServerSession(req, res, authOptions);

  const meal = await getMeal(id, session.user.id);

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
    router.push('/meals/list');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" mt={2} mb={2}>
          Edit
        </Typography>
        <Typography variant="h6" mb={2}>
          {meal.name}
        </Typography>
        <Typography variant="body2" mb={2}>
          Edit meal contents
        </Typography>
        <PlanForm
          formValues={formValues}
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
          meal={meal.name}
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
        }}
      >
        <Grid item xs={12}>
          <Grid item xs={12}>
            <StickyFabs
              primaryFabVisible={true}
              primaryFabDisabled={!isFabEnabled || isSavingEnabled}
              secondaryFabVisible={true}
              onSecondaryClick={handleBack}
              onPrimaryClick={handleFabClick}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
