import { configureStore } from '@reduxjs/toolkit'

import songReducer from "./reducers/songSlice"

export const store = configureStore({
    reducer: {
        song: songReducer
    }
})