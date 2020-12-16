var salesData = [
  { Year: "2014", Qty: 2000 },
  { Year: "2015", Qty: 3000 },
  { Year: "2016", Qty: 4000 },
  { Year: "2017", Qty: 5000 },
  { Year: "2018", Qty: 6000 },
  { Year: "2019", Qty: 7000 },
  { Year: "2020", Qty: 8000 },
];
var svg = d3.select("#svg");
var padding = { top: 20, right: 30, bottom: 30, left: 50 };
var colors = d3.schemeCategory10;
var chartArea = {
  width: parseInt(svg.style("width")) - padding.left - padding.right,
  height: parseInt(svg.style("height")) - padding.top - padding.bottom,
};
var yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(salesData, function (d, i) {
      return d.Qty;
    }),
  ])
  .range([chartArea.height, 0])
  .nice();
var xScale = d3
  .scaleBand()
  .domain(
    salesData.map(function (d) {
      return d.Year;
    })
  )
  .range([0, chartArea.width])
  .padding(0.2);

//x-axis
var xAxis = svg
  .append("g")
  .classed("xAxis", true)
  .attr(
    "transform",
    "translate(" + padding.left + "," + (chartArea.height + padding.top) + ")"
  )
  .call(d3.axisBottom(xScale));

//y-axis
var yAxisFn = d3.axisLeft(yScale);
var yAxis = svg
  .append("g")
  .classed("yAxis", true)
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");
yAxisFn(yAxis);

//bars
var rectGrp = svg
  .append("g")
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

rectGrp
  .selectAll("rect")
  .data(salesData)
  .enter()
  .append("rect")
  .attr("width", xScale.bandwidth())
  .attr("height", function (d, i) {
    return chartArea.height - yScale(d.Qty);
  })
  .attr("x", function (d, i) {
    return xScale(d.Year);
  })
  .attr("y", function (d, i) {
    return yScale(d.Qty);
  })
  .attr("fill", function (d, i) {
    console.log("colors", colors);
    return colors[i];
  });
var grid = svg
  .append("g")
  .attr("class", "grid")
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
  .call(d3.axisLeft(yScale))
  .tickSize(-chartArea.width)
  .tickFormat("");
