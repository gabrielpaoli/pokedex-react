import React, { Component } from 'react';

class PokemonAttributes extends Component{
	render(){
		return (
			<div>
					<h5 className="subtitle">Attributes</h5>
					<div className="attribute-data light-blue darken-1 col s12">
							<div className="col m6">
									<div className="white-text attribute-title">Height</div>
									<div className="attribute-value">{this.props.height} ft</div>
									<div className="white-text attribute-title">Weight</div>
									<div className="attribute-value">{this.props.weight} lb</div>
							</div>
							
							<div className="col m6">
									<div className="white-text attribute-title">Category</div>
									<div className="attribute-value">{this.props.category}</div>
									<div className="white-text attribute-title">Hability</div>
									<div className="attribute-value">{this.props.hability}</div>
							</div>
					</div>
			</div>
		)
	}
}

export default PokemonAttributes;
