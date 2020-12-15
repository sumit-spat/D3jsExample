//D3js
var dataset = [40, 30, 50, 60, 120, 180, 100];

var svgWidth = 500,
  svgHeight = 300,
  barPadding = 5;
var barwidth = svgWifth / dataset.length;

var svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

var barChart = svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", function (d) {
    return svgHeight - d;
  })
  .attr("height", function (d) {
    return d;
  })
  .attr("width", barwidth - barPadding)
  .attr("transform", function (d, i) {
    var translate = [barwidth * i, 0];
    return "translate(" + translate + ")";
  });
