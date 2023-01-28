import React from 'react';
import Head from 'next/head';
import { findUniqueIngredient } from '../api/ingredients/[id]';
import { Button } from '@mui/material';
import router from 'next/router';

export const getServerSideProps = async (req) => {
  const ingredient = await findUniqueIngredient(req.query.id);
  const ingredientJson = JSON.stringify(ingredient);

  return { props: { ingredientJson } };
};

export default function Ingredient(props) {
  const data = JSON.parse(props.ingredientJson);
  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
      <Head>
        <title>Food - Ingredient</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>View ingredient</h1>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
