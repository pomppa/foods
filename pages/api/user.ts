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
    res.json({
      ...req.session.user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}
