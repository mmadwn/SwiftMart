import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromPayload } from "../../utils/payload";
import { fetchUserById } from "../../utils/api";
import { setUser as setUserInStorage, removeUser as removeUserFromStorage, getUser as getUserFromStorage } from "../../utils/localStorage";

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (_, { rejectWithValue }) => {
        try {
            const userData = await getUserFromPayload();

            if (userData && userData.sub) {
                const userDetails = await fetchUserById(userData.sub);
                console.log("Fetched user details:", userDetails);
                return userDetails;
            }
            return null;
        } catch (error) {
            console.error("Error in fetchUserData:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: getUserFromStorage(), // Initialize with user data from localStorage
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            setUserInStorage(action.payload); // Store user data in localStorage
        },
        resetUser: (state) => {
            state.user = null;
            removeUserFromStorage(); // Remove user data from localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                setUserInStorage(action.payload); // Store user data in localStorage
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
