import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    loadSubreddits,
    selectSubreddits,
    selectErrorMessage,
    isLoading
} from "../Subreddits/SubredditsSlice";
import SearchBar from "../SearchBar/SearchBar";
import Subreddits from "../Subreddits/Subreddits";

import "bootstrap/dist/css/bootstrap.min.css"

const Root = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits)
    const isLoadingSubreddits = useSelector(isLoading);
    const subredditsErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        if (subreddits.length === 0) {
            dispatch(loadSubreddits({}));
        };
    }, [subreddits.length, dispatch]);

    return (
        <>
            <div className="bg-dark" data-bs-theme="dark">
                <h1 className="text-primary container">REDDITmini</h1>
                <SearchBar />
            </div>
            <div>
                <Link
                    to="/"
                    aria-label="Go Home"
                >
                    <h4>Home</h4>
                </Link>
            </div>
            <div>
                <h3>Communities</h3>
                {isLoadingSubreddits && <div>Loading subreddits</div>}

                {subredditsErrorMessage && <div>{subredditsErrorMessage}</div>}
                
                {subreddits.length > 0 && 
                    <Subreddits calledFrom="Root" />
                }
            </div>
            <Outlet />
        </>
    )
}

export default Root;