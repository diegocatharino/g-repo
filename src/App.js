import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';
import logo from './logo.png';
import './App.css';
import Fetch from './view/Fetch';
import DropDown from './view/DropDown';


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="glb-topo">          
          <h1 className="App-title"><img src={logo} className="App-logo" alt="logo" />-Repo</h1>
        </header> 
        <DropDown />
        <Fetch />
      </div>
    );
  }
}

  
export default App;
