import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { findUniqueMealWithId } from '../api/meals/[id]';
import { getMealDataForId } from '../api/meals/[id]/ingredients';
import {
  MealInterface,
  FormValues,
  IngredientI,
  MealI,
  CombinedIngredientMeal,
} from '../../interfaces';
import { NextApiRequest } from 'next';
import MealTable from '../../components/mealTable';
import MacroPieChart from '../../components/macroPieChart';
import { getIngredientDataForIds } from '../api/ingredients';
import { useState } from 'react';
import { calculateTotals } from '../../lib/plan-calculator';

type Props = {
  meal: MealInterface;
  ingredients: CombinedIngredientMeal[];
};

/**
 * todo move to index of interfaces?
 */
interface MealIngredientI {
  id: number;
  meal_id: number;
  ingredient_id: number;
  ingredient_weight: number;
}

/**
 * todo return all in one object?
 * @param req
 * @returns
 */
export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<MealI, 'created_at' | 'updated_at'> =
    await findUniqueMealWithId(req.query.id);

  const mealIngredients: MealIngredientI[] = await getMealDataForId(
    req.query.id,
  );

  const valuesArray: number[] = mealIngredients.map((obj) => obj.ingredient_id);

  const ingredientData: IngredientI[] = await getIngredientDataForIds(
    valuesArray,
  );

  const ingredients: CombinedIngredientMeal[] = mealIngredients.map((item) => {
    const ingredient: IngredientI = ingredientData.find(
      (obj) => obj.id === item.ingredient_id,
    );
    // ingredientData.find((obj) => obj.id === item.ingredient_id) || {};
    return {
      ...item,
      ...ingredient,
    };
  });
  // console.log({ mealData, mealIngredients, ingredients });
  return {
    props: { meal, ingredients },
  };
};

/**
 * Meal page component.
 * todo do we need all props?
 * serialization not needed for this data, it is converted already
 * @see https://github.com/prisma/prisma/issues/9170
 * @see https://github.com/vercel/next.js/issues/11993#issuecomment-1504415523
 *
 * @param props
 * @returns
 */
export default function Meal(props: Props) {
  const router = useRouter();
  const ingredients: CombinedIngredientMeal[] = props.ingredients;
  const formValues: FormValues[] = ingredients.map((item) => ({
    ingredient: item.ingredient_id, //todo change to ingredient_id???
    weight: Number(item.ingredient_weight),
  }));

  const [macros] = useState(calculateTotals(formValues, ingredients));
  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
      <h2>{props.meal.name}</h2>
      <MealTable macros={macros}></MealTable>
      <MacroPieChart macros={macros}></MacroPieChart>
    </>
  );
}
