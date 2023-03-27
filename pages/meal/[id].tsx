import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { findUniqueMealWithId } from '../api/meals/[id]';
import { getMealDataForId } from '../api/meals/[id]/ingredients';
import {
  IngredientInterface,
  MealInterface,
  MealIngredientInterface,
  TableData,
  AutocompleteOptions,
} from '../../interfaces';
import { NextApiRequest } from 'next';
import MealTable from '../../components/mealTable';
import MacroPieChart from '../../components/macroPieChart';
import ingredientsMacroPercentagesCalculator from '../../lib/ingredientMacroCalculator';
import { getIngredientsData } from '../api/ingredients';
import PlanForm from '../../components/forms/planForm';
import { defaultMacros } from '../../lib/plan-calculator';
import { useState } from 'react';

type Props = {
  mealsJson: string;
  mealDataJson: string;
  ingredientsJson: string;
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const ingredients = await getIngredientsData();

  const meal = await findUniqueMealWithId(req.query.id);
  const mealDataForId = await getMealDataForId(req.query.id);

  const ingredientsJson = JSON.stringify(ingredients.ingredients);
  const mealDataJson = JSON.stringify(mealDataForId);
  const mealsJson = JSON.stringify(meal);

  return { props: { mealsJson, mealDataJson, ingredientsJson } };
};

/**
 * Meal page component.
 * todo get rid of this stupid stringify / parse to support decimals and dates
 * map / superjson?
 * @param props
 * @returns
 */
export default function Meal(props: Props) {
  const router = useRouter();
  const data: MealInterface = JSON.parse(props.mealsJson);
  const mealData: MealIngredientInterface[] = JSON.parse(props.mealDataJson);
  const ingredients: IngredientInterface[] = JSON.parse(props.ingredientsJson);
  const [macros, setMacros] = useState(
    ingredientsMacroPercentagesCalculator(mealData),
  );
  const [tableData, setTableData] = useState(prepareTableData(mealData));

  // autocomplete pre-selected options from mealData
  const preSelected: AutocompleteOptions[] = mealData.map((element) => {
    return {
      label: element.ingredient.name,
      id: element.ingredient.id,
      ingredient_weight: element.ingredient_weight,
    };
  });

  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
      <h2>{data.name}</h2>
      <PlanForm
        data={ingredients}
        macros={macros}
        setMacros={setMacros}
        setTableData={setTableData}
        preSelected={preSelected}
      ></PlanForm>
      <MealTable tableData={tableData} macros={macros}></MealTable>
      <MacroPieChart macros={macros}></MacroPieChart>
    </>
  );
}

export function prepareTableData(mealData: MealIngredientInterface[]) {
  const tableData: TableData[] = [];

  mealData.map((x) => {
    const rowData = {
      ingredientName: x.ingredient.name,
      kcal: x.ingredient.kcal,
      protein: x.ingredient.protein,
      fat: x.ingredient.fat,
      carbs: x.ingredient.carbs,
      weight: x.ingredient_weight,
    };
    tableData.push(rowData);
  });

  return tableData;
}
