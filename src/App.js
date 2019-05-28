import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import FoodRoom from './components/FoodRoom';



@inject("generalStore")
@observer

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/home' render={() => <HomePage />}/>
        <Route exact path='/food-room' render={() => <FoodRoom />}/>
      </Router>
    )
  }
}

export default App;

