import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes";
import { useDispatch, useSelector } from "react-redux";
import {
    runSearch,
    selectSearchResults,
    selectErrorMessage,
    isLoading
} from "../SearchResults/SearchResultsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";

const SearchResults = (props) => {
    const searchResults = useSelector(selectSearchResults);
    const isLoadingSearchResults = useSelector(isLoading);
    const searchErrorMessage = useSelector(selectErrorMessage);

    if (isLoadingSearchResults) {
        return <div>Getting search results</div>
    } else if (searchErrorMessage) {
        return <div>{searchErrorMessage}</div>
    }

    return (
        <div>
            <h2>Search Results</h2>
            <RedditPosts fetchResponse={searchResults} />
        </div>
    )
}

export default SearchResults;