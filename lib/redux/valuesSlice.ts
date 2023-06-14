import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
  deletedKeys: [],
  deletedMealIngredientIds: [],
};

const valuesSlice = createSlice({
  name: 'values',
  initialState: initialState,
  reducers: {
    valueAdded(state, action) {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            ...action.payload,
          },
        ],
      };
    },
    valueUpdated(state, action) {
      const { ingredient, weight, uniqueKey } = action.payload.data;
      console.log(action.payload.data);
      const existingValue = state.ingredients.find(
        (value) => value.uniqueKey === uniqueKey,
      );
      const existingIndex = state.ingredients.findIndex(
        (value) => value.uniqueKey === uniqueKey,
      );
      switch (action.payload.case) {
        case 'DELETE':
          //todo remove with existingValue?
          return {
            ...state,
            ingredients: state.ingredients.filter(
              (item) => item.uniqueKey !== uniqueKey,
            ),
            deletedKeys: [...state.deletedKeys, uniqueKey],
            deletedMealIngredientIds: [
              ...state.deletedMealIngredientIds,
              existingValue.mealIngredientId ?? 0,
            ],
          };
        case 'UPDATE':
          if (existingValue) {
            return {
              ...state,
              ingredients: [
                ...state.ingredients.slice(0, existingIndex),
                {
                  ingredient: ingredient ?? existingValue.ingredient,
                  weight: weight ?? existingValue.weight,
                  mealIngredientId: existingValue.mealIngredientId,
                  uniqueKey: uniqueKey,
                },
                ...state.ingredients.slice(existingIndex + 1),
              ],
            };
          }
          return state;
        case 'INSERT':
          if (!existingValue && !state.deletedKeys.includes(uniqueKey)) {
            console.log('inserting');
            return {
              ...state,
              ingredients: [...state.ingredients, { ...action.payload.data }],
            };
          }
          break;
        default:
          return state;
      }
    },
  },
});

export const { valueUpdated, valueAdded } = valuesSlice.actions;
export default valuesSlice.reducer;
