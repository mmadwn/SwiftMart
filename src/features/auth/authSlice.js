import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, setToken, removeToken } from "../../utils/localStorage";
import { loginUser } from "../../utils/api";

export const loginUserAsync = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const data = await loginUser(username, password);
            return { token: data.token, user: { username } };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    token: getToken(),
    isAuthenticated: !!getToken(),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            removeToken();
        },
        resetError: (state) => {
            state.error = null; // Reset error state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                setToken(action.payload.token);
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer;
