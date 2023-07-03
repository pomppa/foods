import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id;
  const meal = await getMeal(id);
  res.json(meal);
}

export async function getMeal(id: string | string[]) {
  const meal = await prisma.meal.findUnique({
    where: {
      id: Number(id),
    },
  });
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
