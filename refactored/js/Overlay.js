/**
 * Overlay Element
 * @params {Object} attrs
 *  @cls
 *  @applyCallback
 *  @removeCallback
 */
function Overlay( attrs ) {
    
    var self = this;
    
    this.applyCallback = attrs.applyCallback || function() {};
    this.removeCallback = attrs.removeCallback || function() {};
    
    this.element = document.createElement('div');
    this.element.classList.add(attrs.cls, 'stop_animation');
    this.element.style.display = 'none';
    
}
Overlay.prototype = Object.create(Element.prototype);
Overlay.prototype.apply = function() {
    this.show();
    this.play();
    this.applyCallback();
};
Overlay.prototype.remove = function() {
    this.hide();
    this.pause();
    this.removeCallback();
};
Overlay.prototype.toggleOverlay = function() {
    var elem = this.element;
    if(elem.style.display === 'none') {
        this.apply();
    } else {
        this.remove();
    }
};
Overlay.prototype.play = function() {
    this.element.classList.remove('stop_animation');
};
Overlay.prototype.pause = function() {
    this.element.classList.add('stop_animation');
};