import { createSlice } from '@reduxjs/toolkit';

const macrosSlice = createSlice({
  name: 'macros',
  initialState: {
    kcal: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    totalWeight: 0,
    kcalPerMacro: {
      protein: 0,
      carbs: 0,
      fat: 0,
      total: 0,
    },
    macroPercentages: {
      protein: 0,
      carbs: 0,
      fat: 0,
      total: 0,
    },
  },
  reducers: {
    macrosAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { macrosAdded } = macrosSlice.actions;
export default macrosSlice.reducer;
