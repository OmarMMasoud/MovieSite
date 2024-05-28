import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../style/cards.scss'
function Card() {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    const pages = [];
    for (let i = 1; i <= 5; i++) {
      pages.push(
        axios.get(`http://www.omdbapi.com/?s=marvel&apikey=d40112b6&page=${i}`)
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
      setMovieList(movieData);
    }).catch(err => {
      console.error(err);
    });
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="cards">
      {movieList.filter(movie => movie.poster!== 'N/A').map((movie, index) => (
        <div className='card' key={index}>
          {movie.poster && <img src={movie.poster} alt="" className="img" />}
        </div>
      ))}
    </div>
  );
}

export default Card;