import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';
import HomePage from './components/HomePage';



@inject("generalStore")
@observer
class App extends Component {
  render() {
    return (
      <div id="app">
        <HomePage />
      </div>
    );
  }
}

export default App;

