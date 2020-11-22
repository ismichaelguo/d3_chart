import * as d3 from "d3";
import { Fragment, useEffect, useRef } from "react";

export default function CircleChart({ width, height, data }) {
  const ref = useRef();
  useEffect(() => {
    d3.select(ref.current)
      .attr("height", height)
      .attr("width", width)
      .style("border", "1px solid black");
  }, [width, height]);

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const svg = d3.select(ref.current);
    const selection = svg.selectAll("circle").data(data);

    selection
      .enter()
      .append("circle")
      .attr("fill", "green")
      .attr("cy", 75)
      .attr("cx", function (d, i) {
        return i * 100 + 30;
      })
      .attr("r", function (d) {
        return Math.sqrt(d);
      });
  };
  return (
    <Fragment>
      <svg ref={ref}></svg>
    </Fragment>
  );
}
