import "./App.css";
import BarChart from "./charts/BarChart";
import CircleChart from "./charts/CircleChart";
import React from "react";
import LineChart from "./charts/LineChart";
import * as d3 from "d3";
import LINE_DATA from "./lineData.csv";
import PieChart from "./charts/PieChart";
import pieData from "./pieData.js";

function App() {
  // const [lineData, setLineData] = useState([]);
  const dataset = [10, 40, 30, 20, 50, 10];
  const circles = [32, 57, 112, 293, 600];
  // let lineData;
  // d3.csv(LINE_DATA).then((data) => {
  //   console.log(data);
  //   lineData = data;
  //   console.log("1111", lineData);
  // });
  const getLine = async () => {
    return await d3.csv(LINE_DATA);
  };

  return (
    <div className="App">
      <h3>Bar Chart</h3>
      <BarChart width={600} height={400} data={dataset} />
      <h3>Circles</h3>
      <CircleChart width={600} height={150} data={circles} />
      <h3>Line Chart</h3>
      <LineChart width={500} height={500} lineData={getLine()} />
      <h3>Pie Chart</h3>
      <PieChart width={500} height={500} pieData={pieData} />
    </div>
  );
}

export default App;
