import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  isLoggedin?: boolean;
};

export type UserResponse = {
  isLoggedIn: boolean;
  user?: User;
};

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>,
) {
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
