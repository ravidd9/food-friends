import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FoodRoom from './components/FoodRoom';
import Landing from './components/Landing';
import ShowMatch from './components/ShowMatch';
import ButtonAppBar from './components/ButtonAppBar';
import { Spring } from 'react-spring/renderprops';

import Chat from './components/Chat';

import TemporaryDrawer from './components/TemporaryDrawer';
import Profile from './components/Profile';
import SimpleSnackbar from './components/SimpleSnackbar';




@inject("generalStore")
@observer

class App extends Component {

  constructor(props) {
    super(props)

    this.socket = props.generalStore.socket

  }

  componentDidMount = async () => {
    await this.props.generalStore.getFoodsFromDB()
    await this.props.generalStore.getUsersFromDB()
  }

  componentDidUpdate = async () => {
    await this.props.generalStore.getFoodsFromDB()
    await this.props.generalStore.getUsersFromDB()
  }

  render() {

    this.props.generalStore.socketUsernameListener()
    
    return (
      
      
<Spring
     from={{ opacity: 0.6, marginTop: -50 }}
     to={{ opacity: 1, marginTop: 0 }}
    >
      {props => (
        <div style={props}>
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
        </div>
      )}
    </Spring>

    )
  }
}

export default App;

