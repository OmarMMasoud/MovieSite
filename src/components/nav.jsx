import React, { useState } from 'react';
import axios from 'axios';

function Nav() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults();
  };

  const fetchSearchResults = () => {
    const pages = [];
    for (let i = 1; i <= 5; i++) {
      pages.push(
        axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=d40112b6&page=${i}`)
      );
    }

    Promise.all(pages).then(responses => {
      const movieData = [];
      responses.forEach(response => {
        const movies = response.data.Search;
        if (movies) {
          movies.forEach(movie => {
            movieData.push({
              title: movie.Title,
              poster: movie.Poster,
            });
          });
        } else {
          console.error("Error: The 'Search' property is not present in the response data.");
        }
      });
      setSearchResults(movieData);
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <nav>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Nav;