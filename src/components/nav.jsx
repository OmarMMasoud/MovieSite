import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import logo from "../style/imgs/logo.png"
import "../style/nav.scss"
import "../style/result.scss";

function Nav() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);

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
              imdbID: movie.imdbID
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

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    fetchMovieDetails(movie.imdbID);
  };

  const fetchMovieDetails = (imdbID) => {
    console.log(`Fetching movie details for ${imdbID}`);
    axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=d40112b6`)
    .then(response => {
      console.log(`Received movie details:`, response.data);
      setMovieDetails(response.data);
    })
    .catch(err => {
      console.error(err);
    });
  };

  useEffect(() => {
    if (selectedMovie) {
      fetchMovieDetails(selectedMovie.imdbID);
    }
  }, [selectedMovie]);

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
          <div
            key={index}
            className='card'
            onClick={() => handleCardClick(movie)}
          >
            {movie.poster && <img src={movie.poster} alt="" className="img" />}
            {selectedMovie === movie && (
              <div>
                <div className="head">
                <h2>{movieDetails.Poster}</h2>
                <h2>{movieDetails.Title}</h2>
                </div>

                <p className='plot'>{movieDetails.Plot}</p>
                <div className="contentBody">

                <div className="left">
                <p><strong>Released:</strong> {movieDetails.Released}</p>
                <p><strong>Vote:</strong> {movieDetails.imdbRating}</p>
                <p><strong>Type:</strong> {movieDetails.Type}</p>
                </div>
                
                <div className="right">
                <p><strong>Runtime:</strong> {movieDetails.Runtime} minutes</p>
                <p><strong>Budget:</strong> ${movieDetails.BoxOffice}</p>
                <p><strong>Awards:</strong> {movieDetails.Awards}</p>
                </div>
                </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Nav;