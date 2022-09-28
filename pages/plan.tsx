import Head from "next/head";
import PlanMealForm from "../components/forms/plan-meal";
import { getIngredientsData } from "./api/ingredients";

export async function getServerSideProps() {
  // Fetch data from external API
  const data = await getIngredientsData();
  const jsonData = JSON.stringify(data);

  // Pass data to the page via props
  return { props: { jsonData } };
}

export default function Plan({ jsonData }) {
  const data = JSON.parse(jsonData);
  return (
    <>
      <Head>
        <title>Foods - Plan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Plan</h2>
      {typeof jsonData}
      {typeof data}
      <pre>{jsonData}</pre>
      <PlanMealForm data={data} jsonData={jsonData}></PlanMealForm>
    </>
  );
}
