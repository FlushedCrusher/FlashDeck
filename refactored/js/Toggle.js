/**
 * Toggle Element
 * @param {Object} attrs
 *  @id
 *  @label
 *  @handler
 *  @value
 *  @text
 */
function Toggle( attrs ) {
    
    var self = document.createElement('div');
    self.classList.add('toggle_span');
    
    var _label = document.createElement('div');
    _label.id = attrs.id;
    _label.textContent = attrs.label;
    _label.classList.add('toggle_label');
    _label.classList.add('left');
    
    var _button = document.createElement('div');
    _button.classList.add('toggle_button');
    _button.classList.add('right');
    _button.classList.add('toggle_off');
    _button.onclick = function() {
        handleToggle();
        attrs.handler();
    };
    
    var _toggle = document.createElement('div');
    _toggle.classList.add('toggle_toggle');
    _toggle.classList.add('toggle_toggle_left');
    _toggle.dataset.value = attrs.value;
    
    var _text = document.createElement('div');
    _text.classList.add('toggle_text');
    _text.textContent = attrs.text;
    
    _button.appendChild(_toggle);
    _button.appendChild(_text);
    
    self.appendChild(_label);
    self.appendChild(_button);
    
    function handleToggle() {
        switch (_toggle.dataset.value) {
            case 'true':
                toggleOff();
                break;
            case 'false':
                toggleOn();
                break;
            default:
                console.error("Error setting toggle.");
        }
    }
    function toggleOn() {
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
    }
    function toggleOff() {
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
    }
    
    return self;
}