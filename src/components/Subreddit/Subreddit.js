import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
    selectRedditPosts,
    selectErrorMessage,
    isLoading
} from "../RedditPosts/RedditPostsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";

import "bootstrap/dist/css/bootstrap.min.css"

const Subreddit = () => {
    // The API fetch function was executed onClick, so it's unnecessary to dispatch loadRedditPosts in this file

    const redditPosts = useSelector(selectRedditPosts);
    const isLoadingRedditPosts = useSelector(isLoading);
    const redditPostsErrorMessage = useSelector(selectErrorMessage);
    const { subreddit } = useParams();

    if (isLoadingRedditPosts) {
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
            <RedditPosts fetchResponse={redditPosts} />
        </div>
    )
}

export default Subreddit;