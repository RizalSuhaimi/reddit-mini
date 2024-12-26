import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
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

const Subreddit = () => {
    // The API fetch function was executed onClick, so it's unnecessary to dispatch loadRedditPosts immediately upon rendering this component

    const dispatch = useDispatch();
    const location = useLocation();
    const redditPosts = useSelector(selectRedditPosts);
    const after = useSelector(selectAfter);
    const isLoadingRedditPosts = useSelector(isLoading);
    const redditPostsErrorMessage = useSelector(selectErrorMessage);
    const { subreddit } = useParams();


    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoadingRedditPosts) {
            return;
        }
        // Dispatch action to load more posts when use scrolls to the bottom
        dispatch(loadRedditPosts({ subreddit, after }))
    };

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
            <div>
                <p>PH subreddit icon</p>
                <h2>r/{subreddit}</h2>
            </div>
            <RedditPosts redditPosts={redditPosts} />
            {isLoadingRedditPosts && <div>Loading more posts...</div>}
        </div>
    )
}

export default Subreddit;