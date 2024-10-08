import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../utils/api";

// Async thunk to fetch all products
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async (_, { getState }) => {
        const response = await fetchProducts(); // Fetch all products
        const currentState = getState().products;
        return response.map(product => {
            //Check if the product already exists in the current state
            const existingProduct = currentState.allProducts.find(p => p.id === product.id);
            return {
                ...product,
                quantity: existingProduct ? existingProduct.quantity : 20
            };
        });
    }
);

const initialState = {
    mensProducts: [],
    womensProducts: [],
    jewelryProducts: [],
    electronicsProducts: [],
    allProducts: [],
    limitedProducts: [],
    loading: false,
    error: null,
    selectedProduct: null, // Add selectedProduct to hold the currently viewed product
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProductQuantities: (state, action) => {
            const productsToUpdate = action.payload; // Expecting an array of product objects with id and quantity
            productsToUpdate.forEach(product => {
                const existingProduct = state.allProducts.find(item => item.id === product.id); // Change from state.items to state.allProducts
                if (existingProduct) {
                    existingProduct.quantity -= product.quantity; // Reduce the quantity based on the checkout
                    // Ensure quantity does not go below zero
                    if (existingProduct.quantity < 0) {
                        existingProduct.quantity = 0; // Prevent negative quantities
                    }
                }
            });
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload; // Set the selected product based on ID
        },
        // setAllProducts: (state, action) => {
        //     state.allProducts = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.loading = true; // Set loading to true when fetching
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.allProducts = action.payload; // Set all products in the state
                state.mensProducts = action.payload.filter(product => product.category === "men's clothing");
                state.womensProducts = action.payload.filter(product => product.category === "women's clothing");
                state.jewelryProducts = action.payload.filter(product => product.category === "jewelery");
                state.electronicsProducts = action.payload.filter(product => product.category === "electronics");
                state.loading = false; // Set loading to false when done
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.loading = false; // Set loading to false on error
                state.error = action.error.message; // Set error message
            })
    }
});


export const { 
    setSelectedProduct, // Export the new action
    updateProductQuantities 
} = productsSlice.actions;

export default productsSlice.reducer;
