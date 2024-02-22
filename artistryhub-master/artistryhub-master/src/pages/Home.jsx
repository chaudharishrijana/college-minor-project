import React, {useState} from 'react';
import Hero from "../components/Hero";
import ArtCardGroup from "../components/ArtCardGroup";
import FeaturedArtists from "../components/FeaturedArtists";

function Home() {
    document.title = 'Art Gallery | Home';
    const [artworks, setArtworks] = React.useState([{}]);

    async function getArtworks() {
        try {
            const res = await fetch('http://localhost:3000/artworks/all');
            const data = await res.json();
            setArtworks(data);
        } catch (error) {
            console.error('Failed to fetch artworks:', error);
        }
    }

    React.useEffect(() => {
        getArtworks();
    }, []);
    return (
        <div>
            <Hero/>{artworks && <ArtCardGroup data={artworks.slice(0, 8)} title={`Latest`}/>}

            <FeaturedArtists/>
        </div>
    );
}

export default Home;