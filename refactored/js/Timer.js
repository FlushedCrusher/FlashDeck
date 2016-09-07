/**
 * Timer Element
 * @param {Object} attrs
 *  @increment
 *  @shadow
 */
function Timer( attrs ) {
    
    var self = this;
    
    this.timer;
    this.duration = 0;
    this.interval = attrs.interval || 100;
    
    this.element = document.createElement('div');
    this.element.textContent = '0:0:0';
    this.element.classList.add('timer', 'nav_' + attrs.shadow);
    
}
Timer.prototype = Object.create(Element.prototype);
Timer.prototype.increment = function() {
    this.duration += this.interval;
    var secOverTen  =             ( this.duration / 100 )         % 10;
    var secs        = Math.floor  ( this.duration / 1000 )        % 60;
    var mins        = Math.floor( ( this.duration / 1000 ) / 60 ) % 60;
    this.element.textContent = mins + ":" + secs + ":" + secOverTen;
};
Timer.prototype.start = function() {
    var _this = this;
    this.timer = setInterval(function() {
        _this.increment();
    }, _this.interval);
};
Timer.prototype.stop = function() {
    clearInterval(this.timer);
    this.timer = null;
};
Timer.prototype.clear = function() {
    this.duration = 0;
    this.element.textContent = '0:0:0';
};