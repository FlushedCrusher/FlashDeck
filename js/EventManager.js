/**
 * Event Manager Object
 * @param {Object} attrs
 *  @windowLeftHandler
 *  @windowUpHandler
 *  @windowRightHandler
 *  @responseReturnHandler
 *  @responseLeftHandler
 *  @responseRightHandler
 *  @windowSpaceHandler
 *  @stateChangeHandler
 *  @typeChangeHandler
 *  @persistStateLoadHandler
 *  @persistStateUnloadHandler
 */
function EventManager( attrs ) {

    this.windowKeyHandler = function( event ) {
        console.log('->windowKeyHandler');
        switch (event.keyCode) {
            case 37: // (LEFT ARROW)
                attrs.windowLeftHandler.call(this);
                break;
            case 38: // (UP ARROW)
                attrs.windowUpHandler.call(this);
                break;
            case 39: // (RIGHT ARROW)
                attrs.windowRightHandler.call(this);
                break;
            default:
                break;
        }
    };
    this.responseKeyHandler = function( event ) {
        console.log('->responseKeyHandler');
        switch (event.keyCode) {
            case 13: // (ENTER)
                attrs.responseReturnHandler.call(this);
                break;
            case 37: // (LEFT ARROW)
                attrs.responseLeftHandler.call(this);
                break;
            case 39: // (RIGHT ARROW)
                attrs.responseRightHandler.call(this);
                break;
            default:
                break;
        }
    };
    this.windowPauseHandler = function( event ) {
        console.log('->windowPauseHandler');
        switch (event.keyCode) {
            case 32: // (SPACE)
                attrs.windowSpaceHandler.call(this);
                break;
            default:
                break;
        }
    };
    this.persistStateLoadHandler = function( event ) {
        attrs.persistStateLoadHandler.call(this);
    };
    this.persistStateUnloadHandler = function( event ) {
        attrs.persistStateUnloadHandler.call(this);
    };
    this.stateChangeHandler = function( event ) {
        attrs.stateChangeHandler.call(this);
    };
    this.typeChangeHandler = function( event ) {
        attrs.typeChangeHandler.call(this);
    };
    
    this.windowKeyExists = false;
    this.responseKeyexists = false;
    this.windowPauseExists = false;
    this.persistStateExists = false;
    
}
EventManager.prototype.addWindowKeyListeners = function() {
    document.addEventListener("keyup", this.windowKeyHandler);
    this.windowKeyExists = true;
};
EventManager.prototype.addResponseKeyListeners = function() {
    document.addEventListener("keyup", this.responseKeyHandler);
    this.responseKeyexists = true;
};
EventManager.prototype.addWindowPauseListener = function() {
    document.addEventListener("keyup", this.windowPauseHandler);
    this.windowPauseExists = true;
};
EventManager.prototype.addPersistStateListener = function() {
    window.addEventListener("load", this.persistStateLoadHandler);
    window.addEventListener("unload", this.persistStateUnloadHandler);
    this.persistStateExists = true;
};
EventManager.prototype.addStateChangeListener = function() {
    document.addEventListener("stateChange", this.stateChangeHandler);
};
EventManager.prototype.addTypeChangeListener = function() {
    document.addEventListener("typeChange", this.typeChangeHandler);
};

EventManager.prototype.removeWindowKeyListeners = function() {
    document.removeEventListener("keyup", this.windowKeyHandler);
    this.windowKeyExists = false;
};
EventManager.prototype.removeResponseKeyListeners = function() {
    document.removeEventListener("keyup", this.responseKeyHandler);
    this.responseKeyexists = false;
};
EventManager.prototype.removeWindowPauseListener = function() {
    document.removeEventListener("keyup", this.windowPauseHandler);
    this.windowPauseExists = false;
};
EventManager.prototype.removePersistStateListener = function() {
    window.removeEventListener("load", this.persistStateLoadHandler);
    window.removeEventListener("unload", this.persistStateUnloadHandler);
    delete localStorage.flashDeck;
    this.persistStateExists = false;
};
EventManager.prototype.removeStateChangeListener = function() {
    document.removeEventListener("stateChange", this.stateChangeHandler);
};
EventManager.prototype.removeTypeChangeListener = function() {
    document.removeEventListener("typeChange", this.typeChangeHandler);
};