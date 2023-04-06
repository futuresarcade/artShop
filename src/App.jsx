import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link, NavLink, useLocation, useParams } from 'react-router-dom';
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
          <Route exact path="/" element={
            <>
              <h1>Art Works</h1>
              <ArtList artPieces={artPieces} />
            </>
          } />


          {categories.map(category => (
            <Route key={category} exact path={`/${category}`} element={
              <>
                <h1>{category}</h1>
                <CategoryPage artPieces={artPieces.filter(item => item.category == category)} />
              </>
            } />
          ))}
          <Route exact path="/:id" element={<Artwork />} />
        </Routes>
      </div>
    </Router>
  );
}

function Artwork() {
  const [artwork, setArtwork] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetch("artPieces.json")
      .then(res => res.json())
      .then(data => {
        const select = data.find(object => object.id = id)
        setArtwork(select)
    })
  }, [])
  console.log(artwork)
  
  return (
    <div>
      <img src={artwork.image} alt={artwork.name} className="fullImage" />
      <h2>{artwork.name}</h2>
    </div>
  )

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
    window.scrollTo(0, 0)
  }
  function handlePrevPage() {
    setPage(page - 1)
    window.scrollTo(0, 0)
  }


  return (
    <>
      <div className="art-list">
        {items.map(item => (
          <div className="art-piece" key={item.id}>
            <Link to={`/${item.id}`} >
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>by {item.author}</p>
              <p>{item.dimensions}</p>
            </Link>
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
    window.scrollTo(0, 0)
  }

  function handlePrevPage() {
    setPage(page - 1);
    window.scrollTo(0, 0)
  }



  return (
    <>
      <div className="art-list">
        {items.map(item => (
          <div className="art-piece" key={item.id}>
            <Link to ={`/${item.id}`}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>by {item.author}</p>
              <p>{item.dimensions}</p>
            </Link>
          </div>
        ))}
      </div>
      {maxPages > 1 && (
        <div className="pagination">
          {!isFirstPage && (
            <Link to={{ pathname: location.pathname, search: `?page=${page - 1}` }} onClick={handlePrevPage}>Prev</Link>
          )}
          {!isLastPage && (
            <Link className="next" to={{ pathname: location.pathname, search: `?page=${page + 1}` }} onClick={handleNextPage}>Next</Link>
          )}
        </div>
      )}

    </>

  )
}

export default App;



