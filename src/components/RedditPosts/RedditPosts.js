import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ROUTES from "../../App/Routes";
import {
    loadFullPost
} from "../FullPost/FullPostSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const RedditPosts = ({redditPosts}) => {
    const dispatch = useDispatch();

    return (
        <>
            <ol>
                {redditPosts.map((post) => (
                    <li key={post.data.id}>
                        <Link 
                            to={ROUTES.fullPostRoute(post.data.permalink)}
                            aria-label={`Read the full Reddit post: ${post.data.title}`}
                            onClick={() => dispatch(loadFullPost(post.data.permalink))}
                        >
                            <div>
                                {/* <p>PH subreddit icon</p>
                                
                                <p>u/{post.data.author}</p> */}
                                <p>{post.data.subreddit_name_prefixed}</p>
                                <h3>{post.data.title}</h3>
                                {/* <p>PH thumbnail</p>
                                <p>Score: {post.data.score}</p>
                                <p>Comments: {post.data.num_comments}</p>
                                <p>Awards: {post.data.total_awards_received}</p> */}
                            </div>
                        </Link>
                    </li>
                ))}
            </ol>
        </>
    )
}

export default RedditPosts;