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
    
    var self = this;
    
    this.element = document.createElement('div');
    this.element.classList.add('select_span');
    
    this.label = document.createElement('div');
    this.label.classList.add('select_label');
    this.label.classList.add('left');
    this.label.id = attrs.id;
    this.label.textContent = attrs.label;
    
    this.select = document.createElement('select');
    this.select.classList.add('select_box');
    this.select.classList.add('right');
    this.select.onchange = function() {
        attrs.handler();
    };
    this.select.id = attrs.sId;
    this.select.dataset.name = attrs.name;
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.select);
    
    for (var property in attrs.options) {
        if (attrs.options.hasOwnProperty(property)) {
            var tmp = attrs.options[property];
            this.select.options.add( new Option( tmp.name, property ) );
        }
    }

}