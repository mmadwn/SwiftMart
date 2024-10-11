import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productsSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/users/userSlice';

// configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;