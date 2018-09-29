import React, { Component } from 'react';

class DropDown extends Component {
  state = {
    teams: [],
    selectedTeam: "",
    validationError: ""
  }
 
  componentDidMount() {
    fetch("https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let items = data.items.map(item => { return {value: item.name, display: item.name} })
        this.setState({ 
        	teams: [{value: '', display: 'Escolha um repositório'}].concat(items) });
      }).catch(error => {
        console.log(error);
      });
  }
 
  render() {
    return (
      <div>
        <select value={this.state.selectedTeam} 
                onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "Escolha um repositório" : ""})}>
          {this.state.teams.map((item) => <option key={item.value} value={item.value}>{item.display}</option>)}
        </select>
        <div style={{color: 'red', marginTop: '5px'}}>
          {this.state.validationError}
        </div>
      </div>
    )
  }
}

//Export
export default (DropDown);