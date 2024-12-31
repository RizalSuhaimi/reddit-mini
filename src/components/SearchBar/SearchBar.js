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
        <>
            <form onSubmit={handleSubmit} className="row justify-content-end">
                <div className="w-75 input-group">
                    <input 
                        type="text"
                        id="search"
                        className="form-control w-50 border-white"
                        placeholder="Search Reddit"
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    />

                    <select
                        onChange={(e) => setSearchConstraint(e.currentTarget.value)}
                        defaultValue="posts"
                        id="search-constraint"
                        className="form-select w-25 border-white"
                    >
                        <option value="posts">Posts</option>
                        <option value="subreddits">Subreddits</option>
                    </select>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Search
                    </button>
                </div>
            </form>
            
        </>
    )
}

export default SearchBar;