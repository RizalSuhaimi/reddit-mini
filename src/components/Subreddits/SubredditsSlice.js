import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import filterRepeatingElements from "../../utils/filterRepeatingElements";

// The URL being used to fetch reddit posts will change depending on whether it's the home page, a subreddit page, or a search query

export const loadSubreddits = createAsyncThunk(
    "subreddits/loadSubreddits",
    async ({ after=null }, thunkApi) => {
        try {
            const response = await fetch(`https://www.reddit.com/subreddits/.json${after ? `?after=${after}` : ""}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("loadSubreddits fetch called")
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

const initialState = {
    subreddits: [],
    after: null,
    gotAllSubreddits: false,
    isLoading: false,
    hasError: false,
    errorMessage: "", // Store error message for more feedback
}

export const subredditsSlice = createSlice({
    name: "subreddits",
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSubreddits.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(loadSubreddits.fulfilled, (state, action) => {
                const { data } = action.payload;

                // This prevents the user from seeing the same subreddit more than once
                const filteredData = filterRepeatingElements(state.subreddits, data.children);

                // This is needed to stop inifinite scrolling once all possible results are retrieved
                if (filteredData.length === 0) {
                    state.gotAllSubreddits = true;
                } else {
                    state.gotAllSubreddits = false;
                }

                state.subreddits = [...state.subreddits, ...filteredData];
                state.after = data.after;
                state.isLoading = false;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(loadSubreddits.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.subreddits = [];
                state.errorMessage = action.payload || "Failed to load Subreddits";
            })
    }
})

export const { resetState } = subredditsSlice.actions;

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectAfter = (state) => state.subreddits.after;
export const gotAllSubreddits = (state) => state.subreddits.gotAllSubreddits;
export const isLoading = (state) => state.subreddits.isLoading;
export const selectErrorMessage = (state) => state.subreddits.errorMessage;

export default subredditsSlice.reducer;