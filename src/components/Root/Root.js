import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "../../App/Routes";
import "bootstrap/dist/css/bootstrap.min.css"

const Root = () => {
    return (
        <>
            <div className="bg-dark" data-bs-theme="dark">
                <h1 className="text-primary container">REDDITmini</h1>
            </div>
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={ROUTES.subredditRoute()}>
                                Subreddit
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </>
    )
}

export default Root;