import { Meal, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function saveMealHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { mealName, formValues } = req.body;

  try {
    const meal: Meal = await prisma.meal.create({
      data: {
        name: mealName,
        formValues: formValues,
      },
    });

    return res.status(200).json({ data: meal });
  } catch (error) {
    console.error('Error saving meal:', error);
    return res.status(500).json({ message: 'Failed to save meal' });
  }
}
