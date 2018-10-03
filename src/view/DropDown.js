import React, { Component } from "react";
import { connect } from "react-redux";

class DropDown extends Component {

  state = {
    repositoriosSelect: [],
    selectedOption: "",
    validationError: ""
  };
  //Carregar os repositorios no select
  componentDidMount() {
    const { cadaRepositorio } = this.props;
    cadaRepositorio();
    fetch(
      "https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let items = data.items.map(repositorio => {
          return { value: repositorio.id, display: repositorio.name };
          //pegando os dados que preciso da api, nome e id dos repositórios
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
    const { mudaOpcoes, mudaGrafico } = this.props;    
    return (
      <div className="dropDown">
        <select
          value={this.state.selectedOption}
          onChange={e => {
            let selected = this.state.data.find(repositorio => {
              return repositorio.id == e.target.value;
            });
            this.setState({
              selectedOption: e.target.value,
              validationError:
                e.target.value === "null" ? "Escolha um repositório" : ""
            });
            mudaOpcoes(selected);
            mudaGrafico(this.props.grafico, selected);
            //as ações que ocorrem quando o option do select é selecionado
          }}
        >
          {this.state.repositoriosSelect.map(repositorio => (
            <option key={repositorio.value} value={repositorio.value}>
              {repositorio.display}
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
    repositorio: state.repositorio,
    numStars: state.numStars,
    numForks: state.numForks,
    numContribs: state.numContribs,
    rowCommits: state.rowCommits,
    grafico: state.grafico,
    graficoLink: state.graficoLink
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cadaRepositorio: () => {
      fetch(
        "https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200"
      )
        .then(res => res.json())
        .then(result => { dispatch({ type: "CADAREPOSITORIO", payload: result.items }); });
    },
    mudaGrafico: (grafico,repositorio) => {
      dispatch({ type: 'REPOSITORIO', payload: repositorio.name });

          fetch( `https://api.github.com/repos/globocom/${repositorio.name}/commits?per_page=99999` )
     
        .then(res => res.json())
        .then(result => {
              dispatch({ type: "MUDAGRAFICO", rowCommits: result ? result.length : false });
              let months    = [ '01', '02', '03', '04','05', '06', '07', '08', '09', '10', '11', '12' ], valorData = [], chxl = '1:|', chd = 't:';
                result.map( function( commit ){
                  let dataCadaCommit  = new Date( commit.commit.committer.date ),
                    key = dataCadaCommit.getFullYear() + '-' + ( dataCadaCommit.getMonth() + 1 );
                    valorData[key] = (valorData[key] == undefined ? 1 : valorData[key] + 1 );
                });
                //JavaScript Get Date Methods - Associando data dos commits com método de data do JS pra gerar os parâmetros corretos do link que vai gerar o gráfico
                let nextDate = '';
                for ( let i = 1; i <= 12; i++ ) {
                  if( nextDate == '' )
                    nextDate = Object.keys(valorData)[0];
                  let data = new Date( nextDate );                
                  chxl += months[data.getMonth()] + '/'+ data.getFullYear() +'|';
                  chd += (valorData[nextDate] != undefined ? valorData[nextDate] : 0 ) + ( i != 12 ? ',' : '' );
                  data = new Date( nextDate );
                  data.setMonth( data.getMonth() - 1 );                  
                  nextDate = data.getFullYear() + '-' + (data.getMonth() + 1);
                }
                let parametroGrafico = '', newChart = grafico; newChart.chxl = chxl; newChart.chd  = chd;
                for( let key in newChart ){
                  parametroGrafico += key + '=' + ( newChart[key] != undefined ? newChart[key] : '' ) + '&';
                }
                dispatch({ type: 'GRAFICOLINK', payload: parametroGrafico }); //despacha a variável graficoLink pro arquivo do Grafico pra carregar o desenho certo por repositório
        });
    },
    mudaOpcoes: repositorio => {
      fetch(
        `https://api.github.com/repos/globocom/${repositorio.name}/contributors`
      )
        .then(res => res.json())
        .then(result => {
          dispatch({ type: "BOXNUMEROS", numStars: repositorio ? repositorio.stargazers_count : 0, numForks: repositorio ? repositorio.forks_count : 0, numContribs: result ? result.length : false,
            //os números que vão pro box de números de cada option
          });
        });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDown);
