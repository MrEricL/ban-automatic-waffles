var data = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
];

//  margin, radius, and color scale
var m = 10,
    r = 100,
    z = d3.scale.category20c();
	
	
var svg = d3.select("body").selectAll("svg")
    .data(data)
  .enter().append("svg")
    .attr("width", (r+m)*2)
    .attr("height", (r + m) * 2)
  .append("g")
    .attr("transform", "translate(" + (r+m) + "," + (r+m+5) + ")");

svg.selectAll("path")
    .data(d3.layout.pie())
  .enter().append("path")
    .attr("d", d3.svg.arc()
        .innerRadius(r / 2)
        .outerRadius(r))
    .style("fill", function(d, i) { return z(i); });
	
