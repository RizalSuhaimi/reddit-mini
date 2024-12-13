import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "../../App/Routes";

const Root = () => {
    return (
        <>
            <h1>Hello</h1>
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={ROUTES.subredditRoute()}>
                                Subreddit
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.postRoute()}>
                                Post
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