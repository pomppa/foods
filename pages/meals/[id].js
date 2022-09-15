import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'


export default function Meals() {
  const router = useRouter()
  const { id } = router.query
  if (!id) {
    return <></>;
  }

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [macros, setMacros] = useState({ meal: 0, kcal: 0, fat: 0, carbs: 0, protein: 0, totalWeight: 0 })

  useEffect(() => {
    setLoading(true)

    if (!id) {
      setLoading(false)

      return;
    }
    fetch('/api/meals/' + id + '/ingredients')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const calculateMacros = (data) => {
    macros.meal = data[0].meal_id
    data.map((value, index) => {
      macros.kcal = parseInt(value.ingredient.kcal) + parseInt(macros.kcal);
      macros.protein = parseInt(value.ingredient.protein) + parseInt(macros.protein);
      macros.carbs = parseInt(value.ingredient.carbs) + parseInt(macros.carbs);
      macros.fat = parseInt(value.ingredient.fat) + parseInt(macros.fat);
      macros.totalWeight = parseInt(value.ingredient_weight) + parseInt(macros.totalWeight)
      console.log(macros)
    })

  }
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>
  calculateMacros(data);
  return (
    <div>
      <Head>
        <title>Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div>
        <h1>Meal ID {id}</h1>
        <p>
          Your meals contents
        </p>
      </div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <div>
        <h2> Your meal macros</h2>
        <span></span>
        <pre>{JSON.stringify(macros, null, 2)}</pre>
      </div>
    </div>
  )
}
