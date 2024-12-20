import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes";
import { useDispatch, useSelector } from "react-redux";
import RedditPosts from "../RedditPosts/RedditPosts";

const SearchResults = (props) => {
    return (
        <div>
            <h2>Search Results</h2>
            <RedditPosts />
        </div>
    )
}

export default SearchResults;