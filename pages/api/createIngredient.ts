import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, kcal, fat, carbs, protein } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const createdIngredient = await prisma.ingredient.create({
      data: {
        name,
        kcal,
        fat,
        carbs,
        protein,
        userId: session.user.id,
      },
    });

    res.status(200).json({ ingredient: createdIngredient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ingredient' });
  } finally {
    await prisma.$disconnect();
  }
}
