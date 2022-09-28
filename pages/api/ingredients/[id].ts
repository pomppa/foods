import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const ingredient = await findUniqueIngredient(req.query.id)
  res.json(ingredient)
}

export async function findUniqueIngredient(id) {
  return await prisma.ingredient.findUnique({
    where: {
      id: Number(id),
    }
  })
}