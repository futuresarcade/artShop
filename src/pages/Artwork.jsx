import React, { useState, useEffect } from "react"
import {useParams} from "react-router-dom"

export default function Artwork() {
    const [artwork, setArtwork] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetch("artPieces.json")
            .then(res => res.json())
            .then(data => {
                const select = data.find(item => item.id == id)
                setArtwork(select)
            })
    }, [])
    console.log(artwork)

    return (
        <div>
            <img src={artwork.image} alt={artwork.name} className="fullImage"  />
            <h2>{artwork.name}</h2>
        </div>
    )

}