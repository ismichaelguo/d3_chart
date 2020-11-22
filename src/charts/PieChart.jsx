import * as d3 from "d3";
import { color, selectAll } from "d3";
import { Fragment, useEffect, useState, useRef } from "react";

export default function PieChart({ width, height, pieData }) {
  const ref = useRef();
  const data = pieData;
  console.log("data", data);

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("border", "1px solid black");
  }, [width, height]);

  useEffect(() => {
    drawChart();
  }, []);
  height = Math.min(width, 500);
  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value);

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  const radius1 = (Math.min(width, height) / 2) * 0.8;

  const arcLabel = d3.arc().innerRadius(radius1).outerRadius(radius1);

  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(
      d3
        .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
        .reverse()
    );
  const drawChart = () => {
    const svg = d3.select(ref.current).append("g").attr("stroke", "white");

    svg
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .append("text")
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .call((text) => text.append("tspan"))
      .attr("y", "-0.4em")
      .attr("font-weight", "bold")
      .text((d) => d.data.name)
      .call((text) => text.filter((d) => d.endAngle - d.startAngle > 0.25))
      .append("tspan")
      .attr("x", 0)
      .attr("y", "0.7em")
      .attr("fill-opacity", 0.7)
      .text((d) => d.data.value);
  };

  return (
    <Fragment>
      <svg ref={ref}></svg>
    </Fragment>
  );
}
