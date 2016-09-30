/**
 * Overlay Element
 * @params {Object} attrs
 *  @cls
 *  @applyCallback
 *  @removeCallback
 */
function Overlay( attrs ) {
    'use strict';

    this.applyCallback = attrs.applyCallback || function() {};
    this.removeCallback = attrs.removeCallback || function() {};
    
    this.element = document.createElement('div');
    this.element.classList.add(attrs.cls, 'stop_animation');
    this.element.style.display = 'none';
    
}
Overlay.prototype = Object.create(Element.prototype);
Overlay.prototype.apply = function() {
    'use strict';
    this.show();
    this.play();
    this.applyCallback();
};
Overlay.prototype.remove = function() {
    'use strict';
    this.hide();
    this.pause();
    this.removeCallback();
};
Overlay.prototype.toggleOverlay = function() {
    'use strict';
    var elem = this.element;
    if(elem.style.display === 'none') {
        this.apply();
    } else {
        this.remove();
    }
};
Overlay.prototype.play = function() {
    'use strict';
    this.element.classList.remove('stop_animation');
};
Overlay.prototype.pause = function() {
    'use strict';
    this.element.classList.add('stop_animation');
};