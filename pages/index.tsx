import Head from 'next/head';
import Main from './main';

function Home() {
  return (
    <>
      <Head>
        <title>Foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Main></Main>
      </>
    </>
  );
}

export default Home;
