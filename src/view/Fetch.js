import React from "react";
import { Chart } from "react-google-charts";

class Dados extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      rows: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200")
      .then(response => response.json())
      .then(result => {
        if (result.items) {
          let items = result.items.map(item => {
            console.log(item);
            return [item.name, item.watchers];
          });
          this.setState({
            rows: [["name", "watchers"], ...items]
          });
        }
      });
  }

  render() {
    console.log(this.state.rows);
    return (
      <div className={"chart-container"}>
        <Chart
          chartType="LineChart"
          data={this.state.rows}
          options={{}}
          graph_id="LineChart"
          width={"100%"}
          height={"400px"}
        />
      </div>
    );
  }
}

export default Dados;
