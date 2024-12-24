import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes"
import { useDispatch, useSelector } from "react-redux";
import { 
    loadRedditPosts,
    selectRedditPosts,
    selectErrorMessage,
    isLoading
} from "../RedditPosts/RedditPostsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";

const Subreddit = () => {
    return (
        <>
            <h2>r/Bolehland</h2>
        </>
    )
}

export default Subreddit;