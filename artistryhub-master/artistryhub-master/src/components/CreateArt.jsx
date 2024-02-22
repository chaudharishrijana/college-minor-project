import React, {useEffect, useState} from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import {toast} from "react-toastify";

function CreateArt() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    const [desc, setDesc] = useState('');

    //fetch artwork from id
    async function getArtwork() {
        try {
            const res = await fetch(`http://localhost:3000/artworks/artwork/${id}`);
            const data = await res.json();
            setName(data.title);
            setPrice(data.price);
            setCategory(data.category);
            setDesc(data.description);
        } catch (error) {
            toast(`Error getting artwork`);
            console.error("Error getting artwork:", error.message);
        }
    }

    //function to upload artwork
    async function uploadArt() {
        document.title = "Create Art";
        if (id) {
            try {
                const res = await fetch(`http://localhost:3000/artworks/update/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        title: name,
                        price: price,
                        category: category,
                        description: desc
                    }),
                });
                const data = await res.json();
                if (data.id) {
                    toast(`Success`);
                }
            } catch (error) {
                console.error("Error updating artwork:", error.message);
            }
        } else {
            try {
                const formData = new FormData();
                formData.append('title', name);
                formData.append('price', price);
                formData.append('category', category);
                formData.append('description', desc);
                formData.append('image', image);
                const res = await fetch(`http://localhost:3000/artworks/add`, {
                    method: "POST",
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData,
                });
                const data = await res.json();
                toast("Added successfully.", {type: "success"})
                window.location.href = "/me"
            } catch (error) {
                toast("Error adding artwork:", error.message);
            }
        }
    }

    //functions to get all categories form server
    async function getCategories() {
        try {
            const res = await fetch('http://localhost:3000/categories/');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error("Error getting categories:", error.message);
        }
    }

    const deleteProd = async () => {
        try {
            const res = await fetch(`http://localhost:3000/artworks/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            window.location.href = '/me';

        } catch (error) {
            console.error("Error deleting artwork:", error.message);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (id) {
            getArtwork();
        }
    }, [id]);

    useEffect(() => {
        // Ensure categories has values before setting category
        if (categories.length > 0) {
            setCategory(categories[0]?.id);
        }
    }, [categories]);

    return (
        <div className={`min-h-[820px]`}>
            <div className={`flex flex-col justify-center px-24 gap-4`}>
                <div className={`flex justify-between  items-center`}>
                    <p className={`text-2xl font-semibold py-6`}>Publish new art for sale.</p><Link to={`/addcategory`}>
                    <button
                        className={`flex items-center h-fit gap-2 border border-gray-400 justify-center  px-10 py-1.5 rounded-2xl hover:bg-rose-100 transition`}
                    >
                        <AiOutlinePlus/>Add Category
                    </button>
                </Link>
                </div>


                <div className={`flex flex-col`}>

                    <p className={`font-semibold`}>Name</p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`outline-none border-b border-gray-400 w-full `}
                        type="text"
                    />
                </div>
                <div className={`flex flex-col`}>
                    <p className={`font-semibold`}>Price</p>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={`outline-none border-b border-gray-400 w-full `}
                        type="text"
                    />
                </div>
                <div className={`flex flex-col`}>
                    <p className={`font-semibold`}>Description</p>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className={`outline-none border-b border-gray-400 w-full `}
                        name="desc"
                        id="desc"
                        cols="30"
                    ></textarea>
                </div>

                {!id && <div className={`flex flex-col`}>
                    <p className={`font-semibold`}>Image</p>
                    <input
                        className={`flex items-center gap-2 border border-gray-400  px-10 py-1.5 rounded-2xl hover:bg-rose-100 transition`}
                        onChange={(e) => setImage(e.target.files[0])}
                        accept={`image/*`}
                        multiple={false}
                        type="file"
                    />
                </div>}
                <div className={`flex flex-col`}>
                    <p className={`font-semibold`}>Category</p>
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)} // Correctly set the onChange event handler
                        className={`flex items-center gap-2 border border-gray-400 px-10 py-1.5 rounded-2xl transition`}
                        name=""
                        id=""
                    >
                        {/* Render options dynamically */}
                        <option value="">...</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name.toString()}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={uploadArt}
                    className="border-2 border-rose-500 mt-12 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition"
                >
                    {id ? 'Update' : 'Publish'}
                </button>
                {id &&
                    <button onClick={deleteProd} className={`text-rose-500 mt-16 text-lg`}>Delete this product</button>}

            </div>
        </div>
    );
}

export default CreateArt;
