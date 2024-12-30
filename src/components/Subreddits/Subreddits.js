import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../App/Routes";
import {
    loadRedditPosts
} from "../RedditPosts/RedditPostsSlice";
import { 
    loadSubreddits,
    selectSubreddits,
    selectAfter,
    isLoading,
    selectErrorMessage,
    gotAllSubreddits
} from "./SubredditsSlice";
import handleInfiniteScroll from "../../utils/handleInfiniteScroll";

import "bootstrap/dist/css/bootstrap.min.css"

const Subreddits = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { calledFrom } = props;

    let subreddits = useSelector(selectSubreddits) // The value will be changed if Subreddits component is called from SearchResults

    const after = useSelector(selectAfter);
    const stopInfiniteScroll = useSelector(gotAllSubreddits);
    const isLoadingSubreddits = useSelector(isLoading);
    const subredditsErrorMessage = useSelector(selectErrorMessage);

    const handleScroll = handleInfiniteScroll(
        dispatch, 
        isLoadingSubreddits, 
        loadSubreddits, 
        "loadSubreddits", 
        { after }, 
        stopInfiniteScroll
    );

    useEffect(() => {
        if (location.pathname === "/subreddits") {
            window.addEventListener("scroll", handleScroll);
        }
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [after, isLoadingSubreddits, dispatch, location, stopInfiniteScroll])

    // This needs 2 conditions because we don't want the user to lose scroll progress (start back at the top) when the app is loading for more Reddit posts
    const initialLoading = isLoadingSubreddits && subreddits.length === 0 && !stopInfiniteScroll;
    const scrollLoading = isLoadingSubreddits && subreddits.length > 0 && !stopInfiniteScroll;

    if (calledFrom === "Root") {
        return (
            <>
                {subreddits.length > 0 ? 
                    <ul>
                        {subreddits.slice(0, 10).map((subreddit) => (
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
                    to={ROUTES.subredditsRoute()}
                    aria-label="See more subreddits"
                >
                    <p>View more subreddits</p>
                </Link>
            </>
        )
    } else if (calledFrom === "SearchResults") {
        subreddits = props.subreddits;

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
    } else if (calledFrom === "App") {
        return (
            <div>
                <h2>Communities</h2>
                {initialLoading && <div>Content is loading</div>}

                {subredditsErrorMessage && <div>{subredditsErrorMessage}</div>}

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

                {scrollLoading && <div>Loading more posts...</div>}

                {stopInfiniteScroll && <div>No more posts...</div>}
            </div>
        )
    }
}

export default Subreddits;