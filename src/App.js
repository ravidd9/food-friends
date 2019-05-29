import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FoodRoom from './components/FoodRoom';
import Landing from './components/Landing';



@inject("generalStore")
@observer

class App extends Component {

  componentDidMount = async () => {
    await this.props.generalStore.getFoods()
    await this.props.generalStore.getUsers()
  }

  render() {
    return (
      <Router>
        <Route exact path='/' render={() => <Landing />} />
        <Route exact path='/home' render={() => <HomePage />} />
        <Route exact path='/food-room' render={() => <FoodRoom />} />
      </Router>
    )
  }
}

export default App;

