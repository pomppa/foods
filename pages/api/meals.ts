import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      res.status(200).json({ data: await createMeal(req.body.name) });
      break;
    case 'GET':
      // eslint-disable-next-line no-case-declarations
      const meals = await getAllMeals();
      res.json(meals);
      break;
  }
}

export async function getAllMeals() {
  const meals = await prisma.meal.findMany();
  await prisma.$disconnect();
  return meals;
}

async function createMeal(name) {
  const meal = await prisma.meal.create({
    data: {
      name: name,
    },
  });
  await prisma.$disconnect();
  return meal;
}

export async function getMealIds() {
  const mealIds = await prisma.meal.findMany({
    select: {
      id: true,
    },
  });
  await prisma.$disconnect();
  return mealIds;
}
