import prisma from '../../lib/prisma';
import { Ingredient } from '@prisma/client';
import { IngredientI } from '../../types';

/**
 * Converts to supported datatypes and excludes timestamps for meals page
 * @todo move to somewhere else than api route
 * @param ids
 * @returns
 */
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
