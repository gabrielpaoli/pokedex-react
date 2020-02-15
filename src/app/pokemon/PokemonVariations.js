import React, { Component } from 'react';

class PokemonVariations extends Component{
	render(){
		return (
			<div>
				{this.props.varieties.length > 1 ? (
					<div className="select-varietes input-field">
					<select defaultValue={this.props.varieties[0].id[0]} onChange={this.props.handleChangeVariete}>
						{
							this.props.varieties.map((variete, key) => {
								return(
									<option key={key} value={variete.id}>{variete.name}</option>
								)
							})
						}
					</select>
					</div>
				) : (
					''
				)}	
			</div>
		)
	}
}

export default PokemonVariations;