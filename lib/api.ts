export async function getIngredientDataForIds(ids: number[]) {
  const response = await fetch('/api/getIngredientDataForIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch ingredient data');
  }

  const ingredients = await response.json();
  return ingredients;
}
