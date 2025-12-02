// NOTE: This file uses ES module `import` and JSX-compatible code. Do NOT run it directly with `node`.
// Start the frontend via your dev server (e.g. `npm run dev` / `npm start`) so the bundler/transpiler handles imports and JSX.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
}
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            const payload = action.payload;
            const id = (typeof payload === "string") ? payload : (payload && payload._id);
            const qtyToAdd = Math.max(1, Number(payload?.qty ?? 1) || 1);
            const itemData = (payload && payload._id) ? payload : null;

            if (!id) return; // invalid payload

            const exist = state.cartItems.find(y => y._id === id);

            if (exist) {
                state.cartItems = state.cartItems.map(y =>
                    y._id === id ? { ...y, qty: (Number(y.qty) || 0) + qtyToAdd } : y
                );
            } else if (itemData) {
                // only push when we have item details (title/price/etc.)
                state.cartItems.push({ ...itemData, qty: qtyToAdd });
            }
            // if no itemData and not existing, do nothing (prevents adding incomplete items)
        },
        RemoveFromCart: (state, action) => {
            const payload = action.payload;
            const id = (typeof payload === "string") ? payload : (payload && payload._id);
            const qtyToRemove = Math.max(1, Number(payload?.qty ?? 1) || 1);

            if (!id) return;

            const exist = state.cartItems.find(y => y._id === id);
            if (!exist) return;

            if ((Number(exist.qty) || 0) > qtyToRemove) {
                state.cartItems = state.cartItems.map(y =>
                    y._id === id ? { ...y, qty: (Number(y.qty) || 0) - qtyToRemove } : y
                );
            } else {
                state.cartItems = state.cartItems.filter(y => y._id !== id);
            }
        },
        ClearCart: (state) => {
            state.cartItems = [];
        },
        UpdateQty: (state, action) => {
            const payload = action.payload;
            const id = (typeof payload === "string") ? payload : (payload && payload._id);
            const qty = Number(payload?.qty);

            if (!id || Number.isNaN(qty)) return;

            const exist = state.cartItems.find(y => y._id === id);
            if (!exist) return;

            const newQty = Math.floor(qty);
            if (newQty <= 0) {
                state.cartItems = state.cartItems.filter(y => y._id !== id);
            } else {
                state.cartItems = state.cartItems.map(y => y._id === id ? { ...y, qty: newQty } : y);
            }
        }
    }
})

export const { AddToCart, RemoveFromCart, ClearCart, UpdateQty } = CartSlice.actions;
export default CartSlice.reducer;