import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PokemonGraph from './pokemon/PokemonGraph';
import PokemonAttributes from './pokemon/PokemonAttributes';
import PokemonType from './pokemon/PokemonType';
import PokemonVariations from './pokemon/PokemonVariations';
import EvolveChain from './pokemon/EvolveChain';
import Img from 'react-image';

class Pokemon extends Component{

	constructor() {
		super();
		this.state = {
			pokeId: 1,
			pokedata: [],
			pokeGeneralInfo: [],
			language: 'en',
			evolutionChain: [],
			loading: true,
			varieties: [],
			varieteImage: 0,
		}

	    this.parseId= this.parseId.bind(this);
	    this.pad= this.pad.bind(this);
	    this.getAllPokemonInfo= this.getAllPokemonInfo.bind(this);
		this.handleChangeVariete = this.handleChangeVariete.bind(this);
	}
	
	getPokemon(id){
		this.setState({loading: true});
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(res =>res.json())
		.then(data => {
			console.log(data);
			this.setState({pokedata: data});
		});
	}
 
	getPokemonGeneralInfo(id){
		let varieties = [];
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
		.then(res =>res.json())
		.then(data => {
			console.log(data);
			this.setState({pokeGeneralInfo: data});
			this.getEvolutionChain(this.state.pokeGeneralInfo.evolution_chain.url);
			data.varieties.map(variete => {
				varieties.push({'name': variete.pokemon.name, 'id': this.parseId(variete.pokemon.url), 'base_pokemon': this.pad(data.id)});
				this.setState({varieties: varieties});
			});
		});
	}

	getEvolutionChain(chain){
		fetch(chain)
		.then(res =>res.json())
		.then(data => {
			if(data.chain){
				this.setState({evolutionChain: data.chain});
				this.setState({loading: false});
			}
		});
	}

	componentDidMount() {
		let pokemonId = 1; 
		if(this.props.match.params.id){
			pokemonId = parseInt(this.props.match.params.id);
			this.setState({pokeId: pokemonId});
		}
		this.getAllPokemonInfo(pokemonId);

	}

	getAllPokemonInfo(id){
		this.setState({pokeId: id});
		this.getPokemon(id);
		this.getPokemonGeneralInfo(id);
		this.setState({varieteImage: 0});
	}

	prevPokemon(id){
		if(id > 1){
			var id = id - 1;
			this.setState({varieteImage: 0});
			this.setState({pokeId: id});
			this.getAllPokemonInfo(id);
		}
	}

	nextPokemon(id){
		if(id < 807){
			var id = id + 1;
			this.setState({varieteImage: 0});
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

	next(id){
		if(id < 807){
			return id + 1;
		}
		return 807;
	}

	prev(id){
		if(id > 1){
			return id - 1;
		}
		return 1;
	}

	removePokemonWord(text){
		return text.replace(" Pokémon", "");
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

	//TODO: El hardfix del + 1 es porque no tengo las imagenes en local.
	handleChangeVariete(e) {
		const {value} = e.target;
		this.getPokemon(value);
		if(e.target.selectedIndex > 0){
			this.setState({varieteImage: e.target.selectedIndex + 1});
		}else{
			this.setState({varieteImage: 0});
		}
		this.setState({loading: false});
    }

	render(){
		if (!this.state.pokeGeneralInfo.flavor_text_entries ||
			!this.state.pokedata.stats ||
			!this.state.evolutionChain) {
				return <div></div>;
		} 

		let varieteImageInn = this.pad(this.state.pokedata.id);
		if(this.state.varieteImage > 0){
			varieteImageInn = this.state.varieties[0].base_pokemon + '_f' + this.state.varieteImage;
		}

		return (

			<div className='card'>

				<h3 className="center title">
					{this.state.pokedata.name}  <span className="grey-text text-darken-1">N.°{this.pad(this.state.pokedata.id)}</span>
				</h3>

				<div className="container-select-variations col s12">
					<PokemonVariations 
						varieties={this.state.varieties} 
						handleChangeVariete = {this.handleChangeVariete.bind(this)}
					/>
				</div>

				<div className="row">
					<div className="col m5">
						<div className="container-pokemon-image">
							<Img 
								className="image-100-responsive pokemon-image" 
								src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${varieteImageInn}.png`} 
								loader={<div className='images-loader'><img src="../images/loader.gif" /></div>}
							/>
						</div>

						<div className="col m12">
							<PokemonGraph stats = {this.state.pokedata.stats} />
						</div>

					</div>
					<div className="col m7">
						
						<div className="col s12">
							<h5 className="subtitle">Description</h5>
							{this.getDescriptionPerLanguage(this.state.pokeGeneralInfo.flavor_text_entries)}
						</div>
				
						<div className="col s12">
							<PokemonAttributes 
								height = {this.state.pokedata.height}
								weight = {this.state.pokedata.weight}
								category = {this.removePokemonWord(this.state.pokeGeneralInfo.genera[2].genus)}
								hability = '?'
							/>
						</div>

						<div className="col s12">
							<PokemonType types = {this.state.pokedata.types} />
						</div>

					</div>	
				
					<div className="col s12">
						<EvolveChain 
							chain = {this.state.evolutionChain} 
							parseChain = {this.parseId.bind(this)} 
							pad = {this.pad.bind(this)} 
							getAllPokemonInfo = {this.getAllPokemonInfo.bind(this)} 
						/>
					</div>

				</div>

				<div>
					<Link to={`/pokedex/${this.prev(this.state.pokeId)}`} onClick={() => this.prevPokemon(this.state.pokeId)}>
					<button disabled={this.state.loading} className="btn light-blue darken-4 left"> 
							<i className="material-icons">arrow_back</i>
						</button>
					</Link>

					<Link to={`/pokedex/${this.next(this.state.pokeId)}`} onClick={() => this.nextPokemon(this.state.pokeId)}>
						<button disabled={this.state.loading} className="btn light-blue darken-4 right"> 
							<i className="material-icons">arrow_forward</i>
						</button>
					</Link>
				</div>

			</div>

		)
	}
}

export default Pokemon;