import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  try {
    const fineliIngredients = await prisma.fineli_Ingredient.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    let combinedIngredients = fineliIngredients;

    if (user) {
      const ingredients = await prisma.ingredient.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          userId: user.data.id,
        },
        orderBy: {
          updated_at: 'desc',
        },
      });

      combinedIngredients = [...ingredients, ...fineliIngredients];
    }

    return res.status(200).json(combinedIngredients);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch ingredient data' });
  } finally {
    await prisma.$disconnect();
  }
}
