import React, {useEffect} from 'react';
import {LiaPaintBrushSolid} from "react-icons/lia";
import {FaRegUser} from "react-icons/fa";
import {Link} from "react-router-dom";

function Artcard({artwork, edit}) {
    const [artistName, setArtistName] = React.useState();
    const [categoryName, setCategoryName] = React.useState();
    const {id, title, image, category, artist, price} = artwork;

    async function getArtistName() {
        try {
            const res = await fetch(`http://localhost:3000/users/user/${artist}`);
            const data = await res.json();
            setArtistName(data.username);
        } catch (error) {
            // Handle the error condition silently
        }
    }

    async function getCategoryName() {
        try {
            const res = await fetch(`http://localhost:3000/categories/${category}`);
            const data = await res.json();
            setCategoryName(data.name);
        } catch (error) {
            // Handle the error condition silently
        }
    }

    useEffect(() => {
        if (category != undefined)
            getCategoryName();
    }, [category]);

    useEffect(() => {
        if (artist > 0 | artist != null) {
            getArtistName();
        }
    }, [artist])

    return (
        <Link to={edit ? `/edit/${artwork.id}` : `/art/${artwork.id}`}>
            <div className="flex flex-col cursor-pointer">
                <img
                    className="w-full h-[300px] object-cover"
                    src={`http://localhost:3000/image/${image}`}
                    alt={title}/>
                <div className="flex mt-3 justify-between">
                    <div>
                        <p className="md:text-lg font-semibold">{title}</p>
                        <div className="flex items-center gap-2">
                            <LiaPaintBrushSolid/>
                            <p>{categoryName}</p>
                        </div>
                        <div className="flex items-center gap-2 font-semibold">
                            <FaRegUser/>
                            <p>{artistName}</p>
                        </div>
                    </div>
                    <p className="font-semibold">Rs.{price}</p>
                </div>
            </div>
        </Link>
    );
}

export default Artcard;
