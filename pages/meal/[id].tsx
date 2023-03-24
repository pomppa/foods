import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { findUniqueMealWithId } from '../api/meals/[id]';
import { getMealDataForId } from '../api/meals/[id]/ingredients';
import {
  MealInterface,
  MealIngredientInterface,
  TableData,
} from '../../interfaces';
import { NextApiRequest } from 'next';
import MealTable from '../../components/mealTable';
import MacroPieChart from '../../components/macroPieChart';
import ingredientsMacroPercentagesCalculator from '../../lib/ingredientMacroCalculator';

type Props = {
  mealsJson: string;
  mealDataJson: string;
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const meal = await findUniqueMealWithId(req.query.id);
  const mealDataForId = await getMealDataForId(req.query.id);

  const mealDataJson = JSON.stringify(mealDataForId);
  const mealsJson = JSON.stringify(meal);

  return { props: { mealsJson, mealDataJson } };
};

export default function Meal(props: Props) {
  const router = useRouter();
  const data: MealInterface = JSON.parse(props.mealsJson);
  const mealData: MealIngredientInterface[] = JSON.parse(props.mealDataJson);
  const tableData: TableData[] = prepareTableData(mealData);
  const macros = ingredientsMacroPercentagesCalculator(mealData);
  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
      <h2>{data.name}</h2>
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
