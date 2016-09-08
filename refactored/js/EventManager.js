/**
 * Event Manager Object
 * @param {Object} attrs
 *  @windowLeftKeyHandler
 *  @windowUpKeyHandler
 *  @windowRightKeyHandler
 *  @responseReturnHandler
 *  @responseLeftKeyHandler
 *  @responseRightKeyHandler
 *  @windowSpaceHandler
 */
function EventManager( attrs ) {

    this.windowKeyHandler = function( event ) {
        console.log('->windowKeyHandler');
        switch (event.keyCode) {
            case 37: // (LEFT ARROW)
                attrs.windowLeftKeyHandler.call(this);
                break;
            case 38: // (UP ARROW)
                attrs.windowUpKeyHandler.call(this);
                break;
            case 39: // (RIGHT ARROW)
                attrs.windowRightKeyHandler.call(this);
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
                attrs.responseLeftKeyHandler.call(this);
                break;
            case 39: // (RIGHT ARROW)
                attrs.responseRightKeyHandler.call(this);
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
    
}
EventManager.prototype.addWindowKeyListeners = function() {
    document.addEventListener("keyup", this.windowKeyHandler);
};
EventManager.prototype.addResponseKeyListeners = function() {
    document.addEventListener("keyup", this.responseKeyHandler);
};
EventManager.prototype.addWindowPauseListener = function() {
    document.addEventListener("keyup", this.windowPauseHandler);
};
EventManager.prototype.removeWindowKeyListeners = function() {
    document.removeEventListener("keyup", this.windowKeyHandler);
};
EventManager.prototype.removeResponseKeyListeners = function() {
    document.removeEventListener("keyup", this.responseKeyHandler);
};
EventManager.prototype.removeWindowPauseListener = function() {
    document.removeEventListener("keyup", this.windowPauseHandler);
};