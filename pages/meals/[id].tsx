import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getMealDataForId } from "../api/meals/[id]/ingredients";
import { getMealIds } from "../api/meals";
import { calculateMacros } from "../../lib/calculator";
import EditMeal from "../../components/editMeal";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const mealIds = await getMealIds();

  const paths = mealIds.map((meal) => ({
    params: { id: meal.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const rawMealDataForId = await getMealDataForId(id);
  const allMealDataForId = JSON.stringify(rawMealDataForId);
  const mealMacros = calculateMacros(allMealDataForId);

  return {
    props: {
      allMealDataForId,
      mealMacros,
    },
  };
};

export default function Meals({ allMealDataForId, mealMacros }) {
  const [mealData, setMealData] = useState(allMealDataForId);
  const [updatedMealMacros, setUpdatedMealMacros] = useState(mealMacros);

  function handleMealChange(mealData: Object) {
    setMealData(mealData);
    const newMealMacros = calculateMacros(JSON.stringify(mealData));
    setUpdatedMealMacros(newMealMacros);
    return mealData;
  }

  const allMealDataForIdObj = JSON.parse(allMealDataForId);
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>Foods - Meal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Meal ID {id}</h1>
        <EditMeal
          meal={allMealDataForIdObj}
          handler={handleMealChange}
        ></EditMeal>
        <div>
          <h2> Meal macros</h2>
          <span></span>
          <pre>{JSON.stringify(updatedMealMacros, null, 2)}</pre>
        </div>
        <div>
          <h2> Meal macro percentages</h2>
          <span></span>
          <pre>{JSON.stringify(mealMacros.macroPercentages, null, 2)}</pre>
        </div>
        <h2>Meal content</h2>
      </div>
      <pre>{JSON.stringify(mealData, null, 2)}</pre>
    </div>
  );
}
