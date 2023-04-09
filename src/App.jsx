import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';
import Artwork from "./pages/Artwork"
import ArtList from "./pages/ArtList"
import CategoryPages from "./pages/CategoryPages"
import Layout from "./components/Layout"
import './App.css';

function App() {
  const [artPieces, setArtPieces] = useState([]);

  useEffect(() => {
    fetch('artPieces.json')
      .then(response => response.json())
      .then(data => setArtPieces(data));
  }, []);

  // Get an array of unique categories from artPieces
  const categories = Array.from(new Set(artPieces.map(item => item.category)));

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink to="/" className="active">All Art</NavLink>
            </li>
            {categories.map(category => (
              <li key={category}>
                <NavLink to={`/${category}`} className="active">{category}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Routes>
          <Route element = {<Layout />}>
          <Route path="/" element={
            <>
              <h1>Art Works</h1>
              <ArtList artPieces={artPieces} />
            </>
          } />


          {categories.map(category => (
            <Route key={category} exact path={`/${category}`} element={
              <>
                <h1>{category}</h1>
                <CategoryPages artPieces={artPieces.filter(item => item.category == category)} />
              </>
            } />
          ))}
            <Route exact path="/:id" element={<Artwork />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}







export default App;



