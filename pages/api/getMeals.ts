import prisma from '../../lib/prisma';

export async function getAllMeals(userId) {
  const meals = await prisma.meal.findMany({
    orderBy: {
      updated_at: 'desc',
    },
    where: {
      userId,
    },
  });

  await prisma.$disconnect();
  return excludeProperties(meals, ['created_at', 'updated_at']);
}

function excludeProperties<Meal, Key extends keyof Meal>(
  meals: Meal[],
  keys: Key[],
): Omit<Meal, Key>[] {
  return meals.map((meal) => exclude(meal, keys));
}

function exclude<Meal, Key extends keyof Meal>(
  meal: Meal,
  keys: Key[],
): Omit<Meal, Key> {
  for (const key of keys) {
    delete meal[key];
  }
  return meal as Omit<Meal, Key>;
}
