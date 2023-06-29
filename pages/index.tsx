import Head from 'next/head';
import Dashboard from './dashboard';
import Plan from './plan';

function Home() {
  return (
    <>
      <Head>
        <title>Foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Plan></Plan>
      </>
    </>
  );
}

export default Home;
