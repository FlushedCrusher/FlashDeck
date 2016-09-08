/**
 * Loader Object
 * @param {Object} attrs
 *  @label
 *  @text
 *  @handler
 *  @link
 */
function Loader( attrs ) {

    var self = this;
    
    this.onAfterLoad = attrs.handler || function() {
        console.log('Handle after load');
    };
    this.element = document.createElement('div');
    this.element.classList.add('toggle_span', 'blue_back');
    
    this.label = document.createElement('div');
    this.label.textContent = attrs.label;
    this.label.classList.add('toggle_label', 'left');
    
    this.input_label = document.createElement('label');
    this.input_label.classList.add('deck_input_button');
    this.input_label.htmlFor = 'deck_input';
    this.input_label.textContent = attrs.text;
    
    this.input_button = document.createElement('input');
    this.input_button.classList.add('deck_input');
    this.input_button.type = 'file';
    this.input_button.id = 'deck_input';
    this.input_button.onchange = function() {
        self.handleLoader( this.files );
        if(attrs.link) { attrs.link.call(self); }
    };
    
    this.loaded_text = document.createElement('span');
    this.loaded_text.classList.add('loaded_deck');
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.input_label);
    this.element.appendChild(this.input_button);
    this.element.appendChild(this.loaded_text);
    
}
Loader.prototype = Object.create(Element.prototype);
Loader.prototype.setLoadedText = function( name ) {
    this.loaded_text.textContent = name;
};
Loader.prototype.handleLoader = function( files ) {
    console.log('->handleLoader');
    var _this = this;
    var reader = new FileReader;
    reader.onload = function(e) {
        _this.afterLoadHandler( reader.result );
    }
    reader.readAsText(files[0], 'UTF-8');
    this.setLoadedText( files[0].name );
};
Loader.prototype.afterLoadHandler = function( result ) {
    this.onAfterLoad( result );
};