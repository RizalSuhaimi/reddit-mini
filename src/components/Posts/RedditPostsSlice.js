import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadRedditPosts = createAsyncThunk(
    "redditPosts/loadRedditPosts",
    async (arg, thunkApi) => {
        try {
            const response = await fetch('https://www.reddit.com/top/.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            // Use 'rejestWithValue' to return a custom error message to the reducer
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const redditPostsSlice = createSlice({
    name: "redditPosts",
    initialState: {
        redditPosts: {},
        isLoading: false,
        hasError: false,
        errorMessage: "", // Store error message for more feedback
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRedditPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(loadRedditPosts.fulfilled, (state, action) => {
                state.redditPosts = action.payload
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadRedditPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.redditPosts = {};
                state.errorMessage = action.payload || "Failed to load Reddit posts";
            })
    }
})

export const selectRedditPosts = (state) => state.redditPosts.redditPosts;
export const isLoading = (state) => state.redditPosts.isLoading;
export const selectErrorMessage = (state) => state.redditPosts.errorMessage;

export default redditPostsSlice.reducer;