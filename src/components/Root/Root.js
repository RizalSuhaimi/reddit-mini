import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "../../App/Routes";

const Root = () => {
    return (
        <>
            <h1>REDDITmini</h1>
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