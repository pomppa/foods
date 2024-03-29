import { Fineli_Ingredient, Ingredient } from '@prisma/client';
import prisma from './prisma';
import { CombinedIngredient, IngredientI } from '../types';

/**
 * Converts to supported datatypes and excludes timestamps for meals page
 * @param ids
 * @returns
 */
export async function getIngredientDataForIds(ids: string[]) {
  const fineliIngredients: Fineli_Ingredient[] =
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
  const combinedIngredients: CombinedIngredient[] = [
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
