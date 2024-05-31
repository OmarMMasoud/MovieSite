import React from 'react'

import "../style/result.scss"

function Details({ card }) {
  if (!card) return null; // or display a loading message

  return (
    <div className="details">
      <div className="mainInfo">
        <img src={card.poster} alt="" className="poster" />
        <h2 className="name">{card.name}</h2>
      </div>
      <div className="seconderyInfo">
        <div className="left">
          <h3 className="overview">{card.overview}</h3>
          <p className="year">{card.year}</p>
          <p className="genres">{card.genres}</p>
          <p className="country">{card.country}</p>
        </div>
        <div className="right">
          <p className="vote">{card.vote}</p>
          <p className="time">{card.time}</p>
          <p className="budget">{card.budget}</p>
          <p className="Awards">{card.awards}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;