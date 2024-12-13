import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <>
            <h1>Hello</h1>
            <Outlet />
        </>
    )
}

export default Root;