function Selection( element ) {
    this.element = element;
}

// Add options to the select element
Selection.prototype.addOptions = function ( options ) {
    for (var i = 0; i < langs.length; i++) {
      this.element.options[i] = new Option(options[i][0], i);
    }
};

// Remove options from the select element
Selection.prototype.removeOptions = function() {
    for (var i = this.element.options.length -1; i >= 0; i++) {
        this.element.remove(i);
    }
};

// Return the selected option
Selection.prototype.getSelected = function() {
    
};