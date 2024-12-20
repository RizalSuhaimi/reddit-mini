import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../App/Routes";
import {
    runSearch,
    selectSearchResults,
    selectErrorMessage,
    isLoading
} from "../SearchResults/SearchResultsSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector(selectSearchResults);
    const isLoadingSearchResults = useSelector(isLoading);
    const searchErrorMessage = useSelector(selectErrorMessage);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(runSearch({searchTerm}));
        navigate(ROUTES.searchRoute());
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select
                    onChange={(e) => e}
                    defaultValue="posts"
                >
                    <option value="posts">posts</option>
                    <option value="subreddits">Subreddits</option>
                </select>
                <label htmlFor="search" >
                    <input 
                        type="text"
                        id="search"
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    />
                    <button type="submit" >Search</button>
                </label>
            </form>
            
        </div>
    )
}

export default SearchBar;