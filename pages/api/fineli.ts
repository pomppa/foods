import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      // eslint-disable-next-line no-case-declarations
      const ingredients = await getFineliIngredientsData();
      res.json(ingredients);
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
