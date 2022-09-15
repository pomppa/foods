import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { id } = req.query
  const meal = await prisma.Meal_Ingredient.findMany({
    where: {
      meal_id: parseInt(id),
    },
    include: {
      ingredient: true
    }
  })
  await prisma.$disconnect()
  res.json(meal)
}
