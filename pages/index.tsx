import Head from 'next/head';
import About from './about';

function Home() {
  return (
    <>
      <Head>
        <title>Foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <About></About>
      </>
    </>
  );
}

export default Home;
