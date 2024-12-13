import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loadRedditPosts = createAsyncThunk(
    "posts/loadRedditPosts",
    async () => {
        const response = await fetch('https://www.reddit.com/top/.json');
        const jsonResponse = await response.json();
        return jsonResponse;
    }
);

const redditPostsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: {},
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRedditPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadRedditPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadRedditPosts.pending, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.posts = {};
            })
    }
})

export const selectPosts = (state) => state.posts.posts;
export const isLoading = (state) => state.posts.isLoading;

export default redditPostsSlice.reducer;