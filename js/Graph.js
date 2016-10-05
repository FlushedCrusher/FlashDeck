/**
 * Graph Element
 * @param {Object} attrs
 *  @k
 *  @data
 */
function Graph( attrs ) {
  'use strict';

  this.element= document.createElement('div');
  this.element.classList.add('bar-graph');
    
  this.data = [
    {
      category: 'Don\'t Know',
      value: 0,
    },
    {
      category: 'Know',
      value: 0,
    },
    {
      category: 'Know Well',
      value: 0,
    },
  ];

  this.margin = {top: 20, right: 20, bottom: 70, left: 40};
  this.width = 600 - this.margin.left - this.margin.right;
  this.height = 300 - this.margin.top - this.margin.bottom;

  this.x = d3.scaleBand()
    .range([0, this.width])
    .round(true)
    .padding(0.1);

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
Graph.prototype = Object.create(Element.prototype);
Graph.prototype.map = function( data ) {
  'use strict';
  var self = this;
  data.forEach(function( element ) {
    var index = parseInt(element);
    self.data[index].value += 1;
  });
  self.plot();
};
Graph.prototype.plot = function() {
  'use strict';
  	
  var self = this;
  
  this.x.domain(this.data.map(function(d) {
    return d.category;
  }));
  this.y.domain([0, d3.max(this.data, function(d) {
    return d.value;
  })]);

  this.svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + this.height + ")")
    .call(self.xAxis);

  this.svg.append("g")
    .attr("class", "y axis")
    .call(self.yAxis)
    .append("text")
    .attr("transform", "rotate(-90)");

  this.svg.selectAll("bar")
    .data(self.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return self.x(d.category);
    })
    .attr("width", self.x.bandwidth())
    .attr("y", function(d) {
      return self.y(d.value);
    })
    .attr("height", function(d) {
      return self.height - self.y(d.value);
    });
};