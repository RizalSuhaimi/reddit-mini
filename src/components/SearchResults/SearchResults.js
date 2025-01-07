import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
    runSearch,
    selectSearchResults,
    selectAfter,
    selectErrorMessage,
    isLoading,
    resetState,
    gotAllResults
} from "../SearchResults/SearchResultsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";
import Subreddits from "../Subreddits/Subreddits";
import handleInfiniteScroll from "../../utils/handleInfiniteScroll";

import "bootstrap/dist/css/bootstrap.min.css";

const SearchResults = () => {
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchResults = useSelector(selectSearchResults);
    const after = useSelector(selectAfter);
    const stopInfiniteScroll = useSelector(gotAllResults);
    let searchTerm = searchParams.get("q");
    let searchConstraint = searchParams.get("type");
    const isLoadingSearchResults = useSelector(isLoading);
    const searchErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(runSearch({ searchTerm, searchConstraint}))
        
        return () => {
            dispatch(resetState("SearchResults unmounting"));
        }
    }, [dispatch, location, searchTerm, searchConstraint])

    const handleScroll = handleInfiniteScroll(
        dispatch, 
        isLoadingSearchResults, 
        runSearch, 
        "runSearch", 
        { searchTerm, searchConstraint, after},
        stopInfiniteScroll
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [after, isLoadingSearchResults, dispatch, handleScroll])

    const initialLoading = isLoadingSearchResults && searchResults.length === 0;
    const scrollLoading = isLoadingSearchResults && searchResults.length > 0;
    const noResultsFound = searchResults.length === 0 && !isLoadingSearchResults;

    return (
        <div>
            {initialLoading &&
                <div className="d-flex  justify-content-center">
                    <div className="spinner-border" role="status"></div>
                    <p className="px-3 py-1">Loading search results</p>
                </div>
            } 

            {searchErrorMessage && <div>{searchErrorMessage}</div>}

            {searchResults.length > 0 && 
                <>
                    <h2>Search Results for {searchTerm}</h2>
                    <div className="pagePostsDivider"></div>
                    {searchConstraint === "posts" ? 
                        <RedditPosts redditPosts={searchResults} />
                        :
                        <Subreddits subreddits={searchResults} calledFrom="SearchResults" />
                    }
                </>
            }

            {noResultsFound && <h3>Cannot find anything for {searchTerm}</h3>}

            {scrollLoading && 
                <div className="d-flex  justify-content-center">
                    <div className="spinner-border" role="status"></div>
                    <p className="px-3 py-1">Loading more results</p>
                </div>
            }

            {stopInfiniteScroll && <div>No more posts...</div>}
        </div>
    )
}

export default SearchResults;