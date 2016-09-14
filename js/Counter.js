/**
 * Counter Element
 * @param {Object}
 *  @style
 */
function Counter( attrs ) {
    
    var self = this;
    
    this.element = document.createElement('div');
    this.element.classList.add('left', 'side_bar', attrs.style);
    this.element.textContent = 0;
    
}
Counter.prototype = Object.create(Element.prototype);
Counter.prototype.getCount = function() {
    return this.element.textContent;
};
Counter.prototype.setCount = function( num ) {
    this.element.textContent = num;
};
Counter.prototype.increment = function() {
    var num = parseInt(this.element.textContent) + 1;
    this.element.textContent = num;
};
Counter.prototype.clear = function() {
    this.element.textContent = 0;
};
