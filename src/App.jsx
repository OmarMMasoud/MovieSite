import React, { useState } from 'react';

import Card from "./components/card"
import Details from "./components/details"
import Nav from "./components/nav"

import "./style/main.scss"

function App() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  return (
<div className="App">
<Nav onSearch={handleSearch} />
<Card searchTerm={searchTerm} />
<Details/>
</div>  )
}

export default App