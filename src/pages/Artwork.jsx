import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Artwork() {
    const [artwork, setArtwork] = useState([])
    const { id } = useParams()


    useEffect(() => {
        fetch("artPieces.json")
            .then(res => res.json())
            .then(data => {
                const select = data.find(item => item.id === id)
                setArtwork(select)
            })
    }, [id])
    const handleNext = () => {
        // find the next artwork's id
        const nextId = parseInt(id) + 1;
        // navigate to the next artwork
        window.location.href = `/${nextId}`;
    };

    const handlePrev = () => {
        // find the previous artwork's id
        const prevId = parseInt(id) - 1;
        // navigate to the previous artwork
        window.location.href = `/${prevId}`;
    };

    return (
        <div>
            {artwork && (
                <>
                    <img src={artwork.image} alt={artwork.name} className="fullImage" />
                    <h2>{artwork.name}</h2>
                    <div className="nav-buttons">
                        <button onClick={handlePrev} disabled={id === "1"}><span className="arrow arrow-left"></span>{"<"}</button>
                        <button onClick={handleNext} disabled={id === "18"}>{">"}<span className="arrow arrow-right"></span></button>
                    </div>
                </>
            )}


        </div>
    );

}