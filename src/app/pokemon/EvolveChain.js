import React, { Component } from 'react';

class EvolveChain extends Component{
		
	orderedEvolveChain(chain){
		let orderedChain = [];
		let ceroLvl = [];
		let firstLvl = [];
		let secondLvl = [];
		let thirdLvl = [];

		ceroLvl.push(chain.species.name);
		chain.evolves_to.map(chainGeneral => {
			firstLvl.push(chainGeneral.species.name);
			chainGeneral.evolves_to.map(chainInn => {
				secondLvl.push(chainInn.species.name);
				chainInn.evolves_to.map(chainInnInn => {
					thirdLvl.push(chainInnInn.species.name);
				});
			});
		});

		orderedChain.push(ceroLvl);

		if(firstLvl.length > 0){
			orderedChain.push(firstLvl);
		}
		if(secondLvl.length > 0){
			orderedChain.push(secondLvl);
		}
		if(thirdLvl.length > 0){
			orderedChain.push(thirdLvl);
		}
console.log(orderedChain);
		return orderedChain;
	}

	render(){
		if (!this.props.chain.evolves_to) {
			return <span>Loading...</span>;
		}

		return (
			<div>
				{this.orderedEvolveChain(this.props.chain)}
						{
            
						}
            
			</div>
		)
	}
}

export default EvolveChain;