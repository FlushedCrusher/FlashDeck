/**
 * Stat Worker Function
 * @param {Object} attrs
 */
function Stat( attrs ) {
  'use strict';
  
  this.data = (attrs.data) ? this.setData( attrs.data ) : [];
  this.k = attrs.k || 0;
  this.centroids = [];
  
}
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
      tmpDist.push(self.getDistance2( element.value ), slef.centroids[i]);
    }
    element.group = self.centroids.indexOf( self.minOfArray( tmpDist ) );
  });
};
Stat.prototype.calculateCentroids = function() {
  'use strict';
  for(var i = 0; i < this.k; i++) {
    this.centroids[i] = this.avgOfElements2(this.data.filter(function(element) {
      return element.group === i;
    }));
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
  return Math.min.apply(null, arr);
};
Stat.prototype.avgOfElements2 = function( arr ) {
  'use strict';
  var len = arr.length;
  var avg = {};
  arr.forEach(function( element ) {
    
  });
};