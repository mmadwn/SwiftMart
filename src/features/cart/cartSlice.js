import { createSlice } from "@reduxjs/toolkit";
import { setCart, getCart } from "../../utils/localStorage";

const initialState = {
    items: getCart(), // Load initial cart from local storage
    totalPrice: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity; // Update quantity if item exists
            } else {
                state.items.push(item); // Add new item
            }
            setCart(state.items); // Save updated cart to local storage
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId); // Remove item
            setCart(state.items); // Save updated cart to local storage
        },
        clearCart: (state) => {
            state.items = [];
            setCart(state.items); // Clear cart in local storage
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

