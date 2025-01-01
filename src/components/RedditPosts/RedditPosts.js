import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ROUTES from "../../App/Routes";
import {
    loadFullPost
} from "../FullPost/FullPostSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import "./RedditPosts.css";

const RedditPosts = ({redditPosts}) => {
    const dispatch = useDispatch();

    return (
        <>
            <ul
                className="
                    my-2
                    list-group
                    list-unstyled
                "
            >
                {redditPosts.map((post) => (
                    <>
                            <Link 
                                to={ROUTES.fullPostRoute(post.data.permalink)}
                                aria-label={`Read the full Reddit post: ${post.data.title}`}
                                onClick={() => dispatch(loadFullPost(post.data.permalink))}
                                className="
                                    text-white
                                    text-decoration-none
                                "
                            >
                                <li 
                                    key={post.data.id}
                                    className="
                                        rounded
                                        py-2 px-3
                                        my-1
                                        redditPost
                                    "
                                >
                                    <p style={{color: "rgb(200, 200, 200)"}}>{post.data.subreddit_name_prefixed}</p>
                                    <h3>{post.data.title}</h3>
                                    <p>PH thumbnail</p>
                                    <p>Score: {post.data.score}</p>
                                    <p>Comments: {post.data.num_comments}</p>
                                    <p>Awards: {post.data.total_awards_received}</p>
                                </li>
                            </Link>
                        <div className="border-top"></div>
                    </>
                ))}
            </ul>
        </>
    )
}

export default RedditPosts;