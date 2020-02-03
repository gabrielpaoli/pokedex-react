import React, { Component } from 'react';
import Pokemon from './Pokemon';
import Pokedex from './Pokedex';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

class App extends Component{

	constructor() {
		super();
	}

	  
	render(){
		return (
            <Router>
                <nav className="light-blue darken-4">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/pokedex">Pokedex</Link>
                        </li>
                        <li>
                            <Link to="/pokemon">Pokemon</Link>
                        </li>
                    </ul>
                </nav>


                <Switch>
                    <Route path="/pokemon/:id">
                        <Pokemon/>
                    </Route>
                    <Route path="/pokedex">
                        <Pokedex/>
                    </Route>
                    <Route path="/">
                    <Home />
                    </Route>
                </Switch>
            </Router>
		)
	}
}

function Home() {
    return <h2>Welcome</h2>;
}

export default App;