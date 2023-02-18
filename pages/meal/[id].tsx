import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { findUniqueMealWithId } from '../api/meals/[id]';
import { getMealDataForId } from '../api/meals/[id]/ingredients';
import MealTable from '../../components/mealTable';

export const getServerSideProps = async (req) => {
  const meal = await findUniqueMealWithId(req.query.id);
  const mealDataForId = await getMealDataForId(req.query.id);

  const mealDataJson = JSON.stringify(mealDataForId);
  const mealsJson = JSON.stringify(meal);

  return { props: { mealsJson, mealDataJson } };
};

export default function Meal(props) {
  const router = useRouter();

  const data = JSON.parse(props.mealsJson);
  const mealData = JSON.parse(props.mealDataJson);

  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
      <h2>{data.name}</h2>
      <MealTable data={mealData}></MealTable>
    </>
  );
}
