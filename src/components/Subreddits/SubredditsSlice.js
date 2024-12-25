import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Search queries will look like the link below
// https://www.reddit.com/search.json?q=cake%20recipes

// The URL being used to fetch reddit posts will change depending on whether it's the homme page, a subreddit page, or a search query

export const loadSubreddits = createAsyncThunk(
    "subreddits/loadSubreddits",
    async (arg, thunkApi) => {
        try {
            const response = await fetch(`https://www.reddit.com/subreddits/.json?limit=10`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let jsonResponse;
            try {
                jsonResponse = await response.json();
            } catch (jsonError) {
                throw new Error(`Error parsing JSON response: ${jsonError}`)
            }
            
            return jsonResponse;
        } catch (error) {
            // Use 'rejectWithValue' to return a custom error message to the reducer
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const subredditsSlice = createSlice({
    name: "subreddits",
    initialState: {
        subreddits: null,
        isLoading: false,
        hasError: false,
        errorMessage: "", // Store error message for more feedback
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSubreddits.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(loadSubreddits.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.subreddits = data;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadSubreddits.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.subreddits = null;
                state.errorMessage = action.payload || "Failed to load Subreddits";
            })
    }
})

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const isLoading = (state) => state.subreddits.isLoading;
export const selectErrorMessage = (state) => state.subreddits.errorMessage;

export default subredditsSlice.reducer;