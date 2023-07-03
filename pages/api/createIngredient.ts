import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function saveMealHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, kcal, fat, carbs, protein } = req.body;

    try {
      const createdIngredient = await prisma.ingredient.create({
        data: {
          name,
          kcal,
          fat,
          carbs,
          protein,
        },
      });
      await prisma.$disconnect();
      res.status(200).json({ ingredient: createdIngredient });
    } catch (error) {
      await prisma.$disconnect();
      res.status(500).json({ error: 'Failed to create ingredient' });
    }
  } else {
    await prisma.$disconnect();
    res.status(405).json({ error: 'Method not allowed' });
  }
}
