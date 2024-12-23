import React, { useEffect, useState } from "react";
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
    const [searchConstraint, setSearchConstraint] = useState("posts")

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(runSearch({searchTerm, searchConstraint}));
        navigate(ROUTES.searchRoute());
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="search" >
                        <input 
                            type="text"
                            id="search"
                            placeholder="Search Reddit"
                            onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        />
                    </label>
                    <select
                        onChange={(e) => setSearchConstraint(e.currentTarget.value)}
                        defaultValue="posts"
                    >
                        <option value="posts">Posts</option>
                        <option value="subreddits">Subreddits</option>
                    </select>
                </div>
                <button type="submit" >Search</button>
            </form>
            
        </div>
    )
}

export default SearchBar;