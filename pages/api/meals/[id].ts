import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id;

  const meal = findUniqueMealWithId(id);
  await prisma.$disconnect();

  res.json(meal);
}

export async function findUniqueMealWithId(id) {
  return await prisma.meal.findUnique({
    where: {
      id: Number(id),
    },
  });
}
