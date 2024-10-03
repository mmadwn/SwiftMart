import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [], // Load cart items from local storage
    totalPrice: 0,
    totalQuantity: 0,
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
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            // Save updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                // Save updated cart to local storage
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                // Save updated cart to local storage
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            // Clear cart from local storage
            localStorage.removeItem('cart');
        },
        // New action to update product quantities
        updateProductQuantities: (state, action) => {
            const productsToUpdate = action.payload; // Expecting an array of product objects with id and quantity
            productsToUpdate.forEach(product => {
                const existingProduct = state.items.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity -= product.quantity; // Reduce the quantity based on the checkout
                    // Ensure quantity does not go below zero
                    if (existingProduct.quantity < 0) {
                        existingProduct.quantity = 0; // Prevent negative quantities
                    }
                }
            });
            localStorage.setItem('cart', JSON.stringify(state.items)); // Update local storage
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, updateProductQuantities } = cartSlice.actions;
export default cartSlice.reducer;

