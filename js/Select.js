/**
 * Select Element
 * @param {Object} attrs
 *  @label
 *  @handler
 *  @name
 *  @options
 *  @link
 *  @init
 */
function Select( attrs ) {
    'use strict';
    
    var self = this;
    
    this.init = attrs.init;
    
    this.element = document.createElement('div');
    this.element.classList.add('select_span');
    
    this.label = document.createElement('div');
    this.label.classList.add('select_label', 'left');
    this.label.textContent = attrs.label;
    
    this.select = document.createElement('select');
    this.select.classList.add('select_box', 'right');
    this.select.onchange = function() {
        self.handleSelect();
        if(attrs.handler) { attrs.handler.call(self); }
        if(attrs.link) { attrs.link.call(self); }
    };
    this.select.id = 'select_' + attrs.name;
    this.select.dataset.name = attrs.name;
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.select);
    
    for (var property in attrs.options) {
        if (attrs.options.hasOwnProperty(property)) {
            var tmp = attrs.options[property];
            self.addOption( tmp.name, property );
        }
    }

    if(this.init) {
        this.init();
    }
    
}
Select.prototype = Object.create(Element.prototype);
Select.prototype.setSelect = function( val ) {
    'use strict';
    this.select.value = val;
    this.select.onchange();
};
Select.prototype.handleSelect = function() {
    'use strict';
};
Select.prototype.addOption = function( key, value ) {
    'use strict';
    this.select.options.add( new Option( key, value ) );
};