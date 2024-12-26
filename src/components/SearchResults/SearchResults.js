import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSearchResults,
    selectSearchTerm,
    selectSearchConstraint,
    selectErrorMessage,
    isLoading
} from "../SearchResults/SearchResultsSlice";
import RedditPosts from "../RedditPosts/RedditPosts";
import Subreddits from "../Subreddits/Subreddits";

const SearchResults = () => {
    const searchResults = useSelector(selectSearchResults);
    const searchTerm = useSelector(selectSearchTerm)
    const searchConstraint = useSelector(selectSearchConstraint)
    const isLoadingSearchResults = useSelector(isLoading);
    const searchErrorMessage = useSelector(selectErrorMessage);

    if (isLoadingSearchResults) {
        return <div>Getting search results</div>
    } else if (searchErrorMessage) {
        return <div>{searchErrorMessage}</div>
    }

    return (
        <div>
            {searchResults.length > 0 ? 
                <>
                    <h2>Search Results for {searchTerm}</h2>
                    {searchConstraint === "posts" ? 
                        <RedditPosts redditPosts={searchResults} />
                        :
                        <Subreddits subreddits={searchResults} calledFrom="SearchResults" />
                    }
                </>
                :
                <h3>Cannot find anything for {searchTerm}</h3>
            }
        </div>
    )
}

export default SearchResults;