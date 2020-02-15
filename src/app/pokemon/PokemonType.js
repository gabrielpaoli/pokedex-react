import React, { Component } from 'react';

class PokemonType extends Component{
	render(){
		return (
			<div>
				<h5 className="subtitle">Type</h5>
				{
					this.props.types.map(typeGeneral => {
						return (
								<div key={typeGeneral.type.name} className="col s3">
									<div className={`background-color-${typeGeneral.type.name} container-type`}>{typeGeneral.type.name}</div>
								</div>
						);
					}).reverse()
				}
			</div>
		)
	}
}

export default PokemonType;