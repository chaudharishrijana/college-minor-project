import React, {useEffect} from 'react';
import {AiOutlineEdit, AiOutlineLogout, AiOutlinePlus} from "react-icons/ai";
import Artcard from "./Artcard";
import ArtCardGroup from "./ArtCardGroup";
import {Link} from "react-router-dom";

function ArtistProfile({userData}) {
    document.title = "Dashboard";
    const [userArt, setUserArt] = React.useState([]);
    const [userSold, setUserSoldArt] = React.useState([]);
    const [bought, setBought] = React.useState([]);

    async function fetchUsersArt() {
        try {
            const response = await fetch(`http://localhost:3000/artworks/user/${userData.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            setUserArt(data);
        } catch (error) {
            // Handle error silently
        }
    }

    async function fetchSoldUserArt() {
        try {
            const response = await fetch(`http://localhost:3000/artworks/sold/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            const data = await response.json();
            if (data.length > 0) {
                setUserSoldArt(data);
            }
        } catch (error) {
            // Handle error silently
        }
    }

    async function boughtbyuser() {
        try {
            const response = await fetch(`http://localhost:3000/artworks/bought/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            const data = await response.json();
            if (data.length > 0) {
                setBought(data);
            }
        } catch (error) {
            // Handle error silently
        }
    }

    useEffect(() => {
        fetchUsersArt();
        fetchSoldUserArt();
        boughtbyuser();
    }, [userData]);

    return (
        <div className={`min-h-[750px]`}>
            <div className={`flex flex-col items-center`}>
                <p className={`w-full py-4 text-2xl font-medium`}>Dashboard</p>
                <img className={`w-[250px] my-5 h-[250px] object-cover rounded-full`}
                     src="https://news.harvard.edu/wp-content/uploads/2014/10/hello-kitty-wallpaper-37_605.jpg" alt=""/>
                <div className={` flex flex-col items-center mb-6`}>
                    <p className={`font-semibold text-lg`}>{userData.username}</p>
                    <p>{userData.role}</p>
                    <p>{userData.email}</p>
                </div>
                <Link to={'/editdetails'}>
                    <button className={`font-medium`}>Edit Details</button>
                </Link>
                <button
                    onClick={() => {
                        window.location.reload();
                        localStorage.removeItem('token')
                        window.location.href = '/';
                    }}
                    className={`flex items-center gap-2 my-4 border border-gray-400 py-1.5 px-6 rounded-2xl hover:bg-rose-100 transition`}>
                    <AiOutlineLogout/>
                    Logout
                </button>
            </div>
            <div>
                {userData.role === 'artist' &&
                    <div className={`flex gap-3 items-center`}>
                        <p className={`text-xl my-8 font-bold`}>My Arts</p>
                        <Link to={`/create`}>
                            <button
                                className={`flex items-center gap-2 border border-gray-400  px-10 py-1.5 rounded-2xl hover:bg-rose-100 transition`}>
                                <AiOutlinePlus/>Add Art
                            </button>
                        </Link>
                    </div>
                }

                {userData.role === 'artist' && <div className={``}>
                    <ArtCardGroup data={userArt} edit={true} title={``}/>
                </div>}
                {userData.role === 'artist' && <div className={``}>
                    <ArtCardGroup data={userSold} title={`Sold Artworks`}/>
                </div>}
                {userData.role === 'customer' && <div className={``}>
                    <ArtCardGroup data={bought} title={`Bought Artworks`}/>
                </div>}
            </div>
        </div>
    );
}

export default ArtistProfile;
