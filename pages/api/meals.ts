import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MealInterface } from '../../interfaces';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const meals = await getAllMeals();

  switch (req.method) {
    case 'POST':
      res.status(200).json({ data: await createMeal(req.body.name) });
      break;
    case 'GET':
      res.json({ meals });
      break;
    case 'PUT':
      res.status(200).json({ data: await updateMeal(req.body) });
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

async function updateMeal(meal: MealInterface) {
  return await prisma.meal.update({
    where: { id: meal.id },
    data: { name: meal.name },
  });
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
