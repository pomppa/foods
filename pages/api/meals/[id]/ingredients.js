import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { id } = req.query
  const mealDataForId = await getMealDataForId(id);
  res.json(mealDataForId)
}

export async function getMealDataForId(id) {
  const meal = await prisma.Meal_Ingredient.findMany({
    where: {
      meal_id: parseInt(id),
    },
    include: {
      ingredient: true
    }
  })

  await prisma.$disconnect()
  return meal;
}
