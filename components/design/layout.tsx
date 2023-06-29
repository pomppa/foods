import ResponsiveDrawer from './responsive-drawer';
import { Box } from '@mui/system';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Foods</title>
      </Head>
      <ResponsiveDrawer />
      <Box sx={{ ml: '50px', mr: '50px', mb: '50px', maxWidth: 'md' }}>
        <main>{children}</main>
      </Box>
    </>
  );
}
