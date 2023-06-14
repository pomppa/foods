import { NextApiRequest } from 'next';
import { useState } from 'react';
import MealFromPlan from '../../../components/forms/mealFromPlan';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macroPieChart';
import MealTable from '../../../components/mealTable';
import {
  AutocompleteOptions,
  CombinedIngredientMeal,
  FormValues,
  IngredientI,
  MealEditInterface,
  MealI,
  Totals,
} from '../../../interfaces';
import { store } from '../../../lib/redux/store';
import { incremented } from '../../../lib/redux/uniqueKeySlice';
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
      //ingredientsData.find((obj) => obj.id === item.ingredient_id) || {};
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
  const preSelected: AutocompleteOptions[] = ingredients.map((element) => {
    const values = {
      label: element.name,
      id: element.ingredient_id,
      ingredient_weight: element.ingredient_weight,
      uniqueKey: store.getState().uniqueKey.value,
      mealIngredientId: element.mealIngredientId,
    };
    store.dispatch(incremented());
    return values;
  });

  const formValues: FormValues[] = ingredients.map((item) => ({
    ingredient: item.ingredient_id,
    weight: item.ingredient_weight,
  }));

  const [macros, setMacros] = useState<Totals>(
    calculateTotals(formValues, ingredients),
  );
  const [preSelectedValues] = useState(preSelected);
  const [mealName, setMealName] = useState(meal.name);

  const saveMealFromEdit = async (mealName) => {
    const endpoint = `/api/meals/${meal.id}/ingredients`;
    const ingredients: FormValues[] = store.getState().valueUpdated.ingredients;
    const data: MealEditInterface = {
      id: meal.id,
      name: mealName,
      ingredients: ingredients,
      deletedMealIngredientIds:
        store.getState().valueUpdated.deletedMealIngredientIds,
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    await fetch(endpoint, options);
  };

  /**
   * todo clean passed props
   */
  return (
    <>
      <h1>Edit meal</h1>
      <h2>{meal.name}</h2>
      <PlanForm
        data={props.allIngredients}
        macros={macros}
        preSelected={preSelectedValues}
        setMacros={setMacros}
        displaySaveOption={false}
      ></PlanForm>
      <MealFromPlan
        {...{
          setDisplayMealSave: false,
          setMealName: setMealName,
          saveMealFromPlan: saveMealFromEdit,
          mealName: mealName,
          mealId: meal.id,
        }}
      ></MealFromPlan>
      <MealTable macros={macros}></MealTable>
      <MacroPieChart macros={macros}></MacroPieChart>
    </>
  );
}
