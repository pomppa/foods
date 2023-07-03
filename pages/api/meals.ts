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
  const meals = await prisma.meal.findMany();
  await prisma.$disconnect();
  return meals;
}
