import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.json(await findUniqueIngredient(req.query.id));
}

/**
 * Find unique ingredient with ID
 * @param id ingredient id
 * @returns
 */
export async function findUniqueIngredient(id: string | string[]) {
  return await prisma.ingredient.findUnique({
    where: {
      id: Number(id),
    },
  });
}
