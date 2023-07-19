import prisma from '../../../lib/prisma';
import { MealI } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMeal } from '../getMeal/[id]';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const mealId = String(req.query.id);
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const meal = await getMeal(mealId, session.user.id);

    //todo
    if (meal.userId !== session.user.id) {
      throw new Error('No such meal for user');
    }
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }

  try {
    const meal = await updateMeal(mealId, req.body);
    res.status(200).json({ data: meal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update meal' });
  }
}

async function updateMeal(mealId: string, meal: MealI) {
  return await prisma.meal.update({
    where: { id: parseInt(mealId) },
    data: {
      name: meal.name,
      formValues: meal.formValues,
    },
  });
}
