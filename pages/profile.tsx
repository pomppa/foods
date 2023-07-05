import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../lib/session';
import { Grid, Typography } from '@mui/material';

export const getServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    const { user } = req.session;

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: { user },
    };
  },
  { ...sessionOptions },
);

const Profile = ({ user }) => {
  console.log(user);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" mt={2}>
          Your Profile
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Grid>
    </Grid>
  );
};

export default Profile;
