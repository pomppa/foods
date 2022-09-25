import Head from "next/head";
import Box from "@mui/material/Box";

function Home() {
  return (
    <>
      <Head>
        <title>Foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ flex: 1, px: 35 }}>Foods</Box>
    </>
  );
}

export default Home;
