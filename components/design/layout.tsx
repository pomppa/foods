import PersistentDrawerLeft from './persistentDrawerLeft';
import { Box } from '@mui/system';
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';

export default function Layout({ children }) {
  const theme = useTheme();
  console.log('Theme Mode on Layout:', theme.palette.mode);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Head>
        <title>Foods</title>
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <PersistentDrawerLeft />
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: 3,
          mr: 3,
          mb: 3,
          maxWidth: 'md',
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.background.default,
          py: 2,
          textAlign: 'center',
        }}
      >
        Footer
      </Box>
    </Box>
  );
}
