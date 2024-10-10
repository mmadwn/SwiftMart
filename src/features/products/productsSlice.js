import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../utils/api";

// Async thunk to fetch all products
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async (_, { getState, rejectWithValue }) => {
        try {
            const response = await fetchProducts();
            const currentState = getState().products;
            return response.map(product => {
                const existingProduct = currentState.allProducts.find(p => p.id === product.id);
                return {
                    ...product,
                    quantity: existingProduct ? existingProduct.quantity : 20
                };
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
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
            const productsToUpdate = action.payload;
            productsToUpdate.forEach(product => {
                const existingProduct = state.allProducts.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity = Math.max(existingProduct.quantity - product.quantity, 0); // Prevent negative quantities
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
                state.loading = true;
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                const filterByCategory = (category) => action.payload.filter(product => product.category === category);

                state.allProducts = action.payload;
                state.mensProducts = filterByCategory("men's clothing");
                state.womensProducts = filterByCategory("women's clothing");
                state.jewelryProducts = filterByCategory("jewelery");
                state.electronicsProducts = filterByCategory("electronics");
                state.loading = false;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});


export const {
    setSelectedProduct, // Export the new action
    updateProductQuantities
} = productsSlice.actions;

export default productsSlice.reducer;
