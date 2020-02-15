import React, { Component } from 'react';

import Header from './general/Header';
import Pokemon from './Pokemon';
import Pokedex from './Pokedex';
import Footer from './general/Footer';

import { 
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"; 

class App extends Component{

	constructor() {
		super(); 
	}
	  
	render(){ 
		return (
            <Router>
                <Header/>

                <div className="container general-container-pokedex">
                    <div className="row">
                        <div className="col m12">
                            <Switch>
                                <Route path="/pokedex/:id" component={ Pokemon }></Route>
                                <Route path="/pokedex" component={ Pokedex }></Route>
                                <Route path="/" component={ Home }></Route>
                            </Switch>
                        </div>
                    </div>
			    </div>
                <Footer/>
            </Router>
		)
	}
}

function Home() {
    return <h2>Welcome</h2>;
}

export default App;