import React, { Component } from 'react';

class PokemonGraph extends Component{
	render(){
		return (
        <div>
            <div className="bar-graph">
                {
                    this.props.stats.map(statGeneral => {
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
		)
	}
}

export default PokemonGraph;