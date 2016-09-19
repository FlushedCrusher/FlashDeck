/**
 * Button Element
 * @param {Object} attrs
 *  @id
 *  @text
 *  @shadow
 *  @handler
 */
function Button( attrs ) {
    'use strict';
    
    var self = this;
    
    this.element= document.createElement('span');
    this.element.classList.add('nav', 'pop_out', 'nav_' + attrs.shadow);
    this.element.id = attrs.id;
    this.element.innerHTML = attrs.text;
    this.element.onclick = function() {
        self.handleButton();
        attrs.handler.call(self);
    };
    
}
Button.prototype = Object.create(Element.prototype);
Button.prototype.handleButton = function() {
    'use strict';
    console.log('->handleButton');
};