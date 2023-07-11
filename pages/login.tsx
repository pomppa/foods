import LoginForm from '../components/forms/loginForm';
import { Grid } from '@mui/material';
import { withSessionSsr } from '../lib/withSession';
import SignupForm from '../components/forms/signupForm';

export const getServerSideProps = withSessionSsr(async function ({ req }) {
  const { user } = req.session;

  if (user) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  // return some object
  return {
    props: { user: null },
  };
});

export default function Login() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} mt={2}>
        <LoginForm />
      </Grid>
      <Grid item xs={12} sm={6} md={6} mt={2}>
        <SignupForm />
      </Grid>
    </Grid>
  );
}
