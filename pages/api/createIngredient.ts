import { PrismaClient } from '@prisma/client';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default withIronSessionApiRoute(handle, sessionOptions);

export async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, kcal, fat, carbs, protein } = req.body;
  const { user } = req.session;

  if (!user) {
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
        userId: user.data.id,
      },
    });

    res.status(200).json({ ingredient: createdIngredient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ingredient' });
  } finally {
    await prisma.$disconnect();
  }
}
