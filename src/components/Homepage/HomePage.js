import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadRedditPosts,
    selectRedditPosts,
    selectErrorMessage,
    isLoading
} from "../RedditPosts/RedditPostsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";

import "bootstrap/dist/css/bootstrap.min.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const redditPosts = useSelector(selectRedditPosts)
    const isLoadingRedditPosts = useSelector(isLoading);
    const redditPostsErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(loadRedditPosts());
    }, [dispatch]);

    if (isLoadingRedditPosts) {
        return <div>Content is loading</div>
    } else if (redditPostsErrorMessage) {
        return <div>{redditPostsErrorMessage}</div>
    }

    return (
        <div>
            <h2>Trending in Reddit</h2>
            <RedditPosts fetchResponse={redditPosts}/>
        </div>
    )
}

export default HomePage;