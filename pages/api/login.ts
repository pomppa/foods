import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/withSession';
import type { User } from './user';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { username } = req.body;

  try {
    const user = {
      isLoggedIn: username ? true : false,
      login: username,
    } as User;

    req.session.user = {
      isLoggedIn: username ? true : false,
      login: username,
    };
    await req.session.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
