import { configureStore } from "@reduxjs/toolkit";
import redditPostsReducer from "../components/RedditPosts/RedditPostsSlice";
import fullPostReducer from "../components/FullPost/FullPostSlice";
import searchResultsReducer from "../components/SearchResults/SearchResultsSlice";

export default configureStore({
    reducer: {
        redditPosts: redditPostsReducer,
        fullPost: fullPostReducer,
        searchResults: searchResultsReducer
    }
})