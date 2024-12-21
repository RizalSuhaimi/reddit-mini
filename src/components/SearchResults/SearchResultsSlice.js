import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Search queries will look like the link below
// https://www.reddit.com/search.json?q=cake%20recipes

// The URL being used to fetch reddit posts will change depending on whether it's the homme page, a subreddit page, or a search query

export const runSearch = createAsyncThunk(
    "searchResults/runSearch",
    async ({searchTerm, searchConstraint}, thunkApi) => {
        try {
            const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
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
            console.log(error)
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const searchResultsSlice = createSlice({
    name: "searchResults",
    initialState: {
        searchResults: null,
        searchTerm: "",
        isLoading: false,
        hasError: false,
        errorMessage: "", // Store error message for more feedback
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(runSearch.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(runSearch.fulfilled, (state, action) => {
                state.searchResults = action.payload
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(runSearch.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.searchResults = null;
                state.errorMessage = action.payload || "Failed to load Reddit posts";
            })
    }
})

export const selectSearchResults = (state) => state.searchResults.searchResults;
export const isLoading = (state) => state.searchResults.isLoading;
export const selectErrorMessage = (state) => state.searchResults.errorMessage;

export default searchResultsSlice.reducer;