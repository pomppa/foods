import { Box, Button, Grid, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { Paper } from '@mui/material';
import { GitHub, Google } from '@mui/icons-material';

type Providers = {
  github: Provider;
  google: Provider;
};

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  const providers: Providers = await getProviders();

  return {
    props: { providers },
  };
};

export default function Login({ providers }) {
  console.log(providers);

  const handleSignIn = async (provider) => {
    await signIn(provider, {
      callbackUrl: '/profile',
    });
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={6}>
        <Paper elevation={3} sx={{ borderRadius: '8px' }}>
          <Box p={4} mt={2}>
            <Typography variant="h5" textAlign="center">
              Sign in to Foods
            </Typography>
            <Typography variant="body2" mt={4} textAlign="center">
              By signing in, you can save your planned meals and easily access
              them later.
            </Typography>
            <Typography variant="body2" mt={2} textAlign="center">
              Additionally, you&apos;ll have the ability to add your own food
              items.
            </Typography>
            <Box mt={3} textAlign="center">
              {Object.values(providers).map((provider: Provider) => (
                <Button
                  key={provider.id}
                  variant="outlined"
                  onClick={() => handleSignIn(provider.id)}
                  sx={{ mt: 2 }}
                  startIcon={provider.id === 'github' ? <GitHub /> : <Google />}
                >
                  Sign in with {provider.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
