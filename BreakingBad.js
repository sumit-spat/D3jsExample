import React, { useRef, useEffect } from "react";
import { select, min, max, scaleTime, axisBottom, svg, scaleLinear } from "d3";
import useResizeObserver from "use-resize-observer";

const getDate = (dateString) => {
  const date = dateString.split("-");
  console.log("date", date);
  console.log(date[2], date[0] - 1, date[1]);
  return new Date(date[2], date[0] - 1, date[1]);
};
// const data=[25,34,50,60,40]
function BreakingBad({ data, highlight }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = { height: "70%" };

  useEffect(() => {
    const svg = select(svgRef.current);
    // debugger;
    if (!dimensions) return "helloo";
    // debugger;
    const minDate = min(data, (episode) => getDate(episode.air_date));
    const maxDate = max(data, (episode) => getDate(episode.air_date));
    console.log("dimensions", dimensions.width);
    const xScale = scaleTime().domain([minDate, maxDate]).range([0, 800]);
    const yScale = scaleLinear()
      .domain([max(data, (episode) => episode.characters.length), 0])
      .range([0, dimensions.height]);
    svg
      .selectAll(".episode")
      .data(data)
      .join("line")
      .attr("class", "episode")
      .attr(
        "stroke",
        (episode) => {
          //   debugger;
          console.log(
            "color",
            episode.characters.includes(highlight) ? "blue" : "red"
          );
          return episode?.characters?.includes(highlight) ? "blue" : "red";
        }
        // episode.characters.includes(highlight) ? "blue" : "red"
      )
      .attr("x1", (episode) => xScale(getDate(episode.air_date)))
      .attr("y1", dimensions.height)
      .attr("x2", (episode) => xScale(getDate(episode.air_date)))
      .attr("y2", (episode) => yScale(episode.characters.length));
    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").style("transform", `translateY(${70}%)`).call(xAxis);

    console.log("minDate", minDate);
    console.log("maxDate", maxDate);
  }, [data, dimensions, highlight]);

  return (
    <div
      ref={wrapperRef}
      style={{ marginBottom: "2rem", height: "710px", textAlign: "center" }}
    >
      {/* <svg ref={svgRef}>
        <g className="y-axis"></g>
      </svg> */}
      <svg
        ref={svgRef}
        style={{ width: "50%", height: "86%", textAlign: "center" }}
      >
        {/* <g className="y-axis"></g> */}
        <g className="x-axis"></g>
      </svg>
    </div>
  );
}

export default BreakingBad;
