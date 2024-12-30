import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../App/Routes";
import {
    runSearch,
    resetState
} from "../SearchResults/SearchResultsSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const SearchBar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchConstraint, setSearchConstraint] = useState("posts")

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            dispatch(resetState("Search Button"));
            dispatch(runSearch({ searchTerm, searchConstraint }));
            if (location.pathname !== "/search") {
                navigate(ROUTES.searchRoute());
            }
        } else {
            alert("Search bar cannot be empty")
        }
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