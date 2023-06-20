import { NextApiRequest } from 'next';
import { useState } from 'react';
import MealFromPlan from '../../../components/forms/mealFromPlan';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macroPieChart';
import MealTable from '../../../components/mealTable';
import {
  CombinedIngredientMeal,
  FormValues,
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
import { calculateTotals } from '../../../lib/plan-calculator';

export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<MealI, 'created_at' | 'updated_at'> =
    await findUniqueMealWithId(req.query.id);
  const mealIngredientsData = await getMealDataForId(req.query.id);

  const valuesArray: number[] = mealIngredientsData.map(
    (obj) => obj.ingredient_id,
  );

  const ingredientsData: IngredientI[] = await getIngredientDataForIds(
    valuesArray,
  );

  const ingredients: CombinedIngredientMeal[] = mealIngredientsData.map(
    (item) => {
      const ingredient = ingredientsData.find(
        (obj) => obj.id === item.ingredient_id,
      );
      return {
        ...item,
        ...ingredient,
      };
    },
  );

  const allIngredients = await getIngredientsData();
  return {
    props: { meal, ingredients, allIngredients },
  };
};

/**
 * todo clean props
 * @param props
 * @returns
 */
export default function Edit(props) {
  const meal: Omit<MealI, 'created_at' | 'updated_at'> = props.meal;
  const ingredients: CombinedIngredientMeal[] = props.ingredients;

  const { allIngredients } = props;

  const formValues: FormValues[] = ingredients.map((item) => ({
    ingredient: item.ingredient_id,
    weight: item.ingredient_weight,
  }));

  const [macros] = useState<Totals>(calculateTotals(formValues, ingredients));
  const [mealName, setMealName] = useState(meal.name);

  return (
    <>
      <h1>Edit meal</h1>
      <h2>{meal.name}</h2>

      <PlanForm data={allIngredients} formValues={formValues}></PlanForm>
      <MealFromPlan
        {...{
          setDisplayMealSave: false,
          setMealName: setMealName,
          mealName: mealName,
          mealId: meal.id,
        }}
      ></MealFromPlan>
      <MealTable totals={macros}></MealTable>
      <MacroPieChart totals={macros}></MacroPieChart>
    </>
  );
}
