import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 

class Header extends Component{
	render(){
		return (
            <nav className="light-blue darken-4">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pokedex">Pokedex</Link></li>
                </ul>
            </nav>
		)
	}
}

export default Header;