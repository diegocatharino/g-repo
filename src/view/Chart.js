import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { Chart } from "react-google-charts";

const ExampleChart = () => {
  return (
    <Chart
      chartType="LineChart"
      rows={[[8, 12], [4, 5.5], [11, 14], [4, 5], [3, 3.5], [6.5, 7]]}
      columns={[
        {
          type: "number",
          label: "Idade"
        },
        {
          type: "number",
          label: "Peso"
        }
      ]}
      options={
        // Chart options
        {
          title: "Idade vs. Peso",
          hAxis: {
            title: "Idade",
            viewWindow: { min: 0, max: 15 }
          },
          vAxis: { title: "Peso", viewWindow: { min: 0, max: 15 } },
          legend: "none"
        }
      }
      width={"100%"}
      height={"400px"}
      legendToggle
    />
  );
};
export default ExampleChart;