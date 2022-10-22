import Head from 'next/head';
import PlanForm from '../components/forms/plan';

import { getIngredientsData } from './api/ingredients';

export async function getServerSideProps() {
  const data = await getIngredientsData();
  const jsonData = JSON.stringify(data);

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
      {/* <PlanMealForm data={data}></PlanMealForm> */}
      <PlanForm data={data}></PlanForm>
    </>
  );
}
