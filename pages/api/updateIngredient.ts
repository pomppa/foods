import { Ingredient, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, name, kcal, fat, carbs, protein } = req.body;

  try {
    const updatedIngredient: Ingredient = await prisma.ingredient.update({
      where: { id },
      data: { name, kcal, fat, carbs, protein },
    });

    await prisma.$disconnect();
    return res.status(200).json({ ingredient: updatedIngredient });
  } catch (error) {
    await prisma.$disconnect();
    return res.status(500).json({ message: 'Failed to update ingredient' });
  }
}
