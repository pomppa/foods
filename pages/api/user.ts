import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
export default withIronSessionApiRoute(userRoute, sessionOptions);

export type UserResponse = {
  isLoggedIn: boolean;
  user?: User;
};
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
