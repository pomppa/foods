import { withIronSessionSsr } from 'iron-session/next';
import type { User } from './api/user';
import { sessionOptions } from '../lib/session';

type Props = {
  user?: User;
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;
    if (user === undefined || !user.isLoggedIn) {
      res.setHeader('location', '/login');
      res.statusCode = 302;
      res.end();
      return {
        props: {
          user: { isLoggedIn: false },
        },
      };
    }

    return {
      props: {
        user: req.session.user,
      },
    };
  },
  { ...sessionOptions },
);

function Admin(props: Props) {
  const { user } = props;
  return (
    <>
      <span>{JSON.stringify(user, null, 2)}</span>
    </>
  );
}

export default Admin;
