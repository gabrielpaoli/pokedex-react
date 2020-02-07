import React, { Component } from 'react';
import Pokemon from './Pokemon'

class PokedexLayout extends Component{
	render(){
		return (
			<div className="container general-container-pokedex">
				<div className="row">
					<div className="col m12">
						<Pokemon idParameter = {this.props.match.params.id}/>
					</div>
				</div>
			</div>
		)
	}
}

export default PokedexLayout;