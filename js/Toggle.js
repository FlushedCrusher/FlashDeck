/**
 * Toggle Element
 * @param {Object} attrs
 *  @label
 *  @handler
 *  @name
 *  @link
 *  @init
 */
function Toggle( attrs ) {
    'use strict';
    
    var self = this;
    
    this.init = attrs.init;
    
    this.element = document.createElement('div');
    this.element.classList.add('toggle_span');
    
    this.label = document.createElement('div');
    this.label.textContent = attrs.label;
    this.label.classList.add('toggle_label', 'left');
    
    this.button = document.createElement('div');
    this.button.classList.add('toggle_button', 'right', 'toggle_off');
    this.button.onclick = function() {
        self.handleToggle();
        if(attrs.handler) { attrs.handler.call(self); }
        if(attrs.link) { attrs.link.call(self); }
    };
    
    this.toggle = document.createElement('div');
    this.toggle.classList.add('toggle_toggle', 'toggle_toggle_left');
    this.toggle.dataset.value = 'false';
    this.toggle.dataset.name = attrs.name;
    
    this.text = document.createElement('div');
    this.text.classList.add('toggle_text');
    this.text.textContent = 'NO';
    
    this.button.appendChild(this.toggle);
    this.button.appendChild(this.text);
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.button);
    
    if(this.init) {
        this.init();
    }
}
Toggle.prototype = Object.create(Element.prototype);
Toggle.prototype.setToggle = function( on ) {
    'use strict';
    if(!on) {
        this.toggle.dataset.value = 'true';
    } else {
        this.toggle.dataset.value = 'false';
    }
    this.button.onclick();
};
Toggle.prototype.handleToggle = function() {
    'use strict';
    switch (this.toggle.dataset.value) {
        case 'true':
            this.toggleOff();
            break;
        case 'false':
            this.toggleOn();
            break;
        default:
            console.error("Error setting toggle.");
    }
};
Toggle.prototype.toggleOn = function() {
    'use strict';
    console.log('->toggleOn');
    // Move the toggle
    this.toggle.classList.add('toggle_toggle_right');
    this.toggle.classList.remove('toggle_toggle_left');
    // Change the color
    this.button.classList.add('toggle_on');
    this.button.classList.remove('toggle_off');
    // Change the text & set teh current state
    this.text.textContent = 'YES';
    this.toggle.dataset.value = 'true';
};
Toggle.prototype.toggleOff = function() {
    'use strict';
    console.log('->toggleOff');
    // Move the toggle
    this.toggle.classList.remove('toggle_toggle_right');
    this.toggle.classList.add('toggle_toggle_left');
    // Change the color
    this.button.classList.remove('toggle_on');
    this.button.classList.add('toggle_off');
    // Change the text & set teh current state
    this.text.textContent = 'NO';
    this.toggle.dataset.value = 'false';
};