import { Box, Button, Grid, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps = async function ({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function Login() {
  const handleSignIn = async () => {
    await signIn();
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} mt={2}>
        <Typography variant="h5">Sign in</Typography>
        <Box mt={3}>
          <Button variant="contained" onClick={handleSignIn}>
            Authenticate
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
