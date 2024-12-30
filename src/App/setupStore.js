// This function is meant for testing purposes only

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import redditPostsReducer from "../components/RedditPosts/RedditPostsSlice";
import fullPostReducer from "../components/FullPost/FullPostSlice";

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    redditPosts: redditPostsReducer,
    fullPost: fullPostReducer
})
export default function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}