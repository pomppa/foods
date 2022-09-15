import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getMealDataForId } from '../api/meals/[id]/ingredients';
import { calculateMacroPercentages, calculateMacros } from '../../lib/calculator';
// todo make it dynamic
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '20' } }],
    fallback: false, //  todo check true || 'blocking'
  }
}

export async function getStaticProps() {
  const rawMealDataForId = await getMealDataForId(20);
  const allMealDataForId = JSON.stringify(rawMealDataForId);
  const mealMacros = calculateMacros(allMealDataForId);
  //const mealMacroPercentages = calculateMacroPercentages(mealMacros)
  return {
    props: {
      allMealDataForId,
      mealMacros
    },
  }
}

export default function Meals({ allMealDataForId, mealMacros }) {
  let allMealDataForIdObj = JSON.parse(allMealDataForId);
  const router = useRouter()
  const { id } = router.query
  if (!id) {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div>
        <h1>Meal ID {id}</h1>
        <div>
          <h2> Meal macros</h2>
          <span></span>
          <pre>{JSON.stringify(mealMacros, null, 2)}</pre>
        </div>
        <div>
          <h2> Meal macro percentages</h2>
          <span></span>
          <pre>{JSON.stringify(mealMacros.macroPercentages, null, 2)}</pre>
        </div>
        <h2>
          Meal content
        </h2>
      </div>
      <pre>
        {JSON.stringify(allMealDataForIdObj, null, 2)}
      </pre>

    </div>
  )
}
