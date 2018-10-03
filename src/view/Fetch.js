import React from "react";
import { connect } from "react-redux";

class Grafico extends React.Component{

  render(){

    const { graficoLink, rowCommits } = this.props;

    if( !graficoLink ){
      return( <div className="chart-container"><div className="label commits">Commits: <strong>{rowCommits}</strong></div></div> );  
    }
    //se não tiver parâmetro de link passando, não apresenta gráfico, se sim, carrega
    return(
      <div className="chart-container">
        <h2>Commits</h2>
        <div className="label commits">Commits: <strong>{rowCommits}</strong></div>
        <img alt="Commits" src={`http://chart.apis.google.com/chart?${graficoLink}`} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    rowCommits: state.rowCommits,
    repositorio: state.repositorio,
    graficoLink: state.graficoLink
  };
};
export default connect(mapStateToProps)(Grafico);
