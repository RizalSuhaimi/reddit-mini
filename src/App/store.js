import { configureStore } from "@reduxjs/toolkit";
import redditPostsReducer from "../components/RedditPosts/RedditPostsSlice";
import fullPostReducer from "../components/FullPost/FullPostSlice";
import searchResultsReducer from "../components/SearchResults/SearchResultsSlice";
import subredditsReducer from "../components/Subreddits/SubredditsSlice"

export default configureStore({
    reducer: {
        redditPosts: redditPostsReducer,
        fullPost: fullPostReducer,
        searchResults: searchResultsReducer,
        subreddits: subredditsReducer
    }
})