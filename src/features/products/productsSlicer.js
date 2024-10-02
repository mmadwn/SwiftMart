import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../utils/api";

// Async thunk to fetch all products
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetchProducts(); // Fetch all products
        console.log(response); // Log the response to check its structure
        return response.map(product => ({ ...product, quantity: 20 })); // Adjust based on response structure
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
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProductQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const product = state.allProducts.find(p => p.id === productId);
            if (product) {
                product.quantity = quantity;
            }
        },
        filterWomensProducts: (state) => {
            state.womensProducts = state.allProducts.filter(product => product.category === "women's clothing");
        },
        filterMensProducts: (state) => {
            state.mensProducts = state.allProducts.filter(product => product.category === "men's clothing");
        },
        filterJewelry: (state) => {
            state.jewelryProducts = state.allProducts.filter(product => product.category === "jewelry");
        },
        filterElectronics: (state) => {
            state.electronicsProducts = state.allProducts.filter(product => product.category === "electronics");
        },
        limitProducts: (state, action) => {
            const limit = action.payload;
            state.limitedProducts = state.allProducts.slice(0, limit);
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.allProducts = action.payload;
                state.mensProducts = action.payload.filter(product => product.category === "men's clothing");
                state.womensProducts = action.payload.filter(product => product.category === "women's clothing");
                state.jewelryProducts = action.payload.filter(product => product.category === "jewelry");
                state.electronicsProducts = action.payload.filter(product => product.category === "electronics");
                state.loading = false;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { 
    updateProductQuantity, 
    filterWomensProducts, 
    filterMensProducts, 
    filterJewelry, 
    filterElectronics, 
    limitProducts, 
    setAllProducts 
} = productsSlice.actions;

export default productsSlice.reducer;
