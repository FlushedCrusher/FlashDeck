function Selection( element ) {
    this.element = element;
}

// Add options to the select element
Selection.prototype.addOptions = function ( options, pos ) {
    if( pos === 1 ) {
        for (var i = 0; i < options.length; i++) {
            this.element.options[i] = new Option(options[i][0], i);
        }
    } else if( pos === 2 ) {
        for (var i = 1; i < options.length; i++) {
            this.element.options.add( new Option(options[i][1], options[i][0]));
        }
    }
};

// Remove options from the select element
Selection.prototype.removeOptions = function() {
    for (var i = this.element.options.length -1; i >= 0; i--) {
        this.element.remove(i);
    }
};

// Return the selected option
Selection.prototype.getSelected = function() {
    return this.element.selectedIndex;
};

// Set the selected option
Selection.prototype.setSelection = function( index ) {
    this.element.selectedIndex = index;
};

// Set the element visibility
Selection.prototype.styleVisibility = function( len ) {
    this.element.style.visibility = (len === 1) ? 'hidden' : 'visible';
};

