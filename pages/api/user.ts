import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  login?: string;
};

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    console.log('userRoute', req.session.user);
    res.json({
      ...req.session.user,
    });
  } else {
    console.log('userRoute no user');

    res.json({
      isLoggedIn: false,
    });
  }
}
