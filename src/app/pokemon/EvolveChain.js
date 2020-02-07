import React, { Component } from 'react';
import Img from 'react-image';
import {Link} from "react-router-dom";

class EvolveChain extends Component{
	constructor() {
		super();
	}

	orderedEvolveChain(chain){
		let orderedChain = [];
		let zeroLvl = [];
		let firstLvl = [];
		let secondLvl = [];
		let thirdLvl = [];
		let imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
		zeroLvl.push({id: this.props.parseChain(chain.species.url) ,'name':chain.species.name, 'url':`${imgUrl}${this.props.pad(this.props.parseChain(chain.species.url))}.png`});
		chain.evolves_to.map(chainGeneral => {
			firstLvl.push({id: this.props.parseChain(chainGeneral.species.url) ,'name':chainGeneral.species.name, 'url':`${imgUrl}${this.props.pad(this.props.parseChain(chainGeneral.species.url))}.png`});
			chainGeneral.evolves_to.map(chainInn => {
				secondLvl.push({id: this.props.parseChain(chainInn.species.url) ,'name':chainInn.species.name, 'url':`${imgUrl}${this.props.pad(this.props.parseChain(chainInn.species.url))}.png`});
				chainInn.evolves_to.map(chainInnInn => {
					thirdLvl.push({id: this.props.parseChain(chainInnInn.species.url) ,'name':chainInnInn.species.name, 'url':`${imgUrl}${this.props.pad(this.props.parseChain(chainInnInn.species.url))}.png`});
				});
			});
		});

		orderedChain.push(zeroLvl);

		if(firstLvl.length > 0){
			orderedChain.push(firstLvl);
		}
		if(secondLvl.length > 0){
			orderedChain.push(secondLvl);
		}
		if(thirdLvl.length > 0){
			orderedChain.push(thirdLvl);
		}

		return orderedChain;
	}

	render(){
		if (!this.props.chain.evolves_to) {
			return <p className="center-align">Loading...</p>;
		}

		return (
			<div className="evolve-chain-general">
				<h5 className="title-evolution">Evolutions</h5>
				<div className="evolve-chain">
					{
						this.orderedEvolveChain(this.props.chain).map((pokeGeneral, key0) => {
							return(
								<div key={key0} className={`evolve-container-inn evolve-container-inn-${key0}`}>
									{
									pokeGeneral.map((pokeGeneralInn, key1) => {
										return(
											<div key={key1} className="evolve-pokemon">


											<Link to={`/pokedex/${pokeGeneralInn.id}`} onClick={() => this.props.getAllPokemonInfo(pokeGeneralInn.id)}>
												<Img 
													className={`image-100-responsive evolve-image-${key0}`}
													src={pokeGeneralInn.url} 
													loader={<div className='images-loader'><img src="../images/loader.gif" /></div>}
												/>
												<div>{pokeGeneralInn.name}</div>
											</Link>

											</div>
										);
									})
									}
									{key0 + 1 < this.orderedEvolveChain(this.props.chain).length && <div className="evolve-arrow">></div>}
								</div>
							);
						})
					}
				</div>
			</div>
		)
	}
}

export default EvolveChain;