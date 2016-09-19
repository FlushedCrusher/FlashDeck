/**
 * Progress Bar Element
 */
function ProgressBar( attrs ) {
    
    var self = this;
    
    this.maxVal;
    this.currentVal;
    
    this.element = document.createElement('div');
    this.element.classList.add('progress_bar');
    
    this.status_bar = document.createElement('div');
    this.status_bar.classList.add('status_bar');
    
    this.element.appendChild( this.status_bar );
    
}
ProgressBar.prototype = Object.create(Element.prototype);
ProgressBar.prototype.setMaxVal = function( val ) {
    this.maxVal = val;
};
ProgressBar.prototype.setCurrentVal = function( val ) {
    this.currentVal = val;
};
ProgressBar.prototype.setCalculatedWidth = function() {
    this.status_bar.style.width = ((this.currentVal / this.maxVal) * 500) + 'px';
};