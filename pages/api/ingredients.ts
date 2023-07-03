import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Ingredient } from '@prisma/client';
import { IngredientI } from '../../types';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newIngredient = req.body;
  switch (req.method) {
    case 'POST':
      res.status(200).json(
        await prisma.ingredient.create({
          data: {
            name: newIngredient.name,
            kcal: newIngredient.kcal,
            protein: newIngredient.protein,
            fat: newIngredient.fat,
            carbs: newIngredient.carbs,
          },
        }),
      );
      break;
    case 'GET':
      res.status(200).json(await getIngredientsData());
  }
  await prisma.$disconnect();
}

/**
 *
 * @returns IngredientI[]
 */
export async function getIngredientsData() {
  const ingredients: Ingredient[] = await prisma.fineli_Ingredient.findMany({
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });

  const ingredientsExcluded = ingredients.map((ingredient) =>
    exclude(ingredient, ['created_at', 'updated_at']),
  );

  const cleanedIngredients: IngredientI[] = ingredientsExcluded.map(
    (ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      kcal: ingredient.kcal.toNumber(),
      protein: ingredient.protein.toNumber(),
      carbs: ingredient.carbs.toNumber(),
      fat: ingredient.fat.toNumber(),
    }),
  );
  return cleanedIngredients;
}

export async function getIngredientDataForIds(ids: number[]) {
  const ingredients: Ingredient[] = await prisma.fineli_Ingredient.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const ingredientsExcluded = ingredients.map((ingredient) =>
    exclude(ingredient, ['created_at', 'updated_at']),
  );

  const cleanedIngredients: IngredientI[] = ingredientsExcluded.map(
    (ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      kcal: ingredient.kcal.toNumber(),
      protein: ingredient.protein.toNumber(),
      carbs: ingredient.carbs.toNumber(),
      fat: ingredient.fat.toNumber(),
    }),
  );
  return cleanedIngredients;
}

function exclude<Ingredient, Key extends keyof Ingredient>(
  ingredient: Ingredient,
  keys: Key[],
): Omit<Ingredient, Key> {
  for (const key of keys) {
    delete ingredient[key];
  }

  return ingredient;
}

export async function getIngredientsWithSelect(): Promise<IngredientI[]> {
  const ingredients: IngredientI[] = await prisma.fineli_Ingredient.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });

  return ingredients;
}
