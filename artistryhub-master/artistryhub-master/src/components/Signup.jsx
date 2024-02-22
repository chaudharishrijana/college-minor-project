import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    function signUp() {
        document.title = "Signup";
        // validate
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // validate email and password with regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email");
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters");
            return;
        }

        // validate fullname
        if (username.length < 3) {
            alert("Full name must be at least 3 characters");
            return;
        }

        // validate role
        if (role === "") {
            alert("Select a role");
            return;
        }

        signUpUser();
    }

    async function signUpUser() {
        try {
            const res = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role
                }),
            });
            const data = await res.json();
            if (data.code == 400) {
                toast(data.message);
            } else {
                toast(data.message);
                localStorage.setItem('token', data.token);
                window.location.reload();
            }
        } catch (error) {
            console.error("Error during signup:", error.message);
            toast("An error occurred during signup. Please try again later.");
        }
    }

    return (
        <div>
            <div className={"grid md:grid-cols-2 h-screen"}>
                <div className={`flex flex-col justify-center px-24 gap-4`}>
                    <p className={`text-2xl font-semibold py-6`}>Join Artistryhub</p>
                    <div className={`flex flex-col`}>
                        <p className={`font-semibold`}>Full Name</p>
                        <input onChange={(e) => setUsername(e.target.value)}
                               className={`outline-none border-b border-gray-400 w-full `} type="text"/>
                    </div>
                    <div className={`flex flex-col`}>
                        <p className={`font-semibold`}>Email</p>
                        <input onChange={e => setEmail(e.target.value)}
                               className={`outline-none border-b border-gray-400 w-full `} type="email"/>
                    </div>
                    <div className={`flex flex-col`}>
                        <p className={`font-semibold`}>Password</p>
                        <input onChange={e => setPassword(e.target.value)}
                               className={`outline-none border-b border-gray-400 w-full `} type="password"/>
                    </div>
                    <div className={`flex flex-col`}>
                        <p className={`font-semibold`}>Confirm Password</p>
                        <input onChange={e => setConfirmPassword(e.target.value)}
                               className={`outline-none border-b border-gray-400 w-full `} type="password"/>
                    </div>
                    <div className={`flex flex-col`}>
                        <p className={`font-semibold`}>I am a</p>
                        <div className={`flex items-center gap-4`}>
                            <div className={`flex items-center gap-2`}>
                                <input onChange={e => {
                                    if (e.target.checked) {
                                        setRole("artist")
                                    }
                                }} type="radio" name="role"/>
                                <label htmlFor="artist">Artist</label>
                            </div>
                            <div className={`flex items-center gap-2`}>
                                <input onChange={e => {
                                    if (e.target.checked) {
                                        setRole("customer")
                                    }
                                }} type="radio" name="role"/>
                                <label htmlFor="customer">Customer</label>
                            </div>
                        </div>
                    </div>

                    <button onClick={signUp}
                            className={`border-2 border-rose-500 mt-12 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}>Sign
                        Up
                    </button>
                    <Link to={`/login`}>
                        <button className={`w-full text-center font-semibold`}>Login instead</button>
                    </Link>
                </div>
                <div className={`hidden lg:block bg-amber-100 side`}></div>
            </div>
        </div>
    );
}

export default Signup;
