import LoginForm from '../components/forms/loginForm';
import { Grid } from '@mui/material';
import { sessionOptions } from '../lib/session';
import { withIronSessionSsr } from 'iron-session/next';

export const getServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    const { user } = req.session;

    if (user) {
      return {
        redirect: {
          destination: '/profile',
          permanent: false,
        },
      };
    }

    return {
      props: { user: null },
    };
  },
  { ...sessionOptions },
);

export default function Login({ user }) {
  console.log(user);
  return (
    <Grid container spacing={2}>
      <LoginForm />
    </Grid>
  );
}
