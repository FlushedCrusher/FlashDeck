/**
 * Element Factory
*/
var ElementFactory = (function() {
    
    var self;
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
})();
