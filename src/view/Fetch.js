import React from "react";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

class Grafico extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      rows: [],
      isLoading: false,
      error: null
    };
  }
  componentDidMount() {
    this.atualizaGrafico();
  }

  atualizaGrafico(url = null) {
    if (url == null)
      url =
        "https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200";
    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.items) {
          let items = result.items.map(item => {
            return [item.name, item.watchers];
          });
          this.setState({
            rows: [["name", "watchers"], ...items]
          });
        }
      });
  }

  render() {
    const { rowCommits } = this.props;
    return (
      <div className={"chart-container"}>
        <div className="label commits">Commits: <strong>{rowCommits}</strong></div>
        <div className="label watchers">Watchers: </div>
        <Chart
          width={window.window.innerWidth}
          height={300}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={this.state.rows}
          options={{
            intervals: { style: "sticks" },
            legend: "none"
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rowCommits: state.rowCommits
  };
};
export default connect(mapStateToProps)(Grafico);
