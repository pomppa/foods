import { NextApiRequest } from 'next';
import { useState } from 'react';
import MealFromPlan from '../../../components/forms/mealFromPlan';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macroPieChart';
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
  const initialIngredients: CombinedIngredientMeal[] = props.ingredients;

  const [mealName, setMealName] = useState(meal.name);

  const { allIngredients } = props;

  const [formValues, setFormValues] = useState<FormValue[]>(
    initialIngredients.map((item) => ({
      ingredient: item.ingredient_id,
      weight: item.ingredient_weight,
    })),
  );
  const totals: Totals = calculateTotals(formValues, allIngredients);

  const handleChange = (formValues: FormValue[]) => {
    setFormValues(formValues);
  };

  return (
    <>
      <h1>Edit meal</h1>
      <h2>{meal.name}</h2>

      <PlanForm
        data={allIngredients}
        formValues={formValues}
        onChange={handleChange}
      ></PlanForm>
      <MealFromPlan
        {...{
          setDisplayMealSave: false,
          setMealName: setMealName,
          mealName: mealName,
          mealId: meal.id,
        }}
      ></MealFromPlan>
      <MealTable totals={totals}></MealTable>
      <MacroPieChart totals={totals}></MacroPieChart>
    </>
  );
}
