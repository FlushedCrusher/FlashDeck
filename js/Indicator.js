/**
 * Indicator Element
 * @param {Object} attrs
 *  @clsList
 *  @imgUrl
 */
function Indicator( attrs ) {
    'use strict';
    
    var self = this;
    
    attrs.clsList = attrs.clsList || [];
    
    this.element = document.createElement('div');
    attrs.clsList.forEach(function( cls ) {
        self.element.classList.add( cls);
    });
    
    this.image = document.createElement('img');
    this.image.src = attrs.imgUrl;
    
    this.element.appendChild( this.image );
    
}
Indicator.prototype = Object.create(Element.prototype);