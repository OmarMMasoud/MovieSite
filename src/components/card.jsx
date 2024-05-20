import React from 'React';
import axios from 'axios';

const Card = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState({});

  const handleCardClick = async () => {
    const response = await axios.post('https://your-backend-api.com/movie', { movieId: movie.imdbID });
    setMovieDetails(response.data);
  };

  return (
    <div onClick={handleCardClick}>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      {movieDetails && (
        <div>
          <p>{movieDetails.Plot}</p>
          <p>Director: {movieDetails.Director}</p>
          <p>Year: {movieDetails.Year}</p>
        </div>
      )}
    </div>
  );
};

export default Card;