import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    runSearch,
    selectSearchResults,
    selectSearchTerm,
    selectSearchConstraint,
    selectErrorMessage,
    isLoading
} from "../SearchResults/SearchResultsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";
import Subreddits from "../Subreddits/Subreddits";
import handleInfiniteScroll from "../../utils/handleInfiniteScroll";

import "bootstrap/dist/css/bootstrap.min.css";

const SearchResults = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchResults = useSelector(selectSearchResults);
    const searchTerm = useSelector(selectSearchTerm)
    const searchConstraint = useSelector(selectSearchConstraint)
    const isLoadingSearchResults = useSelector(isLoading);
    const searchErrorMessage = useSelector(selectErrorMessage);

    const handleScroll = handleInfiniteScroll(dispatch, isLoadingSearchResults, runSearch, "runSearch", { searchTerm, searchConstraint, after})

    const initialLoading = isLoadingSearchResults && searchResults.length === 0;
    const scrollLoading = isLoadingSearchResults && searchResults.length > 0;
    const noResultsFound = searchResults.length === 0 && !isLoadingSearchResults;

    return (
        <div>
            {initialLoading && <div>Content is loading</div>}  

            {searchErrorMessage && <div>{searchErrorMessage}</div>}

            {searchResults.length > 0 && 
                <>
                    <h2>Search Results for {searchTerm}</h2>
                    {searchConstraint === "posts" ? 
                        <RedditPosts redditPosts={searchResults} />
                        :
                        <Subreddits subreddits={searchResults} calledFrom="SearchResults" />
                    }
                </>                
            }

            {noResultsFound && <h3>Cannot find anything for {searchTerm}</h3>}

            {scrollLoading && <div>Loading more results...</div>}
        </div>
    )
}

export default SearchResults;