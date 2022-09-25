import Head from "next/head";
import React, { useState, useEffect } from "react";
import { getMealDataForId } from "./api/meals/[id]/ingredients";
import Link from "next/link";
export default function MealList() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  async function getMealDetails(id) {
    console.log("getmealdetails" + id);
    //const mealData = await getMealDataForId(id);
  }

  useEffect(() => {
    fetch("/api/meals/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <>
      <Head>
        <title>Foods - Meal List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Meal List</h2>
      <pre>{JSON.stringify(data)}</pre>
      <label> select a meal</label>
      <select onChange={(e) => getMealDetails(e.target.value)}>
        <option>Select</option>

        {data.map((value, index) => {
          return <option value={value.id}>{value.name}</option>;
        })}
      </select>
      <ul>
        {data.map((value, index) => {
          return (
            <li>
              <Link href={`/meals/${value.id}`}>{value.name}</Link>
            </li>
          );
        })}
      </ul>
      {/* <pre>{ingredientsDataStatic}</pre> */}
      {/* <MealForm></MealForm> */}
    </>
  );
}
