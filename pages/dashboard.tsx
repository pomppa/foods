import Head from 'next/head';
import Box from '@mui/material/Box';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ flex: 1, px: 35 }}>Dashboard</Box>
    </>
  );
}

export default Dashboard;
