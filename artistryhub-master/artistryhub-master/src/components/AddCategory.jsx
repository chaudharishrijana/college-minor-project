import React, {useState} from 'react';
import {toast} from "react-toastify";

function AddCategory() {
    document.title = "Add Category";
    const [category, setCategory] = useState("")
    const addCategory = async () => {
        try {
            const res = await fetch('http://localhost:3000/categories/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({name: category})
            });

            if (!res.ok) {
                throw new Error('Failed to add category');
            }

            const data = await res.json();
            alert(data.error);
        } catch (error) {
            toast(`Failed to add category: ${error.message}`, {type: "error"})
        }
    };
    return (
        <div className={`min-h-screen`}>
            <div>
                <p className={`text-2xl font-semibold my-8`}>Add Category</p>
                <div className={`flex flex-col gap-4`}>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="font-semibold">
                            Category Name
                        </label>
                        <input
                            onChange={(e) => setCategory(e.target.value)}
                            className="outline-none border-b border-gray-400 "
                            type="text"
                            id="category"
                            name="category"
                            placeholder="Enter category name"
                        />
                    </div>

                    <button
                        onClick={addCategory}
                        className={`border-2 border-rose-500 mt-12 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}>Add
                        Category
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;
