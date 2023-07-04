import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Ingredient } from '@prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { ingredientIds } = req.body;

  if (!ingredientIds || ingredientIds.length === 0) {
    return res.status(200).json([]);
  }

  try {
    const fineliIngredients: Ingredient[] =
      await prisma.fineli_Ingredient.findMany({
        where: {
          id: {
            in: ingredientIds,
          },
        },
      });

    const ingredients: Ingredient[] = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ingredientIds,
        },
      },
    });

    /* ids could potentially collide */
    const combinedIngredients: Ingredient[] = [
      ...ingredients,
      ...fineliIngredients,
    ];

    return res.status(200).json(combinedIngredients);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch ingredient data' });
  }
}
