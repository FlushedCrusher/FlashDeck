/**
 * Counter Element
 * @param {Object}
 *  @style
 */
function Counter( attrs ) {
    'use strict';

    this.element = document.createElement('div');
    this.element.classList.add('left', 'side_bar', attrs.style);
    this.element.textContent = 0;
    
}
Counter.prototype = Object.create(Element.prototype);
Counter.prototype.getCount = function() {
    'use strict';
    return this.element.textContent;
};
Counter.prototype.setCount = function( num ) {
    'use strict';
    this.element.textContent = num;
};
Counter.prototype.increment = function() {
    'use strict';
    var num = parseInt(this.element.textContent) + 1;
    this.element.textContent = num;
};
Counter.prototype.clear = function() {
    'use strict';
    this.element.textContent = 0;
};
