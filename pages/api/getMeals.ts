import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const meals = await getAllMeals();

  switch (req.method) {
    case 'GET':
      res.json({ meals });
      break;
  }
}

export async function getAllMeals() {
  const meals = await prisma.meal.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  });

  await prisma.$disconnect();
  return excludeProperties(meals, ['created_at', 'updated_at']);
}

function excludeProperties<Meal, Key extends keyof Meal>(
  meals: Meal[],
  keys: Key[],
): Omit<Meal, Key>[] {
  return meals.map((meal) => exclude(meal, keys));
}

function exclude<Meal, Key extends keyof Meal>(
  meal: Meal,
  keys: Key[],
): Omit<Meal, Key> {
  for (const key of keys) {
    delete meal[key];
  }
  return meal as Omit<Meal, Key>;
}
