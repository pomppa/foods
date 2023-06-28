import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Ingredient } from '@prisma/client';
import { IngredientI } from '../../interfaces';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newIngredient = req.body;
  switch (req.method) {
    case 'POST':
      // todo maybe error handling just maybe
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

export async function getIngredientsData() {
  const ingredients: Ingredient[] = await prisma.ingredient.findMany({
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

export async function getIngredientData(id: number) {
  return await prisma.ingredient.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getIngredientDataForIds(ids: number[]) {
  const ingredients: Ingredient[] = await prisma.ingredient.findMany({
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
