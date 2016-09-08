/**
 * Loader Object
 * @param {Object} attrs
 */
function Loader( attrs ) {

    var self = this;
        
    this.element = document.createElement('div');
    this.element.classList.add('toggle_span');
    
    this.label = document.createElement('div');
    this.label.textContent = attrs.label;
    this.label.classList.add('toggle_label', 'left');
    
    this.input_label = document.createElement
    
}
Loader.prototype = Object.create(Element.prototype);
// <div class="toggle_span blue_back">
//     <div class="toggle_label left" id="importCards">Import Cards</div>
//     &nbsp;&nbsp;
//     <label for="card_input" id="card_input_button">Choose a file</label>
//     <input type="file" id="card_input" onchange="loadCardHandler(this.files)">
// </div>