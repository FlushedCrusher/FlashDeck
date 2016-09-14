/**
 * Group Element
 * @param {Object} attrs
 *  @clsList
 */
function Group( attrs ) {

    var self = this;
    
    attrs.clsList = attrs.clsList || [];
    
    this.element = document.createElement('div');
    attrs.clsList.forEach(function( cls ) {
        self.element.classList.add( cls);
    });
    
}
Group.prototype = Object.create(Element.prototype);