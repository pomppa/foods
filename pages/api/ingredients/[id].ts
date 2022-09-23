import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: Number(req.query.id),
    }
  })
  res.json(ingredient)
}
