import React, { Component } from "react";
import { connect } from "react-redux";

class DropDown extends Component {
  //Carregar os repositorios no select
  componentDidMount() {
    const { cadaRepositorio } = this.props;
    cadaRepositorio();
  }

  state = {
    repositoriosSelect: [],
    selectedOption: "",
    validationError: ""
  };

  componentDidMount() {
    fetch(
      "https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let items = data.items.map(item => {
          return { value: item.id, display: item.name };
        });
        this.setState({
          data: data.items,
          repositoriosSelect: [
            { value: "null", display: "Escolha um repositório" }
          ].concat(items)
        });
      })
      .catch(error => {
      });
  }

  render() {
    const { mudaOpcoes, noRepositorio, repositorios, mudaGrafico } = this.props;
    return (
      <div className="dropDown">
        <select
          value={this.state.selectedOption}
          onChange={e => {
            let selected = this.state.data.find(item => {
              return item.id == e.target.value;
            });
            this.setState({
              selectedOption: e.target.value,
              validationError:
                e.target.value === "null" ? "Escolha um repositório" : ""
            });
            mudaOpcoes(selected);
            mudaGrafico(selected);
          }}
        >
          {this.state.repositoriosSelect.map(item => (
            <option key={item.value} value={item.value}>
              {item.display}
            </option>
          ))}
        </select>
        <div style={{ color: "red", marginTop: "5px" }}>
          {this.state.validationError}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    noRepositorio: state.noRepositorio,
    repositorios: state.repositorios,
    numStars: state.numStars,
    numForks: state.numForks,
    numContribs: state.numContribs,
    rowCommits: state.rowCommits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cadaRepositorio: () => {
      fetch(
        "https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200"
      )
        .then(res => res.json())
        .then(result => {
          dispatch({ type: "CADAREPOSITORIO", payload: result.items });
        });
    },
    mudaGrafico: grafico => {
      fetch(`https://api.github.com/repos/globocom/${grafico.name}/commits?per_page=999999`)
        .then(res => res.json())
        .then(result => {
          dispatch({
            type: "MUDAGRAFICO",            
            rowCommits: result ? result.length : false
          });
        });
    },
    mudaOpcoes: repositorio => {
      fetch(
        `https://api.github.com/repos/globocom/${repositorio.name}/contributors`
      )
        .then(res => res.json())
        .then(result => {
          dispatch({
            type: "BOXNUMEROS",
            numStars: repositorio ? repositorio.stargazers_count : 0,
            numForks: repositorio ? repositorio.forks_count : 0,
            numContribs: result ? result.length : false
          });
        });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDown);
