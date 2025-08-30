import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../compounds/cart/CartSlice.jsx";

const Store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

export default Store;