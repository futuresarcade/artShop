import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const [artPieces, setArtPieces] = useState([]);

  useEffect(() => {
    fetch('./artPieces.json')
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
          <Route path="/" element={
            <>
              <h1>Art Pieces</h1>
              <ArtList artPieces={artPieces} />
            </>
          } />


          {categories.map(category => (
            <Route key={category} path={`/${category}`} element={
              <>
                <h1>{category}</h1>
                <CategoryPage artPieces={artPieces.filter(item => item.category === category)} />
              </>
            } />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

function ArtList({ artPieces }) {
  const location = useLocation()
  const [page, setPage] = useState(1)
  const maxItemsPerPage = 6
  const maxPages = Math.ceil(artPieces.length / maxItemsPerPage)
  const start = (page - 1) * maxItemsPerPage
  const end = start + maxItemsPerPage;
  const items = artPieces.slice(start, end)
  const isFirstPage = page === 1
  const isLastPage = page === maxPages

  function handleNextPage() {
    setPage(page + 1)
  }
  function handlePrevPage() {
    setPage(page - 1)
  }


  return (
    <>
      <div className="art-list">
        {items.map(item => (
          <div className="art-piece" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>by {item.author}</p>
            <p>{item.dimensions}</p>
          </div>
        ))}
      </div>

      {maxPages > 1 && (

        <div className="pagination">
          {!isFirstPage && (
            <Link to={{ pathname: location.pathname, search: `?page=${page - 1}` }} onClick={handlePrevPage}>Prev</Link>
          )}
          {!isLastPage && (
            <Link to={{ pathname: location.pathname, search: `?page=${page + 1}` }} onClick={handleNextPage}>Next</Link>
          )}
        </div>
      )}
    </>
  );
}

function CategoryPage({ category, artPieces }) {
  const location = useLocation();

  const [page, setPage] = useState(1);

  const maxItemsPerPage = 6;
  const maxPages = Math.ceil(artPieces.length / maxItemsPerPage);

  const start = (page - 1) * maxItemsPerPage;
  const end = start + maxItemsPerPage;

  const items = artPieces.slice(start, end);

  const isFirstPage = page === 1;
  const isLastPage = page === maxPages;

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }



  return (
    <>
      <div className="art-list">
        {items.map(piece => (
          <div className="art-piece" key={piece.id}>
            <img src={piece.image} alt={piece.name} />
            <h2>{piece.name}</h2>
            <p>by {piece.author}</p>
            <p>{piece.dimensions}</p>
          </div>
        ))}
      </div>
      {maxPages > 1 && (
        <div className="pagination">
          {!isFirstPage && (
            <Link to={{ pathname: location.pathname, search: `?page=${page - 1}` }} onClick={handlePrevPage}>Prev</Link>
          )}
          {!isLastPage && (
            <Link to={{ pathname: location.pathname, search: `?page=${page + 1}` }} onClick={handleNextPage}>Next</Link>
          )}
        </div>
      )}

    </>

  )
}

export default App;



