import { useState } from 'react';
import PlanForm from '../components/forms/planForm';
import { Box, Grid } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import { getIngredientsData } from './api/ingredients';
import { getFineliIngredientsData } from './api/fineli';
import { defaultMacros } from '../lib/plan-calculator';
import MealTable from '../components/mealTable';

export async function getServerSideProps() {
  const data = await getIngredientsData();
  const jsonData = JSON.stringify(data);
  const fineliIngredients = await getFineliIngredientsData();
  const fineliIngredientsJson = JSON.stringify(fineliIngredients);

  return { props: { jsonData, fineliIngredientsJson } };
}

export default function Plan({ jsonData, fineliIngredientsJson }) {
  const [macros, setMacros] = useState(defaultMacros);
  const data = JSON.parse(jsonData);
  const fineliData = JSON.parse(fineliIngredientsJson);
  const combinedData = data.concat(fineliData);

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  return (
    <>
      <h2>Plan</h2>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6} lg={4}>
          <PlanForm
            data={combinedData}
            macros={macros}
            setMacros={setMacros}
          ></PlanForm>
        </Grid>

        {/* <pre>{JSON.stringify(macros, null, 2)}</pre> */}

        {macros.macroPercentages.protein ? (
          <>
            <Grid item>
              <PieChart
                data={[
                  {
                    title: 'protein',
                    value: macros.macroPercentages?.protein,
                    color: '#90a4ae',
                  },
                  {
                    title: 'carbs',
                    value: macros.macroPercentages?.carbs,
                    color: '#cfd8dc',
                  },
                  {
                    title: 'fat',
                    value: macros.macroPercentages?.fat,
                    color: '#455a64',
                  },
                ]}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{
                  ...defaultLabelStyle,
                }}
              ></PieChart>
            </Grid>
            <MealTable data={combinedData}></MealTable>
          </>
        ) : null}
      </Grid>
    </>
  );
}
