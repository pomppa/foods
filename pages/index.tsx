import Head from 'next/head';
import Dashboard from './dashboard';

function Home() {
  return (
    <>
      <Head>
        <title>Foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Dashboard></Dashboard>
      </>
    </>
  );
}

export default Home;
