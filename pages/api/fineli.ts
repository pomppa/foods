import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ingredients = await getFineliIngredientsData();
  switch (req.method) {
    case 'GET':
      res.json(ingredients);
      break;
  }
}

/**
 * Return all Fineli ingredients
 * @returns
 */
export async function getFineliIngredientsData() {
  const ingredients = await prisma.fineli_Ingredient.findMany({
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });
  return { ingredients };
}
