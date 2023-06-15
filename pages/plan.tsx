import { useState } from 'react';
import { Grid } from '@mui/material';
import { getIngredientsData } from './api/ingredients';
import { FormValues, IngredientI, Totals } from '../interfaces';
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

  const disabledOptions: number[] = Object.values(dataMap).map(
    (item) => item.ingredient,
  );

  const dataArr: FormValues[] = Object.values(dataMap);
  const totals: Totals = calculateTotals(dataArr, combinedData);

  const [childCount, setChildCount] = useState(0);
  const [childComponents, setChildComponents] = useState([]);

  const addChild = () => {
    setChildCount(childCount + 1);
    setChildComponents((prevComponents) => [...prevComponents, childCount]);
  };

  return (
    <>
      <h2>Plan</h2>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6} lg={4}>
          <PlanForm
            data={combinedData}
            displaySaveOption={true}
            disabledOptions={disabledOptions}
            ingredientWeightValues={dataArr}
            onIngredientWeightChange={handleIngredientWeightChange}
            onDeleteChild={removeItemFromDataMap}
            onAddChild={addChild}
            childComponents={childComponents}
          ></PlanForm>
        </Grid>
        <Grid item>
          <MacroPieChart totals={totals}></MacroPieChart>
        </Grid>
        <MealTable totals={totals}></MealTable>
      </Grid>
    </>
  );
}
