import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Ingredient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse, // todo type
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { ids } = req.body;

  try {
    const ingredients: Ingredient[] = await prisma.fineli_Ingredient.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res.status(200).json(ingredients);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to fetch ingredient data' });
  }
}
