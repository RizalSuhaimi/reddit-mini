import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../App/Routes";
import {
    loadRedditPosts
} from "../RedditPosts/RedditPostsSlice";
import { 
    loadSubreddits,
    selectSubreddits,
    isLoading,
    selectErrorMessage
} from "./SubredditsSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const Subreddits = (props) => {
    const dispatch = useDispatch();
    const { calledFrom } = props;

    let subreddits = [];
    subreddits = props.subreddits || useSelector(selectSubreddits)

    const isLoadingSubreddits = useSelector(isLoading);
    const subredditsErrorMessage = useSelector(selectErrorMessage);

    if (calledFrom === "Root") {
        return (
            <>
                {subreddits.length > 0 ? 
                    <ul>
                        {subreddits.map((subreddit) => (
                            <li key={subreddit.data.id}>
                                <Link 
                                    to={ROUTES.subredditRoute(subreddit.data.display_name)}
                                    aria-label={`Go to the ${subreddit.data.display_name} subreddit`}
                                    onClick={() => dispatch(loadRedditPosts({
                                        subreddit: subreddit.data.display_name
                                    }))}>
                                    <div>
                                        {/* <p>PH subreddit icon</p> */}
                                        <h4>{subreddit.data.display_name_prefixed}</h4>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    :
                    <p>Content unavailable</p>
                }
                <Link 
                    to={ROUTES.subredditsRoute}
                    aria-label="See more subreddits"
                    onClick={() => dispatch(loadSubreddits())}
                >
                    <p>View more subreddits</p>
                </Link>
            </>
        )
    } else if (calledFrom === "SearchResults") {
        return (
            <>
                {subreddits.length > 0 ? 
                    <ol>
                        {subreddits.map((subreddit) => (
                            <li key={subreddit.data.id}>
                                <Link 
                                    to={ROUTES.subredditRoute(subreddit.data.display_name)}
                                    aria-label={`Go to the ${subreddit.data.display_name} subreddit`}
                                    onClick={() => dispatch(loadRedditPosts({
                                        subreddit: subreddit.data.display_name
                                    }))}
                                >
                                    <div>
                                        {/* <p>PH subreddit icon</p> */}
                                        <h3>{subreddit.data.display_name_prefixed}</h3>
                                        <p>{subreddit.data.title}</p>
                                        {/* <p>Subcribers: {subreddit.data.subscribers}</p> */}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ol>
                    :
                    <p>Subreddits unavailable</p>
                }
            </>
        )
    } else {
        
    }
}

export default Subreddits;