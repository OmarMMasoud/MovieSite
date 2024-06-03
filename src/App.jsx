import React, { useState } from 'react';
import './style/main.scss';
import Card from './components/card';
import Details from './components/details';
import Nav from './components/nav';

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="App">
      <Nav onSearch={handleSearch} />
      <Card searchTerm={searchTerm} onCardClick={handleCardClick} />
      {selectedMovie && <Details movie={selectedMovie} />}
    </div>
  );
}

export default App;