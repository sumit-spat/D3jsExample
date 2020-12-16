const data = [
  { name: "Cricket", value: 20 },
  { name: "Football", value: 30 },
  { name: "VolleyBall", value: 50 },
  { name: "Tennis", value: 40 },
  { name: "Table tennis", value: 40 },
];
const svg = d3.select("#svg"),
  width = svg.attr("width"),
  height = svg.attr("height");

const radius = 200;
const g = svg
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);
const color = d3.scaleOrdinal(["red", "blue", "yellow", "black", "purple"]);
const pie = d3.pie().value((d) => d.value);
const path = d3.arc().outerRadius(radius).innerRadius(0);
const pies = g
  .selectAll(".arc")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("class", "arc");
pies
  .append("path")
  .attr("d", path)
  .attr("fill", (d) => color(d.data.value));
