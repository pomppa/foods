import { configureStore } from '@reduxjs/toolkit'
import uniqueKeyReducer from './uniqueKeySlice'
import valueUpdated from './valuesSlice'
import macrosAdded  from './macrosSlice'

export const store = configureStore({
    reducer: {
        uniqueKey: uniqueKeyReducer,
        valueUpdated: valueUpdated,
        macrosAdded: macrosAdded
    }
})