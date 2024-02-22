import React from 'react';
import {AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function Navbar() {
    // search
    const [search, setSearch] = React.useState("");

    function handleSearchChange(event) {
        // Update the search state with the current value of the input field
        setSearch(event.target.value);
        // If the "Enter" key is pressed
        if (event.key === "Enter")
            handleSearch();

    }

    function handleSearch() {

        // Redirect to the search page with the entered search term
        window.location.href = `/search/${search}`;
        toast(`nice`)

    }


    return (
        <nav className={`py-4 md:px-14 border-b `}>
            <Link to={"/"}>
                <p className={`md:hidden pb-4 font-medium`}>artistryhub</p>
            </Link>
            <div className={`flex justify-between`}>
                <p className={`text-xl font-bold hidden sm:block`}><Link to={"/"}>artistryhub</Link></p>
                <div className={`flex gap-3 items-center md:justify-end justify-between w-full`}>
                    <div className={`flex items-center  gap-1 border border-gray-400 px-3 py-1.5 rounded-2xl`}>
                        <input type="text" className={`outline-none`} onChange={handleSearchChange}
                               placeholder={`Search`}
                               name=""/>
                        <AiOutlineSearch onClick={handleSearch} size={`1.2em`}/>
                    </div>
                    <div className={`flex gap-3 justify-center`}>
                        {!localStorage.getItem("token") &&
                            <button className={`border-r pr-4 border-gray-500`}><Link to={`/login`}>Login</Link>
                            </button>}
                        {!localStorage.getItem("token") && <button><Link to={`/signup`}>Signup</Link></button>}

                        {localStorage.getItem("token") &&
                            <div><Link to={"/cart"}><AiOutlineShoppingCart size={`1.5em`}/></Link></div>}
                        {localStorage.getItem("token") &&
                            <div><Link to={`/me`}><AiOutlineUser size={`1.5em`}/></Link></div>}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;