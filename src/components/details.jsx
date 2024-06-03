import React, { useState, useEffect } from 'react';

import '../style/result.scss'
const Details = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    if (movie) {
      document.querySelector('.details').classList.remove('hidden');
    }
  }, [movie]);

  if (!movie) {
    return null;
  }

  return (
    <div className={`details ${showDetails? '' : 'hidden'}`}>
      <button className="close-button" onClick={() => setShowDetails(false)}>
        X
      </button>
      <div className="head">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      </div>
      <p className='plot'>{movie.Plot}</p>

      <div className="contentBody">
      <div className="left">
      <p> <strong>Released:</strong> {movie.Released}</p>
      <p> <strong>Vote:</strong> {movie.imdbRating}</p>
      <p> <strong>T:</strong> {movie.Type} </p>


      </div>
      <div className="right">
      <p> <strong>Runtime:</strong> {movie.Runtime} minutes</p>
      <p> <strong>Budget:</strong> ${movie.BoxOffice}</p>
      <p> <strong>Awards:</strong> {movie.Awards}</p>

      </div>
      </div>
    </div>
  );
};

export default Details;