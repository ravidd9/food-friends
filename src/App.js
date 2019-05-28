import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';



@inject("generalStore")
@observer
class App extends Component {
  render() {
    return (
      <div id="app">
        
      </div>
    );
  }
}

export default App;

