import { Grid, Typography } from '@mui/material';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from './api/auth/authOptions';

type Props = {
  session: Session;
};
export const getServerSideProps = async function ({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/ingredients/list',
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
const Profile = (props: Props) => {
  const { session } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" mt={2}>
          Your Profile
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="body2">{session.user.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">{session.user.email}</Typography>
      </Grid>
    </Grid>
  );
};

export default Profile;
