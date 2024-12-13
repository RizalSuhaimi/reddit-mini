import { configureStore } from "@reduxjs/toolkit";
import redditPostsReducer from "../components/Posts/RedditPostsSlice";

export default configureStore({
    reducer: {
        redditPosts: redditPostsReducer,
    }
})