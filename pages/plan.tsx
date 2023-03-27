import { useState } from 'react';
import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { getFineliIngredientsData } from './api/fineli';
import { defaultMacros } from '../lib/plan-calculator';
import {
  AutocompleteOptions,
  IngredientInterface,
  IngredientsInterface,
  MealIngredientInterface,
} from '../interfaces';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macroPieChart';
import { getMealDataForId } from './api/meals/[id]/ingredients';
import { prepareTableData } from './meal/[id]';
import ingredientsMacroPercentagesCalculator from '../lib/ingredientMacroCalculator';

type Props = {
  jsonData: string;
  fineliIngredientsJson: string;
  mealJson: string;
};

export async function getServerSideProps() {
  const meal = await getMealDataForId(63);
  const data = await getIngredientsData();
  const fineliIngredients = await getFineliIngredientsData();

  const jsonData = JSON.stringify(data);
  const fineliIngredientsJson = JSON.stringify(fineliIngredients);
  const mealJson = JSON.stringify(meal);

  return { props: { jsonData, fineliIngredientsJson, mealJson } };
}

export default function Plan(props: Props) {
  // console.log(props);
  // const [macros, setMacros] = useState(defaultMacros);

  const jsonData = props.jsonData;
  const fineliIngredientsJson = props.fineliIngredientsJson;
  const meal = props.mealJson;

  const data: IngredientsInterface = JSON.parse(jsonData);
  const fineliData: IngredientsInterface = JSON.parse(fineliIngredientsJson);
  const combinedData: IngredientInterface[] = data.ingredients.concat(
    fineliData.ingredients,
  );
  const mealData: MealIngredientInterface[] = JSON.parse(meal);
  console.log(mealData);
  const [tableData, setTableData] = useState(prepareTableData(mealData ?? []));
  console.log(tableData);
  const preSelected: AutocompleteOptions[] = mealData.map((element) => {
    return {
      label: element.ingredient.name,
      id: element.ingredient.id,
      ingredient_weight: element.ingredient_weight,
    };
  });

  const [macros, setMacros] = useState(
    ingredientsMacroPercentagesCalculator(mealData),
  );

  return (
    <>
      <h2>Plan</h2>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6} lg={4}>
          <PlanForm
            data={combinedData}
            macros={macros}
            setMacros={setMacros}
            setTableData={setTableData}
            preSelected={preSelected}
          ></PlanForm>
        </Grid>
        <>
          <Grid item>
            <MacroPieChart macros={macros}></MacroPieChart>
          </Grid>
          <MealTable tableData={tableData} macros={macros}></MealTable>
        </>
      </Grid>
    </>
  );
}
