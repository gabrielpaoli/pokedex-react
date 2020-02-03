import React, { Component } from 'react';

class Header extends Component{

	constructor() {
		super();
	}

	  
	render(){
		return (
            <nav className="light-blue darken-4">
                <div className="container">
                    <a className="brand-logo" href="/">POKEDEX</a>
                </div>
            </nav>
		)
	}
}

export default Header;