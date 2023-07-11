import prisma from '../../../lib/prisma';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const meal = await getMeal(id, user.data.id);

  if (meal.userId !== user.data.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export async function getMeal(id: string | string[], userId: number) {
  const meal = await prisma.meal.findFirst({
    where: {
      id: Number(id),
      userId,
    },
  });

  if (meal.userId !== userId) {
    throw new Error('Unauthorized');
  }

  await prisma.$disconnect();
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
