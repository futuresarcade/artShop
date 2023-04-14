import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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

        <Routes>
          <Route element = {<Layout />}>
          <Route  path="/" element={
            <>
              
              <ArtList artPieces={artPieces} />
            </>
          } />

          {categories.map(category => (
            <Route key={category} path={`/${category}`} element={
              <>
                <h1>{category}</h1>
                <CategoryPages artPieces={artPieces.filter(item => item.category == category)} />
              </>
            } />
          ))}
            <Route  path="/:id" element={<Artwork />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}







export default App;



