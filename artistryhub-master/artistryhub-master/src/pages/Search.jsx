import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ArtCardGroup from "../components/ArtCardGroup";

function Search() {
    const {search} = useParams();
    document.title = `Art Gallery | Search results for ${search}`;
    const [searchResults, setSearchResults] = useState([]);

    function searchArtworks() {
        try {
            fetch(`http://localhost:3000/artworks/search/${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        setSearchResults(data);
                    }
                });
        } catch (error) {
            
        }
    }

    useEffect(() => {
        searchArtworks();
    }, [search]);

    return (
        <div className={`min-h-[700px]`}>
            <ArtCardGroup data={searchResults} title={`Search results for ${search}`}/>
        </div>
    );
}

export default Search;
