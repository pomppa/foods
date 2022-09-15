import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  switch (req.method) {
    case 'POST':
      await prisma.meal.create({
        data: {
          name: req.body.name,
        },
      })
      res.status(200).json({ data: req.body })
      const mealId = data.mealId
      console.log('mealId created' + mealId)
      await prisma.$disconnect()

      break;
    case 'GET':
      const meals = await prisma.meal.findMany()
      await prisma.$disconnect()
      res.json(meals)
  }
  await prisma.$disconnect()

}

