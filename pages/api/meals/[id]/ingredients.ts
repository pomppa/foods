import prisma from '../../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormValue, MealEditInterface } from '../../../../interfaces';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(await getMealDataForId(req.query.id));
      break;
    case 'PUT':
      res.status(200).json(await updateMeal(req.body));
  }
}

export async function getMealDataForId(id) {
  const meal = await prisma.meal_Ingredient.findMany({
    where: {
      meal_id: Number(id),
    },
  });

  const mappedIngredientsArray = meal.map((mealIngredient) => ({
    ...mealIngredient,
    mealIngredientId: mealIngredient.id,
    ingredient_weight: Number(mealIngredient.ingredient_weight),
  }));
  await prisma.$disconnect();
  return mappedIngredientsArray;
}

async function updateMeal(meal: MealEditInterface) {
  await prisma.meal.update({
    where: { id: meal.id },
    data: { name: meal.name },
  });

  const createRecords = (ingredients: FormValue[]) => {
    const promises = ingredients.map(async (ingredient) => {
      await prisma.meal_Ingredient.upsert({
        where: { id: ingredient.mealIngredientId ?? 0 },
        update: {
          ingredient_weight: ingredient.weight,
          ingredient_id: ingredient.ingredient_id,
        },
        create: {
          meal_id: meal.id,
          ingredient_id: ingredient.ingredient_id,
          ingredient_weight: ingredient.weight,
        },
      });
    });
    return Promise.all(promises);
  };
  createRecords(meal.ingredients);

  await prisma.meal_Ingredient.deleteMany({
    where: {
      id: {
        in: meal.deletedMealIngredientIds,
      },
    },
  });

  await prisma.$disconnect();
  return meal;
}
