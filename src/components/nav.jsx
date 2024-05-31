import React, { useState } from 'react';
import axios from 'axios';


import { IoSearch } from "react-icons/io5";
import logo from "../style/imgs/logo.png"
import "../style/nav.scss"

function Nav() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleSearchInputChanges = (e) => {
    setSearchTerm(e.target.value);
  }

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
        if (response.data.Search) {
          const movies = response.data.Search;
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
       <div className="logo"><img src={logo} alt="" /></div>
      <form  className='search' onSubmit={handleSearch}>
        <IoSearch className='search-icon'/>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChanges}
          placeholder="find out if it’s worth watching"
          className=''
        />
        <button type="submit">Search</button>
      </form>
      <div className="cards">
        {searchResults.filter(movie => movie.poster!== 'N/A').map((movie, index) => (
          <div className='card' key={index}>
            {movie.poster && <img src={movie.poster} alt="" className="img" />}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Nav;