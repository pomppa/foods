import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { IngredientI } from '../../types';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const ingredients: IngredientI[] = await prisma.fineli_Ingredient.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    });

    return res.status(200).json(ingredients);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch ingredient data' });
  }
}
