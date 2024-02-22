import React from 'react';
import {Link} from "react-router-dom";

function Hero() {
    return (
        <div className={`relative h-[700px]`}>

            <div className={` h-full w-full flex flex-col justify-center items-center`}>
                <p className={`lg:text-6xl md:text-4xl text-2xl font-semibold text-white`}>Elevate your space with
                    curated art</p>
                <p className={`text-lg mt-2 text-red-200 font-bold`}>Explore and acquire today.</p>
                <Link
                    className={`px-24 bg-red-50/50 text-xl bg-rose-500 mt-12 py-2.5 text-center font-semibold text-white hover:bg-rose-700 transition`}
                    to={localStorage.getItem("token") ? "/shop" : "/signup"}>
                    <button
                    >{
                        localStorage.getItem("token") ? "Shop" : "Register"
                    }
                    </button>
                </Link>
            </div>
            <img
                className={`w-full absolute top-0 -z-50 brightness-[65%] h-full object-cover my-5`}
                src="https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""/>
        </div>
    );
}

export default Hero;