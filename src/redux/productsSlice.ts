import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Product } from '../utils/dataStructure';

const arrayProducts: Product[] = [];

const initialState = {
    productsList: arrayProducts,
};

export const productsListSlice = createSlice({
    name: 'productsList',
    initialState,
    reducers: {
        setAllProducts: (state, action: PayloadAction<Product[]>) => {
            state.productsList = state.productsList.concat(action.payload);
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            const lastId = state.productsList[state.productsList.length - 1].id;
            action.payload.id = lastId + 1;
            state.productsList = state.productsList.concat(action.payload);
        },
        modifyProduct: (state, action: PayloadAction<Product>) => {
            const index = state.productsList.findIndex(product => product.id === action.payload.id);
            state.productsList[index] = {
                id: action.payload.id,
                price: action.payload.price,
                title: action.payload.title,
                category: action.payload.category,
                description: action.payload.description,
                image: action.payload.image,
                rating: action.payload.rating,
            };
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const index = state.productsList.findIndex(product => product.id === action.payload);
            state.productsList.splice(index, 1);
        },
    },
});

export const { setAllProducts, addProduct, modifyProduct, deleteProduct } = productsListSlice.actions;
export const productsList = (state: RootState) => state.products;
export default productsListSlice.reducer;