import * as d3 from "d3";
import { Fragment, useEffect, useState, useRef } from "react";

export default function LineChart({ width, height, lineData }) {
  const [data, setData] = useState([]);
  const [count, setI] = useState(0);
  const getData = () => {
    lineData.then((item) => setData(item));
  };
  getData();

  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).attr("width", width).attr("height", height);
  }, [width, height]);

  useEffect(() => {
    drawChart();
  }, [data]);

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const lineGenerator = d3
    .line()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.value));

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d.date)))
    .range([margin.left, width - margin.right]);

  const getMax = () => {
    let tmp = [];
    data.map((item) => {
      tmp.push(item.value);
    });
    return Math.max.apply(null, tmp);
  };
  getMax();

  const y = d3
    .scaleLinear()
    .domain([0, getMax()])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(data.y)
      );
  const drawChart = () => {
    setI(count + 1);
    if (data.length > 0) {
      const svg = d3.select(ref.current);

      // .style("margin", "20px 30px 30px 40px");

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", lineGenerator);
    }
  };
  return (
    <Fragment>
      <svg ref={ref}></svg>
    </Fragment>
  );
}
