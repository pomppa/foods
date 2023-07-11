import { PrismaClient } from '@prisma/client';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/withSession';
const prisma = new PrismaClient();

export default withIronSessionApiRoute(handle, sessionOptions);

export async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, kcal, fat, carbs, protein } = req.body;
    const { user } = req.session;

    try {
      const createdIngredient = await prisma.ingredient.create({
        data: {
          name,
          kcal,
          fat,
          carbs,
          protein,
          userId: user?.data.id,
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
