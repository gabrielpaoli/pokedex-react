import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Pokedex extends Component{

	constructor() {
		super();
		this.state = {
			pokedexdata: [],
			offset: 0,
			limit: 20,
			spinner: true,
		}
	}

	componentDidMount() {
		this.getPokemons(this.state.offset, this.state.limit);
	}

	//TODO: agarrar el total de items y pasarselo al show more

	getPokemons(offset, limit){
		this.setState({spinner: true});

		fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
		.then(res =>res.json())
		.then(data => {
			this.setState({pokedexdata: this.state.pokedexdata.concat(data)});
			this.setState({spinner: false});
		});
	}

	parseId(url){
		let id = url.replace("https://pokeapi.co/api/v2/pokemon/", "");
		id = id.replace("/", "");
		return id;
	}

	pad(id){
		var s = String(id);
		while (s.length < (3 || 2)) {s = "0" + s;}
		return s;
	}

	showMore(){
		let newOffset = this.state.offset + 20;
		this.getPokemons(newOffset, this.state.limit);
		this.setState({offset: newOffset});
	}

	render(){
		if (!this.state.pokedexdata) {
			return <span>Loading...</span>;
		}

		return (
			<div>
				<div className="container">
					<div className="row">
						{
							this.state.pokedexdata.map(pokemon => {
								return (
									pokemon.results.map(pokemonInn => {
										return (
											<div key={pokemonInn.name} className="col m3">
												<Link to={`/pokedex/${this.parseId(pokemonInn.url)}`}>
													<div className="custom-card">
														<img className="image-100-responsive" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.pad(this.parseId(pokemonInn.url))}.png`} />
														<p className="center-align">{pokemonInn.name}</p>
													</div>
												</Link>
											</div>
										);
									})
								);
							})
						}
 
						<div className="center-align">
							<button className="btn light-blue darken-4 center-align" onClick={() => this.showMore()}> 
								{this.state.spinner ? (
									<i className="material-icons">sync</i>
								) : (
									'Show more'
								)}	
							</button>
						</div>
					</div>	
				</div>	
			</div>
		)
	}
}

export default Pokedex;
