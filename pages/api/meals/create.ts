import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const createRecords = (data) => {
        const promises = data.ingredients.map(async (value) => {
          await prisma.meal_Ingredient.create({
            data: {
              ingredient_weight: parseInt(value.weight),
              meal: {
                connect: {
                  id: parseInt(data.meal_id),
                }
              },
              ingredient: {
                connect: {
                  id: parseInt(value.ingredient),
                }
              }
            }
          })
          await prisma.$disconnect()
        });
        return Promise.all(promises);
      }

      createRecords(req.body);
      res.status(200).json({ data: req.body })
      break;
    case 'GET':
      const meals = await prisma.meal.findMany()
      await prisma.$disconnect()
      res.json(meals)
  }
  await prisma.$disconnect()
}


