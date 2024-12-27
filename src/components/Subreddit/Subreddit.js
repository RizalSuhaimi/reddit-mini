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
import handleInfiniteScroll from "../../utils/handleInfiniteScroll";

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


    const handleScroll = handleInfiniteScroll(dispatch, isLoadingRedditPosts, loadRedditPosts, "loadRedditPosts", { after });

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [after, isLoadingRedditPosts, dispatch])

    useEffect(() => {
        return () => {
            dispatch(resetState());
        };
    }, [location, dispatch])

    // This needs 2 conditions because we don't want the user to lose scroll progress (start back at the top) when the app is loading for more Reddit posts
    const initialLoading = isLoadingRedditPosts && redditPosts.length === 0;

    return (
        <div>
            <div>
                <p>PH subreddit icon</p>
                <h2>r/{subreddit}</h2>
            </div>
            {initialLoading && <div>Content is loading</div>}  

            {redditPostsErrorMessage && <div>{redditPostsErrorMessage}</div>}

            {redditPosts.length > 0 && <RedditPosts redditPosts={redditPosts}/>}
            
            {isLoadingRedditPosts && <div>Loading more posts...</div>}
        </div>
    )
}

export default Subreddit;