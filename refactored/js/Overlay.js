/**
 * Overlay Element
 * @params {Object} attrs
 *  @cls
 */
function Overlay( attrs ) {
    
    var self = this;
    
    this.element = document.createElement('div');
    this.element.classList.add(attrs.cls, 'stop_animation');
    this.element.style.display = 'none';
    
}
Overlay.prototype = Object.create(Element.prototype);
Overlay.prototype.apply = function() {
    this.show();
    this.play();
};
Overlay.prototype.remove = function() {
    this.hide();
    this.pause();
};
Overlay.prototype.play = function() {
    this.element.classList.remove('stop_animation');
};
Overlay.prototype.pause = function() {
    this.element.classList.add('stop_animation');
};