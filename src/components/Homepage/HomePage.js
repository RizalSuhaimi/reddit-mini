import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadRedditPosts,
    selectRedditPosts,
    selectAfter,
    selectErrorMessage,
    isLoading,
    resetState
} from "../RedditPosts/RedditPostsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";

import "bootstrap/dist/css/bootstrap.min.css"

const HomePage = () => {
    console.log("HomePage is rendered")
    const dispatch = useDispatch();
    const location = useLocation();
    const redditPosts = useSelector(selectRedditPosts);
    const after = useSelector(selectAfter);
    const isLoadingRedditPosts = useSelector(isLoading);
    const redditPostsErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(loadRedditPosts({}));
    }, [dispatch]);


    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoadingRedditPosts) {
            return;
        }
        // Dispatch action to load more posts when use scrolls to the bottom
        dispatch(loadRedditPosts({ after }))
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [after, isLoadingRedditPosts, dispatch])


    useEffect(() => {
        return () => {
            dispatch(resetState());
        };
    }, [location, dispatch])

    if (isLoadingRedditPosts & redditPosts.length === 0) { // This needs 2 conditions because we don't want the user to lose scroll progress (start back at the top) when the app is loading for more Reddit posts
        return <div>Content is loading</div>
    } else if (redditPostsErrorMessage) {
        return <div>{redditPostsErrorMessage}</div>
    }

    return (
        <div>
            <h2>Trending in Reddit</h2>
            <RedditPosts redditPosts={redditPosts}/>
            {isLoadingRedditPosts && <div>Loading more posts...</div>}
        </div>
    )
}

export default HomePage;