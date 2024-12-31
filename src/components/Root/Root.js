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
    }, [subreddits, dispatch]);

    return (
        <div 
            className="
                bg-dark
                text-white
                container-fluid
                m-0
                p-0
            " 
            data-bs-theme="dark"
        >
            <div 
                className="
                    bg-dark 
                    row 
                    align-items-center 
                    px-3 py-1 
                    position-sticky 
                    top-0 
                    w-100 
                    border-bottom 
                    m-0
                "
            >
                <div className="d-lg-none d-block text-white">
                    ph tango
                </div>

                <div className="col">
                    <h1 className="text-primary">REDDITmini</h1>
                </div>

                <div className="col text-end">
                    <SearchBar />
                </div>
            </div>

            <div 
                className="
                row
                w-100
                m-0
                border-top
                "
            >
                <div 
                    className="
                        col-lg-2 
                        justify-content-center
                        border-end
                        position-fixed
                        h-100
                    "
                >
                    <div className="mt-3">
                        <Link
                            to="/"
                            aria-label="Go Home"
                            className="
                                text-white
                                text-decoration-none
                                fs-5
                            "
                        >
                            <p className="text-center">Home</p>
                        </Link>
                    </div>
                    <div
                        className="
                            border-top 
                            w-100 
                            justify-content-center
                            py-2 px-3
                        "
                    >
                        <h4 className="">Communities</h4>

                        {isLoadingSubreddits && <div>Loading subreddits</div>}

                        {subredditsErrorMessage && <div>{subredditsErrorMessage}</div>}
                        
                        <div>
                            {subreddits.length > 0 && 
                                <Subreddits calledFrom="Root" />
                            }
                        </div>
                        
                    </div>
                </div>

                <div className="col-lg-2"></div>

                <div className="col-lg-10 bg-primary">
                    <Outlet />
                </div>
            </div>
            
            
        </div>
    )
}

export default Root;