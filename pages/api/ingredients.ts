import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newIngredient = req.body;
  switch (req.method) {
    case 'POST':
      // eslint-disable-next-line no-case-declarations
      const ingredient = await prisma.ingredient.create({
        data: {
          name: newIngredient.name,
          kcal: newIngredient.kcal,
          protein: newIngredient.protein,
          fat: newIngredient.fat,
          carbs: newIngredient.carbs,
        },
      });
      // todo maybe error handling just maybe
      res.status(200).json({ ingredient });
      break;
    case 'GET':
      // eslint-disable-next-line no-case-declarations
      const ingredients = await getIngredientsData();
      res.status(200).json({ ingredients });
  }
  await prisma.$disconnect();
}

export async function getIngredientsData() {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });
  return { ingredients };
}
