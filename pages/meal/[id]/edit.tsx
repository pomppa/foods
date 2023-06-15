import { NextApiRequest } from 'next';
import { useState } from 'react';
import MealFromPlan from '../../../components/forms/mealFromPlan';
import PlanForm from '../../../components/forms/planForm';
import MacroPieChart from '../../../components/macroPieChart';
import MealTable from '../../../components/mealTable';
import {
  AutocompleteOptions,
  CombinedIngredientMeal,
  DataMap,
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

  const [childCount, setChildCount] = useState(0);
  const [childComponents, setChildComponents] = useState([]);

  const addChild = () => {
    setChildCount(childCount + 1);
    setChildComponents((prevComponents) => [...prevComponents, childCount]);
  };

  const [dataMap, setDataMap] = useState<DataMap>(formValues);

  const disabledOptions: number[] = Object.values(dataMap).map(
    (item) => item.ingredient,
  );

  const handleIngredientWeightChange = (obj: {
    uniqueKey: number;
    weight?: number;
    ingredient?: number;
  }) => {
    const { uniqueKey, weight, ingredient } = obj;
    setDataMap((prevDataMap) => ({
      ...prevDataMap,
      [uniqueKey]: {
        ingredient:
          ingredient !== undefined
            ? ingredient
            : prevDataMap[uniqueKey]?.ingredient || 0,
        weight:
          weight !== undefined ? weight : prevDataMap[uniqueKey]?.weight || 0,
      },
    }));
  };

  const removeItemFromDataMap = (id) => {
    setDataMap((prevDataMap) => {
      const newDataMap = { ...prevDataMap };
      delete newDataMap[id];
      return newDataMap;
    });
    setChildComponents((prevComponents) =>
      prevComponents.filter((componentId) => componentId !== id),
    );
  };

  console.log(dataMap);

  return (
    <>
      <h1>Edit meal</h1>
      <h2>{meal.name}</h2>

      <PlanForm
        data={props.allIngredients}
        displaySaveOption={true}
        formValues={formValues}
        childComponents={childComponents}
        onAddChild={addChild}
        disabledOptions={disabledOptions}
        ingredientWeightValues={dataMap}
        onIngredientWeightChange={handleIngredientWeightChange}
        onDeleteChild={removeItemFromDataMap}
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
      <MealTable totals={macros}></MealTable>
      <MacroPieChart totals={macros}></MacroPieChart>
    </>
  );
}
