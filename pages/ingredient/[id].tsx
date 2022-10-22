import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Ingredient() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  async function fetchData() {
    const { id } = router.query;
    if (!id) {
      return;
    }
    fetch('/api/ingredients/' + id)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <Head>
        <title>Food - Ingredient</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>View ingredient</h1>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
