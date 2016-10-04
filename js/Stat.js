/**
 * Stat Worker Function
 * @param {Object} attrs
 */
function Stat( attrs ) {
  'use strict';
  
  this.data = undefined;
  if(attrs && attrs.data) {
    this.setData( attrs.data );
  } else {
    this.data = [];
  }
  this.k = (attrs && attrs.k) ? attrs.k : 0;
  this.centroids = [];
  this.result = [];
  
}
Stat.prototype.run = function( times ) {
  'use strict';
  times = times || 1;
  for(var i = 0; i < times; i++) {
    this.reset();
    console.debug(this.step());
  }
};
Stat.prototype.step = function() {
  'use strict';
  var iteration = [];
  var cycles = 0;
  this.seedCentroids();
  do{
    this.result = this.calculateResult();
    this.groupElements();
    this.calculateCentroids();
    iteration = this.calculateResult();
    cycles++;
  } while( !this.areEqualArray(this.result, iteration) );
  return cycles;
};
Stat.prototype.clearResult = function() {
  'use strict';
  this.result = [];
};
Stat.prototype.reset = function() {
  'use strict';
  this.centroids = [];
  this.result = [];
  this.data.forEach(function( element ) {
    element.group = undefined;
  });
};
Stat.prototype.setData = function( data ) {
  'use strict';
  var arr = data.map(function( element ) {
    return {
      group: undefined,
      value: element
    };
  });
  this.data = arr;
};
Stat.prototype.getData = function() {
  'use strict';
  return this.data;
};
Stat.prototype.setK = function( k ) {
  'use strict';
  this.k = k;
};
Stat.prototype.getK = function() {
  'use strict';
  return this.k;
};
Stat.prototype.getLength = function() {
  'use strict';
  return this.data.length;
};
Stat.prototype.seedCentroids = function() {
  'use strict';
  for(var i = 0; i < this.k; i++) {
    this.centroids.push( this.getRandomElement().value );
  }
};
Stat.prototype.getRandomElement = function() {
  'use strict';
  var index = Math.floor(Math.random()*this.getLength());
  return this.data[index];
};
Stat.prototype.groupElements = function() {
  'use strict';
  var self = this;
  this.data.forEach(function( element ) {
    var tmpDist = [];
    for(var i = 0; i < self.k; i++) {
      var dist = self.getDistance2( element.value, self.centroids[i] );
      tmpDist.push(dist);
    }
    var min = self.minOfArray( tmpDist );
    element.group = tmpDist.indexOf( min );
  });
};
Stat.prototype.calculateCentroids = function() {
  'use strict';
  for(var i = 0; i < this.k; i++) {
    this.centroids[i] = this.avgOfElements2(this.data.filter(inGroup.bind(this)));
  }
  function inGroup( element ) {
    return element.group === i;
  }
};
Stat.prototype.getDistance2 = function( d1, d2 ) {
  'use strict';
  return Math.sqrt(
    Math.pow((d1[0] - d2[0]), 2) +
    Math.pow((d1[1] - d2[1]), 2)
  );
};
Stat.prototype.minOfArray = function( arr ) {
  'use strict';
  var min = Math.min.apply(null, arr);
  return min;
};
Stat.prototype.areEqualArray = function( array1, array2 ) {
  'use strict';
  return (array1.length === array2.length) && array1.every(function(element, index) {
    return element === array2[index];
  });
};
Stat.prototype.avgOfElements2 = function( arr ) {
  'use strict';
  var len = arr.length;
   var avg = {
    0: 0,
    1: 0
  };
  arr.forEach(function( element ) {
    avg[0] += element.value[0];
    avg[1] += element.value[1];
  });
  avg[0] = avg[0] / (len || 1);
  avg[1] = avg[1] / (len || 1);
  return avg;
};
Stat.prototype.calculateResult = function() {
  'use strict';
  var res = this.data.map(function( element ) {
    return element.group;
  });
  return res;
};