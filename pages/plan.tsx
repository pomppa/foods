import Head from "next/head";
import React, { useState, useEffect } from "react";
import MealForm from "./mealForm";

export default function Plan() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/ingredients/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (!data) return <p>No data</p>;

  return (
    <>
      <Head>
        <title>Foods - Plan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Plan</h2>
      <pre>{JSON.stringify(data)}</pre>
      {/* <pre>{ingredientsDataStatic}</pre> */}
      <MealForm></MealForm>
    </>
  );
}
