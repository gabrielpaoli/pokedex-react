import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

class Pokedex extends Component{

	render(){

		return (
			<div>
					{ useParams() }
			</div>
		)
	}
}

export default Pokedex;