const pixel_per_square = 50
const width = pixel_per_square * 10
const height = pixel_per_square * 4
const outter_color = "#ff0000"
const inner_color = "#ffffff"
const id_color = "#0000ff"

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);
/*
var circle = svgContainer.append("circle")
  .attr("cx", parseInt(pixel_per_square * 1.5))
  .attr("cy", parseInt(pixel_per_square * 0.5))
  .attr("r", parseInt(pixel_per_square/2))
  .style("fill", outter_color);

svgContainer.append("circle")
    .attr("cx", parseInt(pixel_per_square * 9.5))
    .attr("cy", parseInt(pixel_per_square * 0.5))
    .attr("r", parseInt(pixel_per_square/2))
    .style("fill", outter_color);

svgContainer.append("circle")
  .attr("cx", parseInt(pixel_per_square * 1.5))
  .attr("cy", parseInt(pixel_per_square * 3.5))
  .attr("r", parseInt(pixel_per_square/2))
  .style("fill", outter_color);

svgContainer.append("circle")
    .attr("cx", parseInt(pixel_per_square * 9.5))
    .attr("cy", parseInt(pixel_per_square * 3.5))
    .attr("r", parseInt(pixel_per_square/2))
    .style("fill", outter_color);

*/

//  <rect x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:red;stroke:black;stroke-width:5;opacity:0.5" />
svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 1))
        .attr("y", parseInt(pixel_per_square * 0.5))
        .attr("rx", parseInt(pixel_per_square * .5))
        .attr("ry", parseInt(pixel_per_square * .5))
        .attr("width", parseInt(pixel_per_square * 7))
        .attr("height", parseInt(pixel_per_square * 3))
        .style("fill", inner_color)
        .style("stroke", outter_color)
        .style("stroke-width", parseInt(pixel_per_square * .5));

svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 1))
        .attr("y", parseInt(pixel_per_square * 1))
        .attr("width", parseInt(pixel_per_square * 7))
        .attr("height", parseInt(pixel_per_square * 2))
        .style("fill", inner_color)
        .style("stroke", inner_color)
        .style("stroke-width", parseInt(pixel_per_square));

svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 2))
        .attr("y", parseInt(pixel_per_square * 1.2))
        .attr("width", parseInt(pixel_per_square * 1.5))
        .attr("height", parseInt(pixel_per_square * 1.5))
        .style("fill", id_color)
        .style("stroke", id_color)
        .style("stroke-width", parseInt(pixel_per_square));

svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 5.5))
        .attr("y", parseInt(pixel_per_square * 1.2))
        .attr("width", parseInt(pixel_per_square * 1.5))
        .attr("height", parseInt(pixel_per_square * 1.5))
        .style("fill", id_color)
        .style("stroke", id_color)
        .style("stroke-width", parseInt(pixel_per_square));

svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 0))
        .attr("y", parseInt(pixel_per_square * 1.2))
        .attr("width", parseInt(pixel_per_square * .8))
        .attr("height", parseInt(pixel_per_square * .2))
        .style("fill", "#000000")

svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 0))
        .attr("y", parseInt(pixel_per_square * 2.5))
        .attr("width", parseInt(pixel_per_square * .8))
        .attr("height", parseInt(pixel_per_square * .2))
        .style("fill", "#000000")

svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 0))
        .attr("y", parseInt(pixel_per_square * 1))
        .attr("width", parseInt(pixel_per_square * .2))
        .attr("height", parseInt(pixel_per_square * .6))
        .style("fill", "#000000")

svgContainer.append("rect")
        .attr("x", parseInt(pixel_per_square * 0))
        .attr("y", parseInt(pixel_per_square * 2.3))
        .attr("width", parseInt(pixel_per_square * .2))
        .attr("height", parseInt(pixel_per_square * .6))
        .style("fill", "#000000")
