import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FoodRoom from './components/FoodRoom';
import Landing from './components/Landing';
import ShowMatch from './components/ShowMatch';
import ButtonAppBar from './components/ButtonAppBar';



@inject("generalStore")
@observer

class App extends Component {

  componentDidMount = async () => {
    await this.props.generalStore.getFoodsFromDB()
    await this.props.generalStore.getUsersFromDB()
  }

  componentDidUpdate = async () => {
    await this.props.generalStore.getFoodsFromDB()
    await this.props.generalStore.getUsersFromDB()
  }

  render() {
    return (
      <div id="app">
        <ButtonAppBar />
        <Router>
          <Route exact path='/' render={() => <Landing />} />
          <Route exact path='/home' render={() => <HomePage />} />
          <Route exact path='/food-room' render={() => <FoodRoom />} />
          <Route exact path='/show-match' render={() => <ShowMatch />} />

        </Router>
      </div>
    )
  }
}

export default App;

