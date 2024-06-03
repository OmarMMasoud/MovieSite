import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../style/cards.scss';

function Card({ onCardClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    setSearchTerm('marvel');
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

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
              id: movie.imdbID,
            });
          });
        } else {
          console.error("Error: The 'Search' property is not present in the response data.");
        }
      });
      setMovieList(movieData);
    }).catch(err => {
      console.error(err);
    });
  };

  const handleCardClick = (movie) => {
    
    axios.get(`http://www.omdbapi.com/?i=${movie.id}&apikey=d40112b6`)
   .then(response => {
        onCardClick(response.data);
      })
   .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="cards">
      {movieList.filter(movie => movie.poster!== 'N/A').map((movie, index) => (
        <div className='card' key={index} onClick={() => handleCardClick(movie)}>
          {movie.poster && <img src={movie.poster} alt="" className="img" />}
        </div>
      ))}
    </div>
  );
}

export default Card;