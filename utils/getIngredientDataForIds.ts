import { Ingredient } from '@prisma/client';
import prisma from '../lib/prisma';
import { IngredientI } from '../types';

/**
 * Converts to supported datatypes and excludes timestamps for meals page
 * @todo move to somewhere else than api route
 * @param ids
 * @returns
 */
export async function getIngredientDataForIds(ids: number[]) {
  const fineliIngredients: Ingredient[] =
    await prisma.fineli_Ingredient.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

  const ingredients: Ingredient[] = await prisma.ingredient.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  /* ids could potentially collide */
  const combinedIngredients: Ingredient[] = [
    ...ingredients,
    ...fineliIngredients,
  ];

  const ingredientsExcluded = combinedIngredients.map((ingredient) =>
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
