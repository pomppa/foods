import prisma from '../../lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(signUpRoute, sessionOptions);

async function signUpRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { username, password } = req.body;

  try {
    const existingUser: User = await prisma.user.findFirst({
      where: {
        name: username,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
      },
    });

    const userWithoutPassword = exclude(user, ['password']);
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user as Omit<User, Key>;
}
