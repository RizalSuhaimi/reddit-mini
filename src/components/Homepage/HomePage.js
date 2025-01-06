import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadRedditPosts,
    selectRedditPosts,
    selectAfter,
    selectErrorMessage,
    isLoading,
    resetState,
    gotAllPosts
} from "../RedditPosts/RedditPostsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";
import handleInfiniteScroll from "../../utils/handleInfiniteScroll";

import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const redditPosts = useSelector(selectRedditPosts);
    const after = useSelector(selectAfter);
    const stopInfiniteScroll = useSelector(gotAllPosts); 
    const isLoadingRedditPosts = useSelector(isLoading);
    const redditPostsErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(loadRedditPosts({}));
    }, [dispatch]);

    const handleScroll =  handleInfiniteScroll(
        dispatch, 
        isLoadingRedditPosts, 
        loadRedditPosts, 
        "loadRedditPosts", 
        { after }, 
        stopInfiniteScroll
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [after, isLoadingRedditPosts, dispatch, stopInfiniteScroll])


    useEffect(() => {
        return () => {
            dispatch(resetState("HomePage"));
        };
    }, [location, dispatch])

    // This needs 2 conditions because we don't want the user to lose scroll progress (start back at the top) when the app is loading for more Reddit posts
    const initialLoading = isLoadingRedditPosts && redditPosts.length === 0 && !stopInfiniteScroll;
    const scrollLoading = isLoadingRedditPosts && redditPosts.length > 0 && !stopInfiniteScroll;

    return (
        <>
            <h2>Trending in Reddit</h2>
            <div className="pagePostsDivider"></div>
            {initialLoading &&
                <div className="d-flex  justify-content-center">
                    <div className="spinner-border" role="status"></div>
                    <p className="px-3 py-1">Loading Reddit posts</p>
                </div>
            }

            {redditPostsErrorMessage && <p>{redditPostsErrorMessage}</p>}

            {redditPosts.length > 0 && <RedditPosts redditPosts={redditPosts}/>}

            {scrollLoading && 
                <div className="d-flex  justify-content-center">
                    <div className="spinner-border" role="status"></div>
                    <p className="px-3 py-1">Loading more posts</p>
                </div>
            }

            {stopInfiniteScroll && <p>No more posts...</p>}
        </>
    )
}

export default HomePage;