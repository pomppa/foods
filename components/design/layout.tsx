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
      <Box sx={{ ml: 3, mr: 3, mb: 3, maxWidth: 'md' }}>
        <main>{children}</main>
      </Box>
    </>
  );
}
