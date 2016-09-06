/**
 * Timer Element
 * @param {Object} attrs
 *  @text
 *  @shadow
 */
function Timer( attrs ) {
    
    var self = this;
    
    this.element = document.createElement('div');
    this.element.textContent = attrs.text;
    this.element.classList.add('timer', 'nav_' + attrs.shadow);
}
Timer.prototype = Object.create(Element.prototype);