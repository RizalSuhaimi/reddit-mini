import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Search queries will look like the link below
// https://www.reddit.com/search.json?q=cake%20recipes

// The URL being used to fetch reddit posts will change depending on whether it's the home page, a subreddit page, or a search query

// use r/EducationResource to test out that infinite scroll stops when there are no more posts left

export const runSearch = createAsyncThunk(
    "searchResults/runSearch",
    async ({ searchTerm, searchConstraint, after=null }, thunkApi) => {
        const hasSpecialCharacters = /[^a-zA-Z0-9 /_]/.test(searchTerm)
        const encodedSearchTerm = encodeURIComponent(searchTerm)
        let url
        if (searchConstraint === "posts") {
            url = `https://www.reddit.com/search.json?q=${encodedSearchTerm}`
        } else {
            if (hasSpecialCharacters) {
                return thunkApi.rejectWithValue(`There are no subreddits with special characters (eg. ~ ! @ # $ etc.)`)
            }
            url = `https://www.reddit.com/search.json?q=${encodedSearchTerm}&type=sr`
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let jsonResponse;
            try {
                jsonResponse = await response.json();
            } catch (jsonError) {
                throw new Error(`Error parsing JSON response: ${jsonError}`)
            }
            
            return { jsonResponse, searchTerm, searchConstraint };
        } catch (error) {
            // Use 'rejectWithValue' to return a custom error message to the reducer
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    searchResults: [],
    searchTerm: "",
    searchConstraint: "",
    after: null,
    gotAllResults: false,
    isLoading: false,
    hasError: false,
    errorMessage: "", // Store error message for more feedback
}

export const searchResultsSlice = createSlice({
    name: "searchResults",
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(runSearch.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(runSearch.fulfilled, (state, action) => {
                const { data } = action.payload.jsonResponse;
                state.searchResults = data.children;
                state.searchTerm = action.payload.searchTerm;
                state.searchConstraint = action.payload.searchConstraint;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(runSearch.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.searchResults = [];
                state.searchTerm = "";
                state.searchConstraint = "";
                state.errorMessage = action.payload || "Failed to run the search";
            })
    }
})

export const selectSearchResults = (state) => state.searchResults.searchResults;
export const selectSearchTerm = (state) => state.searchResults.searchTerm;
export const selectSearchConstraint = (state) => state.searchResults.searchConstraint;
export const isLoading = (state) => state.searchResults.isLoading;
export const selectErrorMessage = (state) => state.searchResults.errorMessage;

export default searchResultsSlice.reducer;

const mockSubredditsSearchResults = {
    data: {
        after: "t1",
        before: "s1",
        children: [
            {
                data: {
                    id: "1hbtcy9",
                    title: "Post your old recipes here - things from old books, family recipes, old pamphlets, etc..",
                    display_name: "pics",
                    display_name_prefixed: "r/pics",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    permalink: "/r/pics/comments/1hbtcy9/wanted_posters_of_healthcare_ceos_are_starting_to/",
                    secure_media: { // Need to check if has value
                        reddit_video: { // Need to check if has value
                            fallback_url: "https://v.redd.it/hpab42naxm6e1/DASH_96.mp4" // Need to check if has value
                            }
                        },
                    url: "https://i.redd.it/hccvvac88o6e1.jpeg", // Need to check if has value, and if it's a .jpeg/.png file
                    url_overridden_by_dest: "https://i.redd.it/hccvvac88o6e1.jpeg" // Need to check if has value, and if it's a .jpeg/.png file
                },
            },

            {
                data: {
                    id: "1hccdac",
                    title: "Post your old recipes here - things from old books, family recipes, old pamphlets, etc..",
                    display_name: "Bolehland",
                    display_name_prefixed: "r/Bolehland",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    permalink: "/r/Bolehland/comments/1hccdac/rounding_should_be_illegal/",
                },
            },
            
            {
                data: {
                    id: "1hccrsn",
                    title: "Post your old recipes here - things from old books, family recipes, old pamphlets, etc..",
                    display_name: "cats",
                    display_name_prefixed: "r/cats",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    permalink: "/r/cats/comments/1hccrsn/neighbors_threw_cat_outside_in_10f_weather/",
                },
            },
        
        ]
    }
}

const mockPostsSearchResults = {
    data: {
        after: "t1",
        before: "s1",
        children: [
            {
                data: {
                    id: "1hbtcy9",
                    name: "b1",
                    title: "Wanted posters of healthcare CEOs are starting to pop up in NYC",
                    subreddit: "pics",
                    subreddit_name_prefixed: "r/pics",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
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

            {
                data: {
                    id: "1hccdac",
                    name: "b2",
                    title: "Rounding should be illegal",
                    subreddit: "Bolehland",
                    subreddit_name_prefixed: "r/Bolehland",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    upvotes: 22,
                    num_comments: 12,
                    permalink: "/r/Bolehland/comments/1hccdac/rounding_should_be_illegal/",
                    created: 73737374
                },
            },
            
            {
                data: {
                    id: "1hccrsn",
                    name: "b3",
                    title: "Neighbors threw cat outside in 10f weather",
                    subreddit: "cats",
                    subreddit_name_prefixed: "r/cats",
                    thumbnail: "https://b.thumbs.redditmedia.com/C695qg-mo9aY9rqLeBc5Z-9nwijyLCVN7rpkAr7MmWM.jpg",
                    upvotes: 23,
                    num_comments: 13,
                    permalink: "/r/cats/comments/1hccrsn/neighbors_threw_cat_outside_in_10f_weather/",
                    created: 73737375
                },
            },
        
        ]
    }
}