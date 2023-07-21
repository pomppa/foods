import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const fineliIngredients = await prisma.fineli_Ingredient.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    let combinedIngredients = fineliIngredients;

    const session = await getServerSession(req, res, authOptions);

    if (session) {
      const ingredients = await prisma.ingredient.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          userId: session.user.id,
        },
        orderBy: {
          updated_at: 'desc',
        },
      });

      combinedIngredients = [...ingredients, ...fineliIngredients];
    }

    return res.status(200).json(combinedIngredients);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch ingredient data' });
  }
}
