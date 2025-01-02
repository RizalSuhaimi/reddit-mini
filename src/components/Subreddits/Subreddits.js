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

import "bootstrap/dist/css/bootstrap.min.css";
import "./Subreddits.css";

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
                    <ul
                        className="
                            list-unstyled
                            list-group
                            my-2
                        "
                    >
                        {subreddits.slice(0, 10).map((subreddit) => (
                            <li key={subreddit.data.id}>
                                <Link 
                                    to={ROUTES.subredditRoute(subreddit.data.display_name)}
                                    aria-label={`Go to the ${subreddit.data.display_name} subreddit`}
                                    onClick={() => dispatch(loadRedditPosts({
                                        subreddit: subreddit.data.display_name,
                                        srIconImg: subreddit.data.icon_img
                                    }))}
                                    className="
                                    text-white
                                    text-decoration-none
                                    "
                                >
                                    <div
                                        className="
                                            d-flex 
                                            align-items-center
                                            p-1 
                                            mb-1
                                            rounded
                                            sr-button
                                        "
                                    >
                                        {subreddit.data.icon_img ?
                                            <img 
                                                className="sr_icon_32"
                                                src={subreddit.data.icon_img}
                                            />
                                        :
                                            <div
                                                className="sr_default_icon_32"
                                            >
                                                <h4>r/</h4>
                                            </div>
                                        }
                                        <div 
                                            className="sr_title"
                                        >
                                            {subreddit.data.display_name_prefixed}
                                        </div>
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
                    className="
                        text-decoration-none
                        text-white
                    "
                >
                    <p className="more-sr">View more subreddits</p>
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
                {initialLoading &&
                    <div className="d-flex  justify-content-center">
                        <div className="spinner-border" role="status"></div>
                        <p className="px-3 py-1">Loading communities</p>
                    </div>
                } 

                {subredditsErrorMessage && <div>{subredditsErrorMessage}</div>}

                {subreddits.length > 0 ? 
                    <ol
                    className="
                        list-unstyled
                        list-group
                    "
                    >
                        {subreddits.map((subreddit) => (
                            <li key={subreddit.data.id}>
                                <Link 
                                    to={ROUTES.subredditRoute(subreddit.data.display_name)}
                                    aria-label={`Go to the ${subreddit.data.display_name} subreddit`}
                                    onClick={() => dispatch(loadRedditPosts({
                                        subreddit: subreddit.data.display_name
                                    }))}
                                    className="
                                    text-white
                                    text-decoration-none
                                    "
                                >
                                    <div>
                                        <div
                                        className="
                                        d-flex 
                                        align-items-center
                                        p-1 
                                        mb-1
                                        rounded
                                        sr-button
                                        "
                                        >
                                            {subreddit.data.icon_img ?
                                                <img 
                                                className="sr_icon_40"
                                                src={subreddit.data.icon_img}
                                                />
                                            :
                                                <div
                                                className="sr_default_icon_40"
                                                >
                                                    <h4>r/</h4>
                                                </div>
                                            }

                                            <div 
                                            className="sr_title"
                                            >
                                                <h3>{subreddit.data.display_name_prefixed}</h3>
                                            </div>
                                        </div>
                                        

                                        <p className="m-0 fs-5">{subreddit.data.title}</p>

                                        <p className="m-0">Subcribers: {subreddit.data.subscribers}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ol>
                    :
                    <p>Subreddits unavailable</p>
                }

                {scrollLoading && 
                    <div className="d-flex  justify-content-center">
                        <div className="spinner-border" role="status"></div>
                        <p className="px-3 py-1">Loading more communities</p>
                    </div>
                }

                {stopInfiniteScroll && <div>No more communities...</div>}
            </div>
        )
    }
}

export default Subreddits;