import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'


export default function Ingredient() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  const { id } = router.query




  useEffect((id) => {
    setLoading(true)

    if (!id) {
      setLoading(false)
      return;
    }
    fetch('/api/ingredients/' + id)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)

      })
  }, [])

  if (!id) return <p>No ID</p>;
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <div>
      <Head>
        <title>Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div>
        <h1>View meals</h1>
        <p>
          Your meals
        </p>
      </div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}