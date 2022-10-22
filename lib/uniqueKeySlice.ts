import { createSlice } from '@reduxjs/toolkit';

const uniqueKeySlice = createSlice({
  name: 'uniqueKey',
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
  },
});

export const { incremented } = uniqueKeySlice.actions;
export default uniqueKeySlice.reducer;
