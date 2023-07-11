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
  const { id, name, kcal, fat, carbs, protein } = req.body;
  // todo session?
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
