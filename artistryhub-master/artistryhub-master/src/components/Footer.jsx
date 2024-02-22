import React from 'react';
import {Link} from "react-router-dom";
import {AiFillFacebook, AiFillInstagram, AiOutlineTwitter} from "react-icons/ai";

function Footer() {
    return (<div className={`py-16 px-14 mt-10 grid grid-cols-1 gap-14 md:grid-cols-3 bg-gray-600 text-gray-100`}>
            <div className={`flex flex-col`}>
                <p className={`font-semibold text-xl`}>ArtistryHub</p>
                <Link to={'/privacypolicy'}>Privacy Policy</Link>
                <Link to={'/terms'}>Terms of Service</Link>
                <Link to={`/`}><p>Home</p></Link>
                <Link to={`/Shop`}><p>Shop</p></Link>


            </div>
            <div>
                <p className={`font-semibold text-xl`}>Contact</p>
                <p className={``}>Email:test@gmail.com</p>
                <p className={``}>Phone: 123-456-7890</p>

            </div>
            <div>
                <p className={`text-xl font-semibold mb-2`}>Socials</p>
                <div className={`text-2xl flex flex-col gap-4`}>
                    <a href="">
                        <p><AiFillInstagram/></p></a>
                    <p><AiFillFacebook/></p>
                    <p><AiOutlineTwitter/></p>
                </div>


            </div>

        </div>
    );
}

export default Footer;