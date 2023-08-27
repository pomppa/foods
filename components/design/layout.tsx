import PersistentDrawerLeft from './persistentDrawerLeft';
import { Box } from '@mui/system';
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

export default function Layout({ children }) {
  const theme = useTheme();
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
          backgroundColor: theme.palette.primary.main,
          py: 2,
          textAlign: 'center',
          color: theme.palette.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: '0.1rem',
          fontSize: '0.75rem',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/privacy" passHref>
            <a
              style={{
                color: 'inherit',
                textDecoration: 'none',
                margin: '0 10px',
              }}
            >
              Privacy Policy
            </a>
          </Link>
          <Link href="/terms" passHref>
            <a
              style={{
                color: 'inherit',
                textDecoration: 'none',
                margin: '0 10px',
              }}
            >
              Terms and Conditions
            </a>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
