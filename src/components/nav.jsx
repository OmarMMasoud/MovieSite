import React, { useState } from 'react';

import { IoSearch } from "react-icons/io5";
import logo from "../style/imgs/logo.png"
import "../style/nav.scss"

function nav() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <nav>
        <div className="logo"><img src={logo} alt="" /></div>
        <div className="search">
        <IoSearch className="search-icon" />

        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
        <button onClick={() => /* Call the search function here */}>Search</button>


        </div>
    </nav>
)
}

export default nav