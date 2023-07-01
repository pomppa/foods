import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormValue } from '../../../interfaces';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const createRecords = (data: {
    ingredients: FormValue[];
    meal_id: string;
  }) => {
    const promises = data.ingredients.map(async (value) => {
      await prisma.meal_Ingredient.create({
        data: {
          ingredient_weight: value.weight,
          meal: {
            connect: {
              id: parseInt(data.meal_id),
            },
          },
          ingredient: {
            connect: {
              id: value.ingredient_id,
            },
          },
        },
      });
      await prisma.$disconnect();
    });
    return Promise.all(promises);
  };

  switch (req.method) {
    case 'POST':
      createRecords(req.body);
      res.status(200).json({ data: req.body });
      break;
    case 'GET':
      res.json(await prisma.meal.findMany());
      await prisma.$disconnect();
  }
  await prisma.$disconnect();
}
