import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FoodRoom from './components/FoodRoom';
import Landing from './components/Landing';
import ShowMatch from './components/ShowMatch';
import ButtonAppBar from './components/ButtonAppBar';

import Chat from './components/Chat';

import TemporaryDrawer from './components/TemporaryDrawer';
import Profile from './components/Profile';
import SimpleSnackbar from './components/SimpleSnackbar';




@inject("generalStore")
@observer

class App extends Component {

  componentDidMount = async () => {
    await this.props.generalStore.getFoodsFromDB()
    await this.props.generalStore.getUsersFromDB()
    window.navigator.geolocation.getCurrentPosition(function(pos) {
      console.log(pos)
    })
  }

  componentDidUpdate = async () => {
    await this.props.generalStore.getFoodsFromDB()
    await this.props.generalStore.getUsersFromDB()
  }

  render() {
    return (
      <Router>
        <SimpleSnackbar />
        <ButtonAppBar />

        <Route exact path='/' render={() => <Landing />} />
        <Route exact path='/home' render={() => <HomePage />} />
        <Route exact path='/food-room' render={() => <FoodRoom />} />
        <Route exact path='/show-match' render={() => <ShowMatch />} />
        <Route exact path='/chat' render={() => <Chat />} /> 
        <Route exact path='/profile' render={() => <Profile />} />

      </Router>

    )
  }
}

export default App;

