import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ROUTES from "../../App/Routes";
import {
    loadRedditPosts
} from "../RedditPosts/RedditPostsSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const Subreddits = ({ fetchResponse, calledFrom }) => {
    const dispatch = useDispatch();

    if (calledFrom === "Root") {
        return (
            <>
                {fetchResponse ? 
                    <ul>
                        {fetchResponse.data.children.map((subreddit) => (
                            <li key={subreddit.data.id}>
                                <Link 
                                    to={ROUTES.subredditRoute(subreddit.data.display_name)}
                                    aria-label={`Go to the ${subreddit.data.display_name} subreddit`}
                                    onClick={() => dispatch(loadRedditPosts({
                                        subreddit: subreddit.data.display_name
                                }))}>
                                    <div>
                                        <p>PH subreddit icon</p>
                                        <h3>{subreddit.data.display_name_prefixed}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    :
                    <p>Content unavailable</p>
                }
            </>
        )
    } else if (calledFrom === "SearchResults") {
        return (
            <>
                {fetchResponse ? 
                    <ul>
                        {fetchResponse.data.children.map((subreddit) => (
                            <li key={subreddit.data.id}>
                                <Link 
                                    to={ROUTES.subredditRoute(subreddit.data.display_name)}
                                    aria-label={`Go to the ${subreddit.data.display_name} subreddit`}
                                    onClick={() => dispatch(loadRedditPosts({
                                        subreddit: subreddit.data.display_name
                                }))}>
                                    <div>
                                        <p>PH subreddit icon</p>
                                        <h3>{subreddit.data.display_name_prefixed}</h3>
                                        <p>{subreddit.data.title}</p>
                                        <p>Subcribers: {subreddit.data.subscribers}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    :
                    <p>Content unavailable</p>
                }
            </>
        )
    }
}

export default Subreddits;