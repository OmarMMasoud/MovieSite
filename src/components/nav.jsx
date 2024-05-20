import React from 'React'

import { IoSearch } from "react-icons/io5";
import logo from "../style/imgs/logo.png"
import "../style/nav.scss"

function nav() {
  return (
    <nav>
        <div className="logo"><img src={logo} alt="" /></div>
        <div className="search">
        <IoSearch className="search-icon" />

        <input type="text" placeholder='Find out if it’s worth watching'/>
        </div>
    </nav>
)
}

export default nav