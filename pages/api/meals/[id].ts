import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

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
