import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //todo
  const meal = await getMeal(id, parseInt(session.user.email));

  if (!meal) {
    return res.status(404).json({ message: 'Not found' });
  }

  // todo
  if (meal.userId !== session.user.email) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ meal });
}

//todo
export async function getMeal(id: string | string[], userId) {
  const meal = await prisma.meal.findFirst({
    where: {
      id: Number(id),
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
