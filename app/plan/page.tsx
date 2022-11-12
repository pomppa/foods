// import { useState } from 'react';
import PlanForm from '../../components/forms/planForm';
import { Grid } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import { getIngredientsData } from '../../pages/api/ingredients';
import { defaultMacros } from '../../lib/plan-calculator';

// export async function getServerSideProps() {
//   const data = await getIngredientsData();
//   const jsonData = JSON.stringify(data);

//   return { props: { jsonData } };
// }

async function getData() {
  const res = await getIngredientsData();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res;
}

export default async function Plan() {
  // const [macros, setMacros] = useState(defaultMacros);
  const data = await getData();
  // console.log(data);

  // const defaultLabelStyle = {
  //   fontSize: '5px',
  //   fontFamily: 'sans-serif',
  // };

  return (
    <>
      <h1>Plan</h1>
      <Grid></Grid> {/*createcontext not a function */}
      {
        // <Grid container spacing={2}>
        //   <Grid item xs={8} md={6} lg={4}>
        //     <PlanForm
        //       data={data}
        //       // macros={macros}
        //       // setMacros={setMacros}
        //     ></PlanForm>
        //   </Grid>
        //   {/* <pre>{JSON.stringify(macros, null, 2)}</pre> */}
        //   <Grid item>
        //     {macros.macroPercentages.protein ? (
        //       <PieChart
        //         data={[
        //           {
        //             title: 'protein',
        //             value: macros.macroPercentages?.protein,
        //             color: '#123',
        //           },
        //           {
        //             title: 'carbs',
        //             value: macros.macroPercentages?.carbs,
        //             color: '#fff',
        //           },
        //           {
        //             title: 'fat',
        //             value: macros.macroPercentages?.fat,
        //             color: '#555',
        //           },
        //         ]}
        //         label={({ dataEntry }) => dataEntry.title}
        //         labelStyle={{
        //           ...defaultLabelStyle,
        //         }}
        //       ></PieChart>
        //     ) : null}
        //   </Grid>
        // </Grid>
      }
    </>
  );
}
