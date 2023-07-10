import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import type { SessionUser } from '../../types';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<SessionUser>) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}
