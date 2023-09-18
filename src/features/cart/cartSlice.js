import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    numberItems: null,
    warnMsg: null,
    succMsg: null
}

const cartItems = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, actions) => {
            if(cartItems.some(item => item.id === actions.payload.id)) {
                state.succMsg = null
                state.warnMsg = 'This product is available in the cart. Please visit your cart to choose suitable quantity'
            } else {
                cartItems.push({...actions.payload, quantity: 1})
                state.succMsg = `${actions.payload.title} is added`
                state.warnMsg = null
            }
            state.numberItems = cartItems.length
            state.cart = [...cartItems]
        },
        deleteItem: (state, actions) => {
            cartItems.splice(actions.payload, 1)
            state.numberItems = cartItems.length
            state.cart = [...cartItems]
        },
        editQuantity: (state, actions) => {
            const newCartList = JSON.parse(JSON.stringify(cartItems))
            newCartList[actions.payload.itemId].quantity = actions.payload.newQuantity
            cartItems.splice(actions.payload.itemId, 1, newCartList[actions.payload.itemId])
            state.cart = [...cartItems]
        },
        resetCart: (state, actions) => {
            const emptyCart = []
            state.cart = emptyCart
            state.numberItems = null
        }
    }
})

export const { addToCart, deleteItem, editQuantity, resetCart } = cartSlice.actions

export default cartSlice.reducer