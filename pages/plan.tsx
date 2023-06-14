import { useState } from 'react';
import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { IngredientI, Totals } from '../interfaces';
import MealTable from '../components/mealTable';
import PlanForm from '../components/forms/planForm';
import MacroPieChart from '../components/macroPieChart';
import { calculateTotals } from '../lib/plan-calculator';
import { DataMap } from '../interfaces';

type Props = {
  ingredients: IngredientI[];
};

export async function getServerSideProps() {
  const ingredients: IngredientI[] = await getIngredientsData();
  return { props: { ingredients } };
}

export default function Plan(props: Props) {
  const combinedData: IngredientI[] = props.ingredients;
  const totals: Totals = calculateTotals(
    [{ ingredient: 0, weight: 0 }],
    combinedData,
  );

  const [macros, setMacros] = useState(totals);

  const [dataMap, setDataMap] = useState<DataMap>({});

  const handleIngredientWeightChange = (obj: {
    uniqueKey: number;
    weight?: number;
    ingredient?: number;
  }) => {
    const { uniqueKey, weight, ingredient } = obj;

    setDataMap((prevDataMap) => ({
      ...prevDataMap,
      [uniqueKey]: {
        weight:
          weight !== undefined ? weight : prevDataMap[uniqueKey]?.weight || 0,
        ingredient:
          ingredient !== undefined
            ? ingredient
            : prevDataMap[uniqueKey]?.ingredient || 0,
      },
    }));
  };

  const disabledOptions = Object.values(dataMap).map((item) => item.ingredient);

  return (
    <>
      <h2>Plan</h2>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6} lg={4}>
          <PlanForm
            data={combinedData}
            macros={macros}
            setMacros={setMacros}
            displaySaveOption={true}
            preSelected={[]}
            disabledOptions={disabledOptions}
            ingredientWeightValues={dataMap}
            onIngredientWeightChange={handleIngredientWeightChange}
          ></PlanForm>
        </Grid>
        <Grid item>
          <MacroPieChart macros={macros}></MacroPieChart>
        </Grid>
        <MealTable macros={macros}></MealTable>
      </Grid>
    </>
  );
}
