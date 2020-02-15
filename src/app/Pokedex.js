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
			limitMinPokemon: 0,
			limitMaxPokemon: 807,
			searchMode: false
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.getPokemons(this.state.offset, this.state.limit);
	}

	//TODO 1: agarrar el total de items y pasarselo al show more
	//TODO 2: Seguramente se puede hacer un split de las dos llamadas 
	getPokemons(offset, limit, pokemonName=null){
		this.setState({spinner: true});
		this.setState({searchMode: false});

		if(pokemonName === ''){
			this.setState({pokedexdata: []});
		}

		if(pokemonName !== null && pokemonName !== ''){	
			this.setState({searchMode: true});
			this.setState({pokedexdata: []});
			var resultsF = {};
			resultsF.results = []

			fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=807`)
			.then(res =>res.json())
			.then(data => {				
				for (var i=0 ; i < data.results.length ; i++)
				{
					if(data.results[i]["name"].includes(pokemonName)){
						resultsF.results.push(data.results[i]);
					}
				}
				this.setState({pokedexdata: this.state.pokedexdata.concat(resultsF)});
				this.setState({spinner: false});
			});
		}else{
			fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
			.then(res =>res.json())
			.then(data => {
				this.setState({pokedexdata: this.state.pokedexdata.concat(data)});
				this.setState({spinner: false});
			});
		}

	}

	parseId(url){
		let id = url.split("/");
		id = id.slice(-2, -1);
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

	//TODO: Si no le paso 0, 0 como parametro llama a toda la lista....
	handleChange(e) {
		const { name, value } = e.target;
		let min = (value === '') ? 0 : this.state.limitMinPokemon;
		let max = (value === '') ? 20 : this.state.limitMaxPokemon;
		this.getPokemons(min, max, value.toLowerCase());
    }

	render(){
		if (!this.state.pokedexdata) {
			return <span>Loading...</span>;
		}

		return (
			<div>
				<div className="input-field col s12">
					<input type="text" onChange={this.handleChange} placeholder="Search" />
				</div>

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

				<div className="center-align col s12">
				{!this.state.searchMode ? (
					<button className="btn light-blue darken-4 center-align" onClick={() => this.showMore()}> 
						{this.state.spinner ? (
							<i className="material-icons">sync</i>
						) : (
							'Show more'
						)}	
					</button>
				) : (
					''
				)}	
				</div>
			</div>
		)
	}
}

export default Pokedex;
