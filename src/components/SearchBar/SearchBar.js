import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { 
    useNavigate, 
    useLocation, 
    createSearchParams,
    useSearchParams
} from "react-router-dom";
import ROUTES from "../../App/Routes";
import {
    runSearch,
    resetState
} from "../SearchResults/SearchResultsSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const SearchBar = () => {
    const searchInputRef = useRef(null);
    const searchConstraintRef = useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    // const [searchTerm, setSearchTerm] = useState("");
    // const [searchConstraint, setSearchConstraint] = useState("posts")

    

    const onSearchHandler = (event) => {
        event.preventDefault();

        const query = {
            q: searchInputRef.current.value
        }
        const queryString = createSearchParams(query)
    
        const searchConstraint = {
            type: searchConstraintRef.current.value
        }
        const searchConstraintString = createSearchParams(searchConstraint)

        if (searchInputRef.current.value) {
            
            dispatch(resetState("Search Button"));

            navigate({
                pathname: ROUTES.searchRoute(),
                search: `?${queryString}&${searchConstraintString}`
            });
        } else {
            alert("Search bar cannot be empty")
        }
    }

    return (
        <>
            <form onSubmit={onSearchHandler} className="row justify-content-end">
                <div className="w-75 input-group">
                    <input 
                        type="text"
                        id="search"
                        ref={searchInputRef}
                        className="form-control w-50 border-white"
                        placeholder="Search Reddit"
                    />

                    <select
                        
                        defaultValue="posts"
                        id="search-constraint"
                        ref={searchConstraintRef}
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