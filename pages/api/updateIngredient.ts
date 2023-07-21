import prisma from '../../lib/prisma';
import { Ingredient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/authOptions';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id, name, kcal, fat, carbs, protein } = req.body;

  const ingredientToUpdate = await prisma.ingredient.findFirst({
    where: { id: id, userId: session.user.id },
  });

  if (!ingredientToUpdate) {
    return res.status(404).json({ message: 'Not found' });
  }

  try {
    const updatedIngredient: Ingredient = await prisma.ingredient.update({
      where: { id: id },
      data: { name, kcal, fat, carbs, protein },
    });

    return res.status(200).json({ ingredient: updatedIngredient });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update ingredient' });
  }
}
