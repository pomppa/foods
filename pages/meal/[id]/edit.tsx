import { NextApiRequest } from 'next';
import { useState, useEffect } from 'react';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macros';
import MealTable from '../../../components/mealTable';
import {
  CombinedIngredientMeal,
  FormValue,
  IngredientI,
  MealI,
  Totals,
} from '../../../interfaces';
import {
  getIngredientDataForIds,
  getIngredientsData,
} from '../../api/ingredients';
import { findUniqueMealWithId } from '../../api/meals/[id]';
import { getMealDataForId } from '../../api/meals/[id]/ingredients';
import { calculateTotals } from '../../../components/planCalculator';
import { Button, Fab, Grid } from '@mui/material';
import router from 'next/router';
import SaveMeal from '../../../components/forms/saveMeal';
import SaveIcon from '@mui/icons-material/Save';

export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<MealI, 'created_at' | 'updated_at'> =
    await findUniqueMealWithId(req.query.id);
  const mealIngredientsData = await getMealDataForId(req.query.id);

  const valuesArray: number[] = mealIngredientsData.map(
    (obj: { ingredient_id: number }) => obj.ingredient_id,
  );

  const ingredientsData: IngredientI[] = await getIngredientDataForIds(
    valuesArray,
  );

  const ingredients: CombinedIngredientMeal[] = mealIngredientsData.map(
    (item: { ingredient_id: number }) => {
      const ingredient = ingredientsData.find(
        (obj) => obj.id === item.ingredient_id,
      );
      return {
        ...item,
        ...ingredient,
      };
    },
  );

  const allIngredients: IngredientI[] = await getIngredientsData();

  return {
    props: { meal, ingredients, allIngredients },
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
  const meal: Omit<MealI, 'created_at' | 'updated_at'> = props.meal;
  const initialIngredients: CombinedIngredientMeal[] = props.ingredients;
  const allIngredients = props.allIngredients;

  const [isSavingEnabled, setIsSavingEnabled] = useState(false);
  const [isFabEnabled, setIsFabEnabled] = useState(false);

  const [formValues, setFormValues] = useState<FormValue[]>(
    initialIngredients.map((item) => ({
      ingredient_id: item.ingredient_id,
      weight: item.ingredient_weight,
    })),
  );

  const totals: Totals = calculateTotals(formValues, allIngredients);

  const handleChange = (formValues: FormValue[]) => {
    setIsFabEnabled(true);
    setFormValues(formValues);
  };

  const handleSaveMeal = (mealName: string) => {
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

  const handleFabClick = () => {
    setIsSavingEnabled(true);

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 10);
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
