
import { createSlice } from '@reduxjs/toolkit'

const valuesSlice = createSlice({
    name: 'values',
    initialState: [{ ingredient: 0, weight: 0, uniqueKey: 0 }],
    reducers: {
        valueAdded(state, action) {
            state.push(action.payload)
        },
        valueUpdated(state, action) {
            switch (action.payload.case) {
                case "DELETE":
                    return state.filter(value => value.uniqueKey !== action.payload.data.uniqueKey)
                case "UPDATE":
                    const { ingredient, weight, uniqueKey } = action.payload.data
                    const existingValue = state.find(value => value.uniqueKey === uniqueKey)
                    if (existingValue) {
                        if (ingredient) {
                            existingValue.ingredient = ingredient
                        }
                        if (weight) {
                            existingValue.weight = weight
                        }
                        existingValue.uniqueKey = uniqueKey
                    }
                    break;
                default:
                    return state;
            }
        }
    }
})

export const { valueUpdated, valueAdded } = valuesSlice.actions
export default valuesSlice.reducer