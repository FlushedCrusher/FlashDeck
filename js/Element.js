/**
 * Element
 */
function Element() {}
Element.prototype.show = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.display = 'block';
};
Element.prototype.hide = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.display = 'none';
};
Element.prototype.toggle = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.display = (elem.style.display === 'none') ? 'block' : 'none';
};
Element.prototype.visible = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.visibility = 'visible';
};
Element.prototype.invisible = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.visibility = 'hidden';
};
Element.prototype.toggleVisibility = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.visibility = (elem.style.visibility === 'hidden') ? 'visible' : 'hidden';
};