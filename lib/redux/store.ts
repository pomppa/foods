import { configureStore } from '@reduxjs/toolkit';
import uniqueKeyReducer from './uniqueKeySlice';
import valueUpdated from './valuesSlice';

export const store = configureStore({
  reducer: {
    uniqueKey: uniqueKeyReducer,
    valueUpdated: valueUpdated,
  },
});
