import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import ROUTES from "../../App/Routes";
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
            dispatch(loadSubreddits());
    }, [dispatch]);

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
                {isLoadingSubreddits && <div>Loading subreddits</div>}

                {subredditsErrorMessage && <div>{subredditsErrorMessage}</div>}
                
                {subreddits.length > 0 && 
                    <Subreddits subreddits={subreddits} calledFrom="Root" />
                }
            </div>
            <Outlet />
        </>
    )
}

export default Root;