import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import IngredientForm from '../components/forms/ingredientForm';

export default function Ingredients() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/ingredients/')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <Head>
        <title>Foods - Ingredients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Ingredients</h1>
        <p>Add a new ingredient</p>
      </div>
      <IngredientForm></IngredientForm>
      <h2> All ingredients </h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
