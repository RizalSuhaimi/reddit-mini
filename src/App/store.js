import { configureStore } from "@reduxjs/toolkit";
import redditPostsReducer from "../components/RedditPosts/RedditPostsSlice";
import fullPostReducer from "../components/FullPost/FullPostSlice";

export default configureStore({
    reducer: {
        redditPosts: redditPostsReducer,
        fullPost: fullPostReducer
    }
})