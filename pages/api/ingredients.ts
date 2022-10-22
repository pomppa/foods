import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      await prisma.ingredient.create({
        data: {
          name: req.body.name,
          kcal: req.body.kcal,
          protein: req.body.protein,
          fat: req.body.fat,
          carbs: req.body.carbs,
        },
      });
      res.status(200).json({ data: 'data' });
      await prisma.$disconnect();

      break;
    case 'GET':
      // eslint-disable-next-line no-case-declarations
      const ingredients = await getIngredientsData();
      res.json(ingredients);
  }
}

export async function getIngredientsData() {
  const ingredients = await prisma.ingredient.findMany();
  return ingredients;
}
