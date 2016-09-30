/**
 * Progress Bar Element
 */
function ProgressBar( attrs ) {
    'use strict';
  
    this.maxVal = undefined;
    this.currentVal = undefined;
    
    this.element = document.createElement('div');
    this.element.classList.add('progress_bar');
    
    this.status_bar = document.createElement('div');
    this.status_bar.classList.add('status_bar');
    
    this.element.appendChild( this.status_bar );
    
}
ProgressBar.prototype = Object.create(Element.prototype);
ProgressBar.prototype.setMaxVal = function( val ) {
    'use strict';
    this.maxVal = val;
};
ProgressBar.prototype.setCurrentVal = function( val ) {
    'use strict';
    this.currentVal = val;
};
ProgressBar.prototype.setCalculatedWidth = function() {
    'use strict';
    this.status_bar.style.width = ((this.currentVal / this.maxVal) * 500) + 'px';
};
ProgressBar.prototype.clear = function() {
    'use strict';
    this.currentVal = 0;
    this.setCalculatedWidth();
};