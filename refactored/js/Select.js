/**
 * Select Element
 * @param {Object} attrs
 *  id
 *  label
 *  handler
 *  sId
 *  name
 *  options
 */
function Select( attrs ) {
    
    var self = document.createElement('div');
    self.classList.add('select_span');
    
    var _label = document.createElement('div');
    _label.classList.add('select_label');
    _label.classList.add('left');
    _label.id = attrs.id;
    _label.textContent = attrs.label;
    
    var select = document.createElement('select');
    select.classList.add('select_box');
    select.classList.add('right');
    select.onchange = attrs.handler;
    select.id = attrs.sId;
    select.dataset.name = attrs.name;
    
    self.appendChild(_label);
    self.appendChild(select);
    
    for (var property in attrs.options) {
        if (attrs.options.hasOwnProperty(property)) {
            var tmp = attrs.options[property];
            select.options.add( new Option( tmp.name, property ) );
        }
    }
    
    return self;
}