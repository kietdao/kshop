import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductList: (state, action) => {
            state.products = action.payload
        },
    }
})

export const { getProductList } = productsSlice.actions

export default productsSlice.reducer