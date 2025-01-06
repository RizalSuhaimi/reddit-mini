import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
    useNavigate, 
    useLocation, 
    createSearchParams,
    useSearchParams
} from "react-router-dom";
import ROUTES from "../../App/Routes";
import {
    resetState
} from "../SearchResults/SearchResultsSlice";

import "bootstrap/dist/css/bootstrap.min.css"

const MobileSearchMenu = () => {
    const searchInputRef = useRef(null);
    const searchConstraintRef = useRef(null);
    const location = useLocation();
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
            className="p-2"
            >
                <div className="w-100">
                    <input 
                        type="text"
                        id="search"
                        ref={searchInputRef}
                        className="form-control w-100 border-white my-2"
                        placeholder="Search Reddit"
                    />

                    <select
                        
                        defaultValue="posts"
                        id="search-constraint"
                        ref={searchConstraintRef}
                        className="form-select w-100 border-white my-2"
                    >
                        <option value="posts">Posts</option>
                        <option value="subreddits">Subreddits</option>
                    </select>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary my-2"
                    >
                        Search
                    </button>
                </div>
            </form>
            
        </>
    )
}

export default MobileSearchMenu;