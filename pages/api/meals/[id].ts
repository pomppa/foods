import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  const meal = await prisma.meal.findUnique({
    where: {
      id: Number(id),
    }
  })
  await prisma.$disconnect()
  res.json(meal)
}
