import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function Login() {
    document.title = "Login";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);

    async function login() {
        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await res.json();
            if (data.code == 400) {
                setWrongPassword(true);
                localStorage.removeItem(`token`);
            } else if (data.id) {
                setWrongPassword(false);
                localStorage.setItem('token', data.accessToken);
                window.location.href = '/';
            } else {
                toast("An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error during login:", error.message);
            toast("An error occurred. Please try again later.");
        }
    }

    useEffect(() => {
        document.title = "Login";
    }, []);

    return (
        <div>
            <div className={"grid lg:grid-cols-2 h-screen"}>
                <div className={`flex flex-col justify-center px-24 gap-4`}>
                    <p className={`text-2xl font-semibold py-6`}>Login</p>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold">
                            Email or Phone no
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
                    <div className="flex flex-col">
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
                    {wrongPassword && <p className={`text-sm text-red-500`}>Invalid credentials.</p>}
                    <button
                        onClick={login}
                        className={`border-2 border-rose-500 mt-12 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}>Login
                    </button>
                    <Link to={`/signup`}>
                        <button className={`w-full text-center font-semibold`}>Signup instead</button>
                    </Link>
                </div>
                <div className={`hidden lg:block bg-amber-100 side`}></div>
            </div>
        </div>
    );
}

export default Login;
