import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadFullPost = createAsyncThunk(
    "fullPost/loadFullPost",
    async ({ subreddit, postId, postTitle}, thunkApi) => {
        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}/${postTitle}/.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            // Use 'rejectWithValue' to return a custom error message to the reducer
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const fullPostSlice = createSlice({
    name: "fullPost",
    initialState: {
        fullPost: null,
        isLoading: false,
        hasError: false,
        errorMessage: "", // Store error message for more feedback
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadFullPost.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(loadFullPost.fulfilled, (state, action) => {
                state.fullPost = action.payload
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadFullPost.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.fullPost = null;
                state.errorMessage = action.payload || "Failed to load Reddit post";
            })
    }
})

export const selectFullPost = (state) => state.fullPost.fullPost;
export const isLoading = (state) => state.fullPost.isLoading;
export const selectErrorMessage = (state) => state.fullPost.errorMessage;

export default fullPostSlice.reducer;



const mockRedditPost = [
    {
        kind: "Listing",
        data: {
            after: "t1",
            before: "s1",
            children: [ // This is the main post
                {
                    data: {
                        id: "1hbtcy9",
                        name: "b1",
                        title: "Wanted posters of healthcare CEOs are starting to pop up in NYC",
                        subreddit: "pics",
                        subreddit_name_prefixed: "r/pics",
                        thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                        selftext: "This is the main content of the full bloody post that I want everybody on the internet right now to read with full attention. Give comment after you have finished reading",
                        upvotes: 21,
                        num_comments: 11,
                        permalink: "/r/pics/comments/1hbtcy9/wanted_posters_of_healthcare_ceos_are_starting_to/",
                        created: 73737373,
                        secure_media: { // Need to check if has value
                            reddit_video: { // Need to check if has value
                                fallback_url: "https://v.redd.it/hpab42naxm6e1/DASH_96.mp4" // Need to check if has value
                                }
                            },
                        total_awards_received: 1,
                        url: "https://i.redd.it/hccvvac88o6e1.jpeg", // Need to check if has value, and if it's a .jpeg/.png file
                        url_overridden_by_dest: "https://i.redd.it/hccvvac88o6e1.jpeg" // Need to check if has value, and if it's a .jpeg/.png file
                    },
                },
            ]
        }
    },
    {
        kind: "Listing",
        data: {
            children: [ // Comments are in here
                {
                    kind: "t1",
                    data: {
                        id: "c1",
                        author: "Spirited-Ad6144",
                        body: "NTA. Your son is just looking for excuses not to be a father.",
                        replies: {},
                        score: 164
                    }
                },
                {
                    kind: "t1",
                    data: {
                        id: "c1",
                        author: "Spirited-Ad6144",
                        body: "NTA. Your son is just looking for excuses not to be a father.",
                        replies: {},
                        score: 164
                    }
                },
            ]
        }
    }
]