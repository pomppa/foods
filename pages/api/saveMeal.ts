import prisma from '../../lib/prisma';
import { Meal } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/authOptions';
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { mealName, formValues } = req.body;

  try {
    const meal: Meal = await prisma.meal.create({
      data: {
        name: mealName,
        formValues: formValues,
        userId: session.user.id,
      },
    });

    return res.status(200).json({ data: meal });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save meal' });
  }
}
