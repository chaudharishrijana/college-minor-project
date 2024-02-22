import {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import './App.css';

import 'react-toastify/dist/ReactToastify.css';

import AddCategory from "./components/AddCategory";
import Art from "./components/Art";
import Artcard from "./components/Artcard";
import ArtCardGroup from "./components/ArtCardGroup";
import Artist from "./components/Artist";
import ArtistProfile from "./components/ArtistProfile";
import Cart from "./components/Cart";
import CreateArt from "./components/CreateArt";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import EditDetails from "./components/EditDetails";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Termsofuse from "./components/Termsofuse";
import Search from "./pages/Search";
import {ToastContainer} from "react-toastify";

function App() {
    const [userData, setUserData] = useState({});

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            setUserData(data)
            localStorage.setItem("user", JSON.stringify(data.role));
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="px-3 md:px-0">
            <ToastContainer/>
            <Navbar/>
            <div className={`container mx-auto`}>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/art/:id'} element={<Art role={userData?.role}/>}/>
                    <Route path={'/artist/:id'} element={<Artist/>}/>
                    <Route path={'privacypolicy'} element={<PrivacyPolicy/>}/>
                    <Route path={'terms'} element={<Termsofuse/>}/>
                    <Route path={'/search/:search'} element={<Search/>}/>
                    {/*<Route path={'/login'} element={<Login/>}/>*/}
                    <Route path={'/cart'} element={userData.id ? <Cart/> : <Navigate to="/login"/>}/>
                    <Route path={'/login'} element={userData.id ? <Navigate to="/"/> : <Login/>}/>
                    <Route path={'/signup'} element={userData.id ? <Navigate to="/"/> : <Signup/>}/>
                    <Route path={'/me'}
                           element={userData ? <ArtistProfile userData={userData}/> : <Navigate to="/login"/>}/>
                    <Route path={'/shop'} element={<Shop/>}/>
                    <Route path={'/create'} element={userData ? <CreateArt/> : <Navigate to="/login"/>}/>
                    <Route path={'/edit/:id'} element={userData ? <CreateArt/> : <Navigate to="/login"/>}/>
                    <Route path={'/addcategory'} element={userData ? <AddCategory/> : <Navigate to="/login"/>}/>
                    <Route path={'/editdetails'} element={userData ? <EditDetails/> : <Navigate to="/login"/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
