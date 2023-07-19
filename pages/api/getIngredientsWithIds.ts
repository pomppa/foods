import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Fineli_Ingredient, Ingredient } from '@prisma/client';
import { CombinedIngredient } from '../../types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { ingredientIds } = req.body;

  const session = await getServerSession(req, res, authOptions);

  if (!ingredientIds || ingredientIds.length === 0) {
    return res.status(200).json([]);
  }

  try {
    const fineliIngredients: Fineli_Ingredient[] =
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
        userId: session.user.email,
      },
    });

    /* ids could potentially collide, also todo fix type */
    const combinedIngredients: CombinedIngredient[] = [
      ...ingredients,
      ...fineliIngredients,
    ];

    return res.status(200).json(combinedIngredients);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch ingredient data' });
  }
}
