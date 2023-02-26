import prisma from '../../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const mealIngredient = await getMealDataForId(req.query.id);
  res.json({ mealIngredient });
}

export async function getMealDataForId(id) {
  const meal = await prisma.meal_Ingredient.findMany({
    where: {
      meal_id: Number(id),
    },
    include: {
      ingredient: true,
    },
  });

  await prisma.$disconnect();
  return meal;
}
