/**
 * Group Element
 * @param {Object} attrs
 *  @style
 */
function Group( attrs ) {

    var self = this;
    
    this.element = document.createElement('div');
    this.element.classList.add('sidebyside');
    
}
Group.prototype = Object.create(Element.prototype);