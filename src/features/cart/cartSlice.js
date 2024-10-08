import { createSlice } from "@reduxjs/toolkit";
import { getCart, setCart } from "../../utils/localStorage";

const initialState = {
    items: getCart(), // Load cart items from local storage
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload); // Ensure this is an object with the correct structure
            }
            // Save updated cart to local storage
            setCart(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            // Save updated cart to local storage
            setCart(state.items);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                // Save updated cart to local storage
                setCart(state.items);
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                // Save updated cart to local storage
                setCart(state.items);
            }
        },
        clearCart: (state) => {
            state.items = [];
            // Clear cart from local storage
            clearCart();
        },       
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

