import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import type { SessionUser } from '../../types';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<SessionUser>,
) {
  res.setHeader('Cache-Control', 'no-store');
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
