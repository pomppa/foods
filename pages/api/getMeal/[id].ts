import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/authOptions';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const meal = await getMeal(id, session.user.id);

  if (!meal) {
    return res.status(404).json({ message: 'Not found' });
  }

  if (meal.userId !== session.user.id) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ meal });
}

export async function getMeal(id: string | string[], userId: string) {
  const meal = await prisma.meal.findFirst({
    where: {
      id: id as string,
      userId,
    },
  });
  return exclude(meal, ['created_at', 'updated_at']);
}

function exclude<Meal, Key extends keyof Meal>(
  meal: Meal,
  keys: Key[],
): Omit<Meal, Key> {
  for (const key of keys) {
    delete meal[key];
  }
  return meal;
}

export default handle;
