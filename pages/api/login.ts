import prisma from '../../lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/withSession';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { login, password } = req.body;

  try {
    const user: User | null = await prisma.user.findFirst({
      where: {
        OR: [
          { name: login }, // Check if username matches
          { email: login }, // Check if email matches
        ],
      },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.user = {
          isLoggedIn: true,
          ...user,
        };
        await req.session.save();
        res.json({
          ...user,
          isLoggedIn: true,
        });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
