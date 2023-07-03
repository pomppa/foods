import prisma from '../../../lib/prisma';
import { MealI } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const mealId = String(req.query.id);
  try {
    const updatedMeal = await updateMeal(mealId, req.body);

    res.status(200).json({ data: updatedMeal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update meal' });
  }
}

async function updateMeal(mealId: string, meal: MealI) {
  return await prisma.meal.update({
    where: { id: parseInt(mealId, 10) },
    data: {
      name: meal.name,
      formValues: meal.formValues,
    },
  });
}
