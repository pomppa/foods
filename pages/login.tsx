import LoginForm from '../components/forms/loginForm';
import { Grid } from '@mui/material';
import { withSessionSsr } from '../lib/withSession';

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
      <LoginForm />
    </Grid>
  );
}
