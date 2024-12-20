import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes";

import "bootstrap/dist/css/bootstrap.min.css"

const RedditPosts = ({redditPosts}) => {

    return (
        <>
            {redditPosts ? 
                <ul>
                    {redditPosts.data.children.map((post) => (
                        <li key={post.data.id}>
                            <Link to={ROUTES.fullPostRoute(post.data.subreddit, post.data.id, post.data.title)} >
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