/**
 * Toggle Element
 * @param {Object} attrs
 *  @id
 *  @label
 *  @handler
 */
function Toggle( attrs ) {
    
    var self = this;
    
    this.element = document.createElement('div');
    this.element.classList.add('toggle_span');
    
    this.label = document.createElement('div');
    this.label.id = attrs.id;
    this.label.textContent = attrs.label;
    this.label.classList.add('toggle_label');
    this.label.classList.add('left');
    
    this.button = document.createElement('div');
    this.button.classList.add('toggle_button');
    this.button.classList.add('right');
    this.button.classList.add('toggle_off');
    this.button.onclick = function() {
        self.handleToggle( self.toggle, self.button, self.text );
        attrs.handler();
    };
    
    this.toggle = document.createElement('div');
    this.toggle.classList.add('toggle_toggle');
    this.toggle.classList.add('toggle_toggle_left');
    this.toggle.dataset.value = 'false';
    
    this.text = document.createElement('div');
    this.text.classList.add('toggle_text');
    this.text.textContent = 'NO';
    
    this.button.appendChild(this.toggle);
    this.button.appendChild(this.text);
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.button);
        
}
Toggle.prototype.handleToggle = function( _toggle, _button, _text ) {
    switch (_toggle.dataset.value) {
        case 'true':
            this.toggleOff( _toggle, _button, _text );
            break;
        case 'false':
            this.toggleOn( _toggle, _button, _text );
            break;
        default:
            console.error("Error setting toggle.");
    }
};
Toggle.prototype.toggleOn = function( _toggle, _button, _text ) {
    console.log('->toggleOn');
    // Move the toggle
    _toggle.classList.add('toggle_toggle_right');
    _toggle.classList.remove('toggle_toggle_left');
    // Change the color
    _button.classList.add('toggle_on');
    _button.classList.remove('toggle_off');
    // Change the text & set teh current state
    _text.textContent = 'YES';
    _toggle.dataset.value = 'true';
};
Toggle.prototype.toggleOff = function( _toggle, _button, _text ) {
    console.log('->toggleOff');
    // Move the toggle
    _toggle.classList.remove('toggle_toggle_right');
    _toggle.classList.add('toggle_toggle_left');
    // Change the color
    _button.classList.remove('toggle_on');
    _button.classList.add('toggle_off');
    // Change the text & set teh current state
    _text.textContent = 'NO';
    _toggle.dataset.value = 'false';
};