import { configureStore } from '@reduxjs/toolkit';
import productsListReducer from './productsSlice';
import userReducer from './usersSlice';

export const store = configureStore({
    reducer: {
        products: productsListReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch