import {useState, useEffect} from "react"
import { NavLink } from "react-router-dom"


export default function Nav() {
    const [artPieces, setArtPieces] = useState([]);
    

    useEffect(() => {
        fetch('artPieces.json')
            .then(response => response.json())
            .then(data => setArtPieces(data));
    }, []);

    // Get an array of unique categories from artPieces
    const categories = Array.from(new Set(artPieces.map(item => item.category)));


    return (
    <nav>
        <ul>
            <li>
                <NavLink  to="/" className="active">All Art</NavLink>
            </li>
            {categories.map(category => (
                <li key={category}>
                    <NavLink to={`/${category}`} className="active">{category}</NavLink>
                </li>
            ))}
        </ul>
        </nav>
    )
}