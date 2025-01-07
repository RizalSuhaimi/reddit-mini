import React, { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    loadSubreddits,
    selectSubreddits,
    selectErrorMessage,
    isLoading
} from "../Subreddits/SubredditsSlice";
import SearchBar from "../SearchBar/SearchBar";
import Subreddits from "../Subreddits/Subreddits";
import MobileSearchMenu from "../MobileSearchMenu/MobileSearchMenu";

import homeIcon from "../../resources/home.png";
import searchIcon from "../../resources/search.png";
import hamburgerIcon from "../../resources/menu.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Root.css";

const Root = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits)
    const isLoadingSubreddits = useSelector(isLoading);
    const subredditsErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        if (subreddits.length === 0) {
            dispatch(loadSubreddits({}));
        };
    }, [subreddits, dispatch]);

    const handleClickHome = (event) => {
        if (location.pathname === "/") {
            event.preventDefault();
        }
    }

    const initialLoading = isLoadingSubreddits && subreddits.length === 0;


    let sidePanel 
    let hamburger
    useEffect(() => {
        sidePanel = document.getElementById("side-panel");
        hamburger = document.getElementById("side-panel-toggle");
    })  // For some reason, this only works when I don't set up the dependency array

    const handleHamburgerOnClick = () => {
        sidePanel.classList.toggle("show");
        hamburger.classList.toggle("isActive");
    };

    // Hides the sidebar when user clicks anywhere outside the side panel
    const handleHideSidePanel = (event) => {
        if (sidePanel.classList.contains("show")) {
            if (!event.target.closest("#side-panel") && !event.target.closest("#side-panel-toggle")) {
                sidePanel.classList.remove("show");
                hamburger.classList.remove("isActive");
            };
        };
    };

    useEffect(() => {
        window.addEventListener("click", handleHideSidePanel);
        return () => window.removeEventListener("click", handleHideSidePanel);
    }, [location, handleHideSidePanel])

    let searchMenuToggle
    let searchMenuPage
    useEffect(() => {
        searchMenuToggle = document.getElementById("searchMenu-toggle")
        searchMenuPage = document.getElementById("searchMenuPage")
    }); // For some reason, this only works when I don't set up the dependency array

    const handleSearchMenuToggleOnClick = () => {
        searchMenuToggle.classList.toggle("isActive");
        searchMenuPage.classList.toggle("show")
        document.body.style.overflow = "hidden";
    };

    const handleHideSearchMenuPage = (event) => {
        if (searchMenuPage.classList.contains("show")) {
            if (!event.target.closest("#searchMenuContainer") && !event.target.closest("#searchMenuToggle")) {
                searchMenuPage.classList.remove("show");
                searchMenuToggle.classList.remove("isActive");
                document.body.style.overflow = "auto";
            };
        }
    };

    useEffect(() => {
        searchMenuPage.addEventListener("click", handleHideSearchMenuPage);
        return () => searchMenuPage.removeEventListener("click", handleHideSearchMenuPage);
    }, [location, handleHideSearchMenuPage])

    // Hides side panel and mobile search menu after every reroute
    useEffect(() => {
        if (sidePanel.classList.contains("show")) {
            sidePanel.classList.remove("show");
        }
        if (hamburger.classList.contains("isActive")) {
            hamburger.classList.remove("isActive");
        }
        if (searchMenuPage.classList.contains("show")) {
            searchMenuPage.classList.remove("show");
        }
        if (searchMenuToggle.classList.contains("isActive")) {
            searchMenuToggle.classList.remove("isActive");
        }
        document.body.style.overflow = "auto"; // Need this for when users press back after they opened the search menu
    }, [location, hamburger, searchMenuPage, searchMenuToggle, sidePanel]);

    return (
        <div 
        className="
            bg-dark-subtle
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
                px-3 py-2
                position-sticky 
                top-0 
                w-100 
                border-bottom 
                m-0
                headerBar
            "
            >
                <div
                
                className="
                col 
                headerIconContainer 
                bg-
                p-0 m-0 
                "
                >
                    <img 
                    id="side-panel-toggle" 
                    className="headerIcon m-0 rounded img-fluid" 
                    src={hamburgerIcon} 
                    onClick={handleHamburgerOnClick}
                    alt="side panel toggle button"
                    />
                </div>

                <div 
                id="logoContainer"
                className="
                col 
                logoContainer 
                m-0 py-0 
                bg-
                "
                >
                    <h1 className=" m-0 logo">REDDIT<span className="text-info">mini</span></h1>
                </div>

                <div 
                id="searchBarContainer"
                className="col hide"
                >
                    <SearchBar />
                </div>

                <div 
                className="
                col 
                headerIconContainer 
                bg-
                p-0 m-0 
                justify-content-end
                "
                >
                    <img 
                    id="searchMenu-toggle"
                    className="headerIcon m-0 rounded img-fluid" 
                    src={searchIcon}
                    onClick={handleSearchMenuToggleOnClick}
                    alt="search menu toggle button"
                    />
                    
                </div>

                
            </div>

            <div
            id="searchMenuPage"
            className="searchMenuPage"
            >
                <div
                id="searchMenuContainer"
                className="searchMenuContainer bg-dark rounded"
                >
                    <MobileSearchMenu />
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
                <nav 
                id="side-panel"
                className="
                    side-panel
                    justify-content-center
                    border-end
                    position-fixed
                    h-100
                    bg-dark-subtle
                    
                "
                >
                    <div className="my-2">
                        <Link
                        to="/"
                        onClick={handleClickHome}
                        aria-label="Go Home"
                        className="
                            text-white
                            text-decoration-none
                            justify-content-center
                            d-flex
                            align-items-center
                            home-button
                            rounded
                            p-1
                        "
                        >
                            <img className="home-icon" src={homeIcon} alt="decorative home icon"/>
                            <p className="text-center fs-5 m-0">Home</p>
                        </Link>
                    </div>
                    <div
                    className="
                        border-top 
                        w-100 
                        justify-content-center
                        py-2 ps-3
                    "
                    >
                        <h5 className="">Communities</h5>

                        {initialLoading && 
                            <div className="d-flex  justify-content-center">
                                <div className="spinner-border" role="status"></div>
                                <p className="px-3 py-1">Loading subreddits</p>
                            </div>
                        }

                        {subredditsErrorMessage && <div>{subredditsErrorMessage}</div>}
                        
                        <div>
                            {subreddits.length > 0 && 
                                <Subreddits calledFrom="Root" />
                            }
                        </div>
                        
                    </div>
                </nav>

                <div className="side-panel back"></div> {/*This is needed to make sure nothing goes under the sidebar. It also breaks the page when the width of the viewport is to narrow for both the sidebar and the hero section*/}

                <div 
                    className="
                        hero
                        px-3
                        pt-3
                        m-auto
                    "
                >
                    <Outlet />
                </div>
            </div>
            
            
        </div>
    )
}

export default Root;