import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import IngredientForm from './ingredientForm'

export default function Ingredients () {  
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/ingredients/')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)

      })
  }, [])
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>
  return(
    <div>
      <Head>
        <title>Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div>
        <h1>View ingredients</h1>
        <p>
          Your ingredients
        </p>
      </div>
      <IngredientForm></IngredientForm>

      <pre>
        { JSON.stringify(data, null, 2) }
      </pre>
    </div>
  )
}
