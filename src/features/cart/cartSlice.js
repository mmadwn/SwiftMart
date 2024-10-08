import { createSlice } from "@reduxjs/toolkit";
import { getCart, setCart, removeCart } from "../../utils/localStorage";

const initialState = {
    items: getCart(), // Load cart items from local storage
    loading: false, // Add loading state
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
            setCart(state.items); // Save updated cart to local storage
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            setCart(state.items); // Save updated cart to local storage
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
            removeCart(); // Clear cart from local storage
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;

