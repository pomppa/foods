import prisma from '../../lib/prisma';
import { Ingredient } from '@prisma/client';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id, name, kcal, fat, carbs, protein, userId } = req.body;

  if (!user || userId !== user.data.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const updatedIngredient: Ingredient = await prisma.ingredient.update({
      where: { id: id },
      data: { name, kcal, fat, carbs, protein },
    });

    await prisma.$disconnect();
    return res.status(200).json({ ingredient: updatedIngredient });
  } catch (error) {
    await prisma.$disconnect();
    return res.status(500).json({ message: 'Failed to update ingredient' });
  }
}
