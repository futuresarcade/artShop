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
                <div className="container">
                    <img src={artwork.image} alt={artwork.name} />
                    <h2>{artwork.name}</h2>
                    <button onClick={handleNext} disabled={id === "21"}><span className="next-button">{">"}</span></button>
                    <button onClick={handlePrev} disabled={id === "1"}><span className="prev-button">{"<"}</span></button>


                </div>

            )}

        </div>
    );

}