import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { IngredientI } from '../../types';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const fineliIngredients: IngredientI[] =
      await prisma.fineli_Ingredient.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: [
          {
            updated_at: 'desc',
          },
        ],
      });

    const ingredients: IngredientI[] = await prisma.ingredient.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: [
        {
          updated_at: 'desc',
        },
      ],
    });

    /* ids could potentially collide */
    const combinedIngredients: IngredientI[] = [
      ...ingredients,
      ...fineliIngredients,
    ];

    return res.status(200).json(combinedIngredients);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch ingredient data' });
  }
}
