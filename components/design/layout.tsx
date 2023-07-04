import PersistentDrawerLeft from './persistentDrawerLeft';
import { Box } from '@mui/system';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Foods</title>
      </Head>
      <PersistentDrawerLeft />
      <Box sx={{ ml: '20px', mr: '20px', maxWidth: 'md' }}>
        <main>{children}</main>
      </Box>
    </>
  );
}
