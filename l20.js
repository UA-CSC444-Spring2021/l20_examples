////////////////////////////////////////////////////////////////
//
// Example of d3 line + interpolation
//
// Author: Joshua Levine
// Date: Mar. 29, 2021
//
// Refs: https://github.com/d3/d3-shape#lines and
//       https://github.com/d3/d3-interpolate
//
////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
// Simple 2d Data

let xdata = [0,3,6,9,12,15,18,21,24]
let ydata = [9,7,10,12,16,18,11,10,7]

let data = xdata.map(function(x,i) {
  return [x,ydata[i]];
})

// setup scales
let xScale = d3.scaleLinear()
  .domain([0,24])
  .range([50,450]);

let yScale = d3.scaleLinear()
  .domain([0,24])
  .range([450,50]);


////////////////////////////////////////////////////////////////
// Example of using accessor functions .x() and .y() as well as
// using .curve() to specify an interpolation scheme

d3.select("#plot")
  .selectAll("path")
  .data([data])
  .enter()
  .append("path")
  .attr("d", function(d) {
    console.log(d)
    return d3.line()
             .x(p => xScale(p[0]))
             .y(p => yScale(p[1]))
             //.curve(d3.curveStep)
             //.curve(d3.curveLinear)
             .curve(d3.curveCatmullRom)
             (d)
  })
  .attr("stroke", "red")
  .attr("fill","none")

// draw circles to show the data points

d3.select("#plot")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", p => xScale(p[0]))
  .attr("cy", p => yScale(p[1]))
  .attr("r", 5)
  .attr("fill", "black");
