/**
 * Element Factory
*/
ElementFactory = window.ElementFactory ? window.ElementFactory : {};
(function(window, undefined) {
    'use strict';
    
    function _ElementFactory() {
        
        var registeredElements = new Map();
        
        function registerElement( key, value ) {
            registeredElements.set( key, value );
        }
        
        function createElement( type, attrs ) {
            var Cls = registeredElements.get(type);
            return new Cls( attrs );
        }
        
        return {
            registerElement : registerElement,
            createElement   : createElement
        };
    }
    ElementFactory = new _ElementFactory();
}(window));
