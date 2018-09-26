import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';
import logo from './logo.png';
import './App.css';
import Drawn from './view/Chart';


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="glb-topo">          
          <h1 className="App-title"><img src={logo} className="App-logo" alt="logo" />-Repo</h1>
        </header> 

        <Drawn />
      </div>
    );
  }
}

  
export default App;
