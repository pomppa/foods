import prisma from '../../../lib/prisma';
import { MealI } from '../../../types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const mealId = String(req.query.id);
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const updatedMeal = await updateMeal(mealId, req.body);

    res.status(200).json({ data: updatedMeal });
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
