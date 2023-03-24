import { useState } from 'react';
import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { getFineliIngredientsData } from './api/fineli';
import { defaultMacros } from '../lib/plan-calculator';
import { IngredientInterface, IngredientsInterface } from '../interfaces';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macroPieChart';

type Props = {
  jsonData: string;
  fineliIngredientsJson: string;
};

export async function getServerSideProps() {
  const data = await getIngredientsData();
  const fineliIngredients = await getFineliIngredientsData();

  const jsonData = JSON.stringify(data);
  const fineliIngredientsJson = JSON.stringify(fineliIngredients);

  return { props: { jsonData, fineliIngredientsJson } };
}

export default function Plan(props: Props) {
  const [macros, setMacros] = useState(defaultMacros);
  const [tableData, setTableData] = useState([]);

  const jsonData = props.jsonData;
  const fineliIngredientsJson = props.fineliIngredientsJson;

  const data: IngredientsInterface = JSON.parse(jsonData);
  const fineliData: IngredientsInterface = JSON.parse(fineliIngredientsJson);
  const combinedData: IngredientInterface[] = data.ingredients.concat(
    fineliData.ingredients,
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
