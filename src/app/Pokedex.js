import React, { Component } from 'react';

class Pokedex extends Component{

	constructor() {
		super();
		this.state = {
			pokeId: 1,
			pokedata: [],
			pokeGeneralInfo: [],
			language: 'en',
			render: '',
		}
	}

	getPokemon(id){
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res =>res.json())
		.then(data => {
			this.setState({pokedata: data});
		});
	}

	getPokemonGeneralInfo(id){
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
		.then(res =>res.json())
		.then(data => {
			this.setState({pokeGeneralInfo: data});
		});
	}

	componentDidMount() {
		this.getAllPokemonInfo(1);
	}

	getAllPokemonInfo(id){
		this.getPokemon(id);
		this.getPokemonGeneralInfo(id);
		console.log(this.state);
	}

	prevPokemon(id){
		if(id > 1){
			var id = id - 1;
			this.setState({pokeId: id});
			this.getAllPokemonInfo(id);
		}
	}

	nextPokemon(id){
		if(id < 721){
			var id = id + 1;
			this.setState({pokeId: id});
			this.getAllPokemonInfo(id);
		}
	}

	getDescriptionPerLanguage(entries){
		let text = '';
		entries.map(entry => {
			if(entry.language.name === this.state.language && text === ''){
				text = entry.flavor_text;
			}
		});
		return text;
	}

	removePokemonWord(text){
		return text.replace(" Pokémon", "");
	}

	pad(id) {
		var s = String(id);
		while (s.length < (3 || 2)) {s = "0" + s;}
		return s;
	}
	  
	render(){
		if (!this.state.pokeGeneralInfo.flavor_text_entries) {
				return <span>Loading...</span>;
		}
		return (
			<div>
					<div className="row">
						<div className="col m12">
							<div className="card">
								<h3 className="center title">
									{this.state.pokedata.name}  <span className="grey-text text-darken-1">N.°{this.pad(this.state.pokedata.id)}</span>
								</h3>
								<div className="container general-container-pokedex">
									<div className="row">
										<div className="col m5">
										<img className="image-100-responsive" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.pad(this.state.pokedata.id)}.png`} />
										
										<div className="bar-graph">
											{
												this.state.pokedata.stats.map(statGeneral => {
													return (
															<div key={statGeneral.stat.name} className="col s2">
																<div className="bar" style={{height: statGeneral.base_stat}}></div>
															</div>
													);
												})
											}
										</div>
										
										<div className="col s2">
											<div className="title-bar">Speed</div>
										</div>
										<div className="col s2">
											<div className="title-bar">Special Defense</div>
										</div>
										<div className="col s2">
											<div className="title-bar">Special Attack</div>
										</div>
										<div className="col s2">
											<div className="title-bar">Defense</div>
										</div>
										<div className="col s2">
											<div className="title-bar">Attack</div>
										</div>
										<div className="col s2">
											<div className="title-bar">Hp</div>
										</div>

										</div>
										<div className="col m7">
											<div className="col m12">
												<h5 className="subtitle">Description</h5>
												{this.getDescriptionPerLanguage(this.state.pokeGeneralInfo.flavor_text_entries)}
											</div>
											<div className="col m12">
												<h5 className="subtitle">Attributes</h5>
												<div className="attribute-data light-blue darken-1 col s12">
														<div className="col m6">
															<div className="white-text attribute-title">Height</div>
															<div className="attribute-value">{this.state.pokedata.height} ft</div>
															<div className="white-text attribute-title">Weight</div>
															<div className="attribute-value">{this.state.pokedata.weight} lb</div>
														</div>
														
														<div className="col m6">
															<div className="white-text attribute-title">Category</div>
															<div className="attribute-value">{this.removePokemonWord(this.state.pokeGeneralInfo.genera[2].genus)}</div>
															<div className="white-text attribute-title">Hability</div>
															<div className="attribute-value">?</div>
														</div>
												</div>
											</div>

											<div className="col m12">
												<h5 className="subtitle">Type</h5>
												{
													this.state.pokedata.types.map(typeGeneral => {
														return (
																<div key={typeGeneral.type.name} className="col s3">
																	<div className={`background-color-${typeGeneral.type.name} container-type`}>{typeGeneral.type.name}</div>
																</div>
														);
													}).reverse()
												}
											</div>


										</div>	
									</div>

								</div>
							</div>

							<div>
								<button className="btn light-blue darken-4 left" onClick={() => this.prevPokemon(this.state.pokeId)}> 
									<i className="material-icons">arrow_back</i>
								</button>
								<button className="btn light-blue darken-4 right" onClick={() => this.nextPokemon(this.state.pokeId)}> 
									<i className="material-icons">arrow_forward</i>
								</button>
							</div>
						</div>
				</div>
			</div>
		)
	}
}

export default Pokedex;