/**
 * Element
 */
function Element() {}
Element.prototype.show = function( component ) {
    var elem = component ? this[component] : this.element;
    elem.style.display = 'block';
};
Element.prototype.hide = function( component ) {
    var elem = component ? this[component] : this.element;
    elem.style.display = 'none';
};
Element.prototype.toggle = function( component ) {
    var elem = component ? this[component] : this.element;
    elem.style.display = (elem.style.display === 'none') ? 'block' : 'none';
};
Element.prototype.visible = function( component ) {
    var elem = component ? this[component] : this.element;
    elem.style.visibility = 'visible';
};
Element.prototype.invisible = function( component ) {
    var elem = component ? this[component] : this.element;
    elem.style.visibility = 'hidden';
};
Element.prototype.toggleVisibility = function( component ) {
    var elem = component ? this[component] : this.element;
    elem.style.visibility = (elem.style.visibility === 'hidden') ? 'visible' : 'hidden';
};