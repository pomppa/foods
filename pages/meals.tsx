import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MealForm from '../components/forms/mealForm';

export default function Meals() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/meals')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Foods - Meals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>View & create meals</h1>
      </div>
      <div>
        <h2>Create a meal </h2>
        <MealForm></MealForm>
      </div>
      <h1>All meals</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
