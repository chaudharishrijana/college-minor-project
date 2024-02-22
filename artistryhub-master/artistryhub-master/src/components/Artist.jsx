import React, {useEffect, useState} from 'react';
import {AiFillEdit, AiOutlineEdit} from "react-icons/ai";
import {useParams} from "react-router-dom";
import ArtCardGroup from "./ArtCardGroup";

function Artist() {

    const {id} = useParams();
    const [artist, setArtist] = useState();
    const [artworks, setArtworks] = useState([]);

    const fetchArtist = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/user/${id}`);
            const data = await response.json();
            setArtist(data);
        } catch (error) {
            // Handle error silently
        }
    }

    const fetchArtworks = async () => {
        try {
            const response = await fetch(`http://localhost:3000/artworks/user/${id}`);
            const data = await response.json();
            if (data.length > 0)
                setArtworks(data);
        } catch (error) {
            // Handle error silently
        }
    }

    useEffect(() => {
        fetchArtist();
        fetchArtworks();
        if (artist)
            document.title = "Art Gallery" + artist?.username;
    }, []);


    return (
        <div>
            <div className={`flex flex-col items-center`}>
                <img className={`w-[250px] my-5 h-[250px] object-cover rounded-full`}
                     src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                     alt=""/>
                <div className={` flex flex-col items-center`}>
                    <p className={`font-semibold text-lg`}>{artist?.username}</p>
                    <p>{artist?.email}</p>
                </div>
            </div>
            <div>
                <ArtCardGroup data={artworks} title={`From the artist`}/>
            </div>
        </div>
    );
}

export default Artist;
