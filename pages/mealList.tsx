import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
export default function MealList() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/meals/')
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
      <ul>
        {data.map((value, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
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
