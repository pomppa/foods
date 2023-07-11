import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { IngredientI } from '../../types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/withSession';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  try {
    const fineliIngredients: IngredientI[] =
      await prisma.fineli_Ingredient.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: [
          {
            updated_at: 'desc',
          },
        ],
      });

    if (!user) {
      return res.status(200).json(fineliIngredients);
    }

    const ingredients: IngredientI[] = await prisma.ingredient.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        userId: user?.id,
      },
      orderBy: [
        {
          updated_at: 'desc',
        },
      ],
    });

    /* ids could potentially collide */
    const combinedIngredients: IngredientI[] = [
      ...ingredients,
      ...fineliIngredients,
    ];

    return res.status(200).json(combinedIngredients);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch ingredient data' });
  }
}
