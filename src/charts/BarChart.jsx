import * as d3 from "d3";
import { Fragment, useEffect, useRef } from "react";

export default function BarChart({ height, width, data }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");
  }, [width, height]);

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const svg = d3.select(ref.current);
    const selection = svg.selectAll("rect").data(data);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, height - 100]);
    selection
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 90 + 45)
      .attr("y", height)
      .attr("height", 0)
      .attr("width", 40)
      .attr("fill", "orange")
      .transition()
      .duration(300)
      .attr("height", (d) => yScale(d))
      .attr("y", (d) => height - yScale(d));

    // selection
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 90)
    //   .attr("y", (d) => height)
    //   .attr("width", 40)
    //   .attr("height", 0)
    //   .attr("fill", "orange")
    //   .transition()
    //   .duration(300)
    //   .attr("height", (d) => yScale(d))
    //   .attr("y", (d) => height - yScale(d));

    selection
      .exit()
      .transition()
      .duration(300)
      .attr("y", (d) => height)
      .attr("height", 0)
      .remove();
  };

  //   const selection = svg.selectAll("rect").data(data);
  return (
    <Fragment>
      <svg ref={ref}></svg>
    </Fragment>
  );
}
