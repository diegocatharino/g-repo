import React, { Component } from "react";
import { connect } from "react-redux";

class BoxNumeros extends Component {
  render() {
    const { numStars, numForks, numContribs } = this.props;
    return (
      <div className="boxNumeros">
        <div className="numStars">
        	<div className="container">
	          <div className="label">Número de Stars</div>
	          <div className="valor">{numStars}</div>
        	</div>
        </div>	
        <div className="numForks">
        	<div className="container">
	          <div className="label">Número de Forks</div>
	          <div className="valor">{numForks}</div>
        	</div>
        </div>
        <div className="numContribs">
        	<div className="container">
	          <div className="label">Número de Contribs</div>
	          <div className="valor">{numContribs}</div>
        	</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    numStars: state.numStars,
    numForks: state.numForks,
    numContribs: state.numContribs
  };
};

export default connect(mapStateToProps)(BoxNumeros);
