import React from 'react';
import {toast} from "react-toastify";

function EditDetails() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');

    async function updatee() {
        try {
            document.title = "Update Details";
            const res = await fetch("http://localhost:3000/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fullName: fullName
                }),
            });
            const data = await res.json();
            if (data.code === 400) {
                toast(data.message)
            }
            window.location.href = '/me';
        } catch (error) {
            toast("Failed to update details");
        }
    }

    return (
        <div className={`min-h-[800px] flex flex-col  justify-center items-center`}>
            <div className={`md:w-1/2 flex-col flex gap-4`}>
                <p className={`text-2xl`}>Update your details</p>
                <div className="flex gap-1 flex-col">
                    <label htmlFor="email" className="font-semibold">
                        Full Name
                    </label>
                    <input
                        onChange={(e) => setFullName(e.target.value)}
                        className="outline-none border-b border-gray-400 w-full"
                        type="text"/>
                </div>
                <div className="flex gap-1 flex-col">
                    <label htmlFor="email" className="font-semibold">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none border-b border-gray-400 w-full"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email or phone number"
                    />
                </div>
                <div className="flex gap-1 flex-col">
                    <label htmlFor="password" className="font-semibold">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none border-b border-gray-400 w-full"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    onClick={updatee}
                    className={`border-2 w-full border-rose-500 mt-12 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}>Update
                </button>
            </div>
        </div>
    );
}

export default EditDetails;
