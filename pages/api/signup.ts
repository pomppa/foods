import prisma from '../../lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/withSession';
import bcrypt from 'bcrypt';

export default withIronSessionApiRoute(signUpRoute, sessionOptions);

async function signUpRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ name: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
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
