import React from 'react';
import { render } from 'react-dom';
import TasksForm from './TasksForm';
import Header from './Header';
import Pokedex from './Pokedex';

//render(<TasksForm/>, document.getElementById('taskForm')); 

render(<Header/>, document.getElementById('header')); 
render(<Pokedex/>, document.getElementById('pokedex')); 