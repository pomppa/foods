import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const mealDataForId = await getMealDataForId(req.query.id);
  res.json(mealDataForId)
}

export async function getMealDataForId(id) {
  const meal = await prisma.meal_Ingredient.findMany({
    where: {
      meal_id: Number(id),
    },
    include: {
      ingredient: true
    }
  })

  await prisma.$disconnect()
  return meal;
}
