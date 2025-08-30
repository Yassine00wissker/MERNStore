import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
}
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            const item = action.payload;
            const exist = state.cartItems.find(y => y._id === item._id);

            if (exist) {
                state.cartItems = state.cartItems.map(y => y._id === item._id ? { ...y, qty: y.qty + 1 } : y)
            }
            else state.cartItems.push({ ...item, qty: 1 })
        },
        RemoveFromCart: (state, action) => {
            const item = action.payload;
            const exist = state.cartItems.find(y => y._id === item._id);

            if (exist) {
                state.cartItems = state.cartItems.filter(y => y._id !== item._id);
            }
        },
        ClearCart: (state) => {
            state.cartItems = [];
        },
        UpdateQty: (state, action) => {
            const { id, qty } = action.payload;
            const exist = state.cartItems.find(y => y._id === id);

            if (exist) {
                state.cartItems = state.cartItems.map(y => y._id === id ? { ...y, qty } : y);
            }
        }
    }
})

export const { AddToCart, RemoveFromCart, ClearCart, UpdateQty } = CartSlice.actions;
export default CartSlice.reducer;