import { useState } from 'react';
import Head from 'next/head';
import PlanForm from '../components/forms/planForm';
import { Grid } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import { getIngredientsData } from './api/ingredients';
import { defaultMacros } from '../lib/plan-calculator';

export async function getServerSideProps() {
  const data = await getIngredientsData();
  const jsonData = JSON.stringify(data);

  return { props: { jsonData } };
}

export default function Plan({ jsonData }) {
  const [macros, setMacros] = useState(defaultMacros);
  const data = JSON.parse(jsonData);

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
            data={data}
            macros={macros}
            setMacros={setMacros}
          ></PlanForm>
        </Grid>

        <pre>{JSON.stringify(macros, null, 2)}</pre>

        <Grid item>
          {macros.macroPercentages.protein ? (
            <PieChart
              data={[
                {
                  title: 'protein',
                  value: macros.macroPercentages?.protein,
                  color: '#123',
                },
                {
                  title: 'carbs',
                  value: macros.macroPercentages?.carbs,
                  color: '#fff',
                },
                {
                  title: 'fat',
                  value: macros.macroPercentages?.fat,
                  color: '#555',
                },
              ]}
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={{
                ...defaultLabelStyle,
              }}
            ></PieChart>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
