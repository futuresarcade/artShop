import React, { useState } from "react"
import {useLocation, Link} from "react-router-dom"

export default function CategoryPages({ category, artPieces }) {
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