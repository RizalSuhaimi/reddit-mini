import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ROUTES from "../../App/Routes";
import {
    loadFullPost
} from "../FullPost/FullPostSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const RedditPosts = ({fetchResponse}) => {
    const dispatch = useDispatch();

    return (
        <>
            {fetchResponse ? 
                <ul>
                    {fetchResponse.data.children.map((post) => (
                        <li key={post.data.id}>
                            <Link 
                                to={ROUTES.fullPostRoute(post.data.subreddit, post.data.id, post.data.title)}
                                aria-label={`Read the full Reddit post: ${post.data.title}`}
                                onClick={() => dispatch(loadFullPost({
                                    subreddit: post.data.subreddit,
                                    postId: post.data.id,
                                    postTitle: post.data.title
                                }))}>
                                    {post.data.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                :
                <p>Content is loading</p>
            }
        </>
    )
}

export default RedditPosts;