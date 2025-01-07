import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { 
    useNavigate,
    createSearchParams,
    useSearchParams
} from "react-router-dom";
import ROUTES from "../../App/Routes";
import {
    resetState
} from "../SearchResults/SearchResultsSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const SearchBar = () => {
    const searchInputRef = useRef(null);
    const searchConstraintRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();    

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
            if (searchParams.size !== 0) {
                let urlTerm = searchParams.get("q");
                let urlConstraint = searchParams.get("type");

                if (searchInputRef.current.value !== urlTerm || searchConstraintRef.current.value !== urlConstraint) {
                    dispatch(resetState("Search Button"));
                    navigate({
                        pathname: ROUTES.searchRoute(),
                        search: `?${queryString}&${searchConstraintString}`
                    });
                }

            } else {
                dispatch(resetState("Search Button"));
                navigate({
                    pathname: ROUTES.searchRoute(),
                    search: `?${queryString}&${searchConstraintString}`
                });
            }
            
        } else {
            alert("Search bar cannot be empty")
        }
    }

    return (
        <>
            <form 
            id="searchBar" 
            onSubmit={onSearchHandler} 
            className="row justify-content-end"
            >
                <div className="w-100 input-group">
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