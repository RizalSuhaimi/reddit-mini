import React, { useState, useRef } from "react";
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

const MobileSearchMenu = () => {
    const searchInputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    const [searchConstraint, selectSearchConstraint] = useState("posts");

    const onSearchHandler = (event) => {
        event.preventDefault();

        const query = {
            q: searchInputRef.current.value
        }
        const queryString = createSearchParams(query)
    
        const searchConstraintObject = {
            type: searchConstraint
        }
        const searchConstraintString = createSearchParams(searchConstraintObject)

        if (searchInputRef.current.value) {
            if (searchParams.size !== 0) {
                let urlTerm = searchParams.get("q");
                let urlConstraint = searchParams.get("type");

                if (searchInputRef.current.value !== urlTerm || searchConstraint !== urlConstraint) {
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

                    <section className="searchConstraint" >
                            
                        <div className="d-flex">
                            <input 
                            type="radio" 
                            name="searchConstraint" 
                            id="posts" 
                            value="posts"
                            checked={searchConstraint === "posts"}
                            onChange={(e) => selectSearchConstraint(e.target.value)}
                            />
                            <label htmlFor="posts" className="ms-1">Posts</label>
                        </div>

                        <div className="d-flex">
                            <input 
                            type="radio" 
                            name="searchConstraint" 
                            id="subreddits" 
                            value="subreddits"
                            checked={searchConstraint === "subreddits"}
                            onChange={(e) => selectSearchConstraint(e.target.value)}
                            />
                            <label htmlFor="subreddits" className="ms-1">Subreddits</label>
                        </div>
                            
                    </section>
                    
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