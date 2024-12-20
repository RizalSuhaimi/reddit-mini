import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../App/Routes";
import "bootstrap/dist/css/bootstrap.min.css"

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search" >
                    <input 
                        type="text"
                        id="search"
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    />
                    <input type="submit" />
                </label>
            </form>
            
        </div>
    )
}

export default SearchBar;