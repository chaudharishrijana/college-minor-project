import React, {useState, useEffect} from 'react';
import {LiaPaintBrushSolid} from 'react-icons/lia';
import {IoPricetags} from 'react-icons/io5';
import {FaRegUser} from 'react-icons/fa';
import {CiTextAlignCenter} from 'react-icons/ci';
import {useParams} from 'react-router-dom';
import ArtCardGroup from './ArtCardGroup';
import {toast} from "react-toastify";

function Art({role}) {
    const {id} = useParams();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [artistId, setArtistId] = useState();
    const [image, setImage] = useState();
    const [desc, setDesc] = useState();
    const [itemExists, setItemExists] = useState(false); // Initialize with false
    const [artworks, setArtworks] = useState([]);
    const [artistName, setArtistName] = useState();
    const [categoryName, setCategoryName] = useState();
    const [sold, setSold] = useState(false);

    // Fetch art
    async function getArt() {
        window.scrollTo(0, 0);
        try {
            const res = await fetch(`http://localhost:3000/artworks/artwork/${id}`);
            const data = await res.json();
            setName(data.title);
            setPrice(data.price);
            setCategory(data.category);
            setImage(data.image);
            setDesc(data.description);
            setArtistId(data.artist);
            setSold(data.sold);
            setItemExists(isItemInCart(id));
            document.title = data.title;
            if (data.code === 400) {
                // Handle the error condition appropriately
            }
        } catch (error) {
            // Handle the error condition appropriately
        }
    }

    // Fetch artworks
    async function getArtworks() {
        try {
            const res = await fetch('http://localhost:3000/artworks/all');
            const data = await res.json();
            setArtworks(data);
        } catch (error) {
            // Handle the error condition appropriately
        }
    }

    // Fetch artist name
    async function getArtistName() {
        try {
            const res = await fetch(`http://localhost:3000/users/user/${artistId}`);
            const data = await res.json();
            setArtistName(data.username);
        } catch (error) {
            // Handle the error condition appropriately
        }
    }

    // Fetch category name
    async function getCategoryName() {
        try {
            const res = await fetch(`http://localhost:3000/categories/${category}`);
            const data = await res.json();
            setCategoryName(data.name);

        } catch (error) {
            // Handle the error condition appropriately
        }
    }

    useEffect(() => {
        getArtworks().catch(error => {/* Handle error */
        });
    }, []);

    useEffect(() => {
        getArt().catch(error => {/* Handle error */
        });
    }, [id]);

    useEffect(() => {
        if (category)
            getCategoryName().catch(error => {
            });
    }, [category]);

    useEffect(() => {
        if (artistId > 0 || artistId != null) {
            getArtistName().catch(error => {/* Handle error */
            });
        }
    }, [artistId]);

    // Function to check if item is in cart
    const isItemInCart = (itemId) => {
        try {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            return cartItems.some(item => item.id === itemId);
        } catch (error) {
            // Handle the error condition appropriately
            return false;
        }
    };

    // Function to handle adding/removing item to/from cart
    const handleAddToCart = () => {
        try {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const isItemInCart = cartItems.some(item => item.id === id);

            if (isItemInCart) {
                const updatedCart = cartItems.filter(item => item.id !== id);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                setItemExists(false);
            } else {
                const newItem = {id, name, price, artist: artistName, category: categoryName, image};
                cartItems.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                setItemExists(true);
            }
        } catch (error) {
            // Handle the error condition appropriately
        }
    };


    function goToLogin() {
        window.location.href = '/login'
    }


    return (
        <div className={`mt-8`}>
            {artistId &&
                <>
                    <div className={`grid md:grid-cols-2`}>
                        <img className={`max-h-[750px] w-full object-cover`}
                             src={`http://localhost:3000/image/${image}`}
                             alt=""/>
                        <div className={`flex mt-5 sm:mt-0 sm flex-col justify-between md:px-6 `}>
                            <div>
                                <p className={`font-semibold text-lg`}>{name}</p>
                                <div className={`flex items-center gap-2`}>
                                    <IoPricetags/>
                                    <p>Rs.{price}</p>
                                </div>
                                <div className={`flex items-center gap-2`}>
                                    <LiaPaintBrushSolid/>
                                    <p>{categoryName}</p>
                                </div>
                                <div className={`flex items-center gap-2`}>
                                    <FaRegUser/>
                                    <p>{artistName}</p>
                                </div>
                                <div className={`flex items-center gap-2`}>
                                    <CiTextAlignCenter/>
                                    <p>{desc}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    toast(`aug rality`)
                                }}
                                className={`sm:mt-auto mt-8 border-2 border-green-600 mt-12  py-1.5 rounded-2xl font-bold text-green-600 hover:bg-green-100 transition`}>View
                                in AR
                            </button>

                            {role !== `artist` && <button
                                onClick={localStorage.getItem('token') ? handleAddToCart : goToLogin}
                                className={`border-2 border-rose-500 mt-4  py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}
                            >

                                {!localStorage.getItem('token') ? "Login" : itemExists ? 'Remove from Cart' : 'Add to Cart'}
                            </button>}

                        </div>
                    </div>
                    <div className={`mt-16`}>
                        <ArtCardGroup data={artworks.slice(0, 8)} title={`More like this.`}/>
                    </div>
                </>
            }
            {!artistId && <div className={`h-[700px] text-2xl flex justify-center items-center`}>
                Artwork not found.
            </div>}
        </div>
    );
}

export default Art;