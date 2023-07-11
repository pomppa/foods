import prisma from '../../lib/prisma';
import { Meal } from '@prisma/client';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { mealName, formValues } = req.body;
  const { user } = req.session;

  try {
    const meal: Meal = await prisma.meal.create({
      data: {
        name: mealName,
        formValues: formValues,
        userId: user?.id,
      },
    });

    await prisma.$disconnect();
    return res.status(200).json({ data: meal });
  } catch (error) {
    await prisma.$disconnect();
    return res.status(500).json({ message: 'Failed to save meal' });
  }
}
