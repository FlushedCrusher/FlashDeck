/**
 * Scatter Element
 * @param {Object} attrs
 *  @data
 *  @centroids
 */
function Scatter( attrs ) {
  'use strict';
  
  this.element = document.createElement('div');
  this.element.classList.add('scatter-plot');

  this.data = (attrs && attrs.data) ? attrs.data : [];
  this.centroids = (attrs && attrs.centroids) ? attrs.centroids : [];
  
  this.margin = {top: 20, right: 20, bottom: 70, left: 40};
  this.width = 600 - this.margin.left - this.margin.right;
  this.height = 300 - this.margin.top - this.margin.bottom;

  this.x = d3.scaleLinear()
    .range([0, this.width]);
  
  this.y = d3.scaleLinear()
    .range([this.height, 0]);

  this.xAxis = d3.axisBottom()
    .scale(this.x);

  this.yAxis = d3.axisLeft()
    .scale(this.y);

  this.svg = d3.select(this.element).append("svg")
  .attr("width", this.width + this.margin.left + this.margin.right)
  .attr("height", this.height + this.margin.top + this.margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + this.margin.left + "," + this.margin.top + ")");

}
Scatter.prototype = Object.create(Element.prototype);
Scatter.prototype.map = function( attrs ) {
  'use strict';
  var self = this;
  this.data = attrs.data;
  this.data.map(function( element ) {
    element.avg_time = element[0];
    element.responses = element[1];
  });
  this.centroids = attrs.centroids;
  this.centroids.map(function( element ) {
    element.avg_time = element[0];
    element.responses = element[1];
  });
  self.plot();
};
Scatter.prototype.plot = function() {
  'use strict';

  var self = this;
  
  this.x.domain([0, d3.max(this.data, function(d) {
    return d.avg_time;
  })]);
  this.y.domain([0, d3.max(this.data, function(d) {
    return d.responses;
  })]);

  this.svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + self.height + ")")
  .call(self.xAxis);

  this.svg.append("g")
  .attr("class", "y axis")
  .call(self.yAxis);
  
  this.svg.selectAll("dot")
  .data(this.data)
  .enter()
  .append("circle")
  .attr("class", "point")
  .attr("r", 3.5)
  .attr("cx", function(d) {
    return self.x(d.avg_time);
  })
  .attr("cy", function(d) {
    return self.y(d.responses);
  });
  
  this.svg.selectAll("point")
  .data(this.centroids)
  .enter()
  .append("circle")
  .attr("class", "c-point")
  .attr("r", 5)
  .attr("cx", function(d) {
    return self.x(d.avg_time);
  })
  .attr("cy", function(d) {
    return self.y(d.responses);
  });

};