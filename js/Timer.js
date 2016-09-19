/**
 * Timer Element
 * @param {Object} attrs
 *  @increment
 *  @shadow
 */
function Timer( attrs ) {
    'use strict';

    this.timer = undefined;
    this.duration = 0;
    this.interval = attrs.interval || 100;
    
    this.element = document.createElement('div');
    this.element.textContent = '0:0:0';
    this.element.classList.add('timer', 'nav_' + attrs.shadow);
    
}
Timer.prototype = Object.create(Element.prototype);
Timer.prototype.getTime = function() {
    'use strict';
    return {
        duration    : this.duration,
        display     : this.element.textContent
    };
};
Timer.prototype.setTime = function( obj ) {
    'use strict';
    this.duration = obj.duration;
    this.element.textContent = obj.display;
};
Timer.prototype.increment = function() {
    'use strict';
    this.duration += this.interval;
    var secOverTen  =             ( this.duration / 100 )         % 10;
    var secs        = Math.floor  ( this.duration / 1000 )        % 60;
    var mins        = Math.floor( ( this.duration / 1000 ) / 60 ) % 60;
    this.element.textContent = mins + ":" + secs + ":" + secOverTen;
};
Timer.prototype.start = function() {
    'use strict';
    var _this = this;
    this.timer = setInterval(function() {
        _this.increment();
    }, _this.interval);
};
Timer.prototype.stop = function() {
    'use strict';
    clearInterval(this.timer);
    this.timer = null;
};
Timer.prototype.clear = function() {
    'use strict';
    this.duration = 0;
    this.element.textContent = '0:0:0';
};
Timer.prototype.toggleTimer = function() {
    'use strict';
    if(this.timer) {
        this.stop();
    } else {
        this.start();
    }
};