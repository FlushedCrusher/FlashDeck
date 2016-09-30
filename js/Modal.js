/**
 * Modal Element
 * @param {Object} attrs
 *  @styleMod
 *  @heading
 *  @okayText
 *  @cancelText
 *  @closeCallback
 *  @resetCallback
 *  @okayCallback
 *  @cancelCallback
 */
function Modal( attrs ) {
    'use strict';
    
    var self = this;
    var styleMod = attrs.styleMod ? '-' + attrs.styleMod : '';
    
    this.element = document.createElement('div');
    this.element.classList.add('modal');
    
    this.content = document.createElement('div');
    this.content.classList.add('modal-content');
    
    this.header = document.createElement('div');
    this.header.classList.add('modal-header' + styleMod);
    
    this.close_button = document.createElement('span');
    this.close_button.classList.add('close');
    this.close_button.textContent = 'x';
    this.close_button.onclick = function() {
        self.handleClose();
        attrs.closeCallback.call(self);
    };
    
    this.reset_button = document.createElement('span');
    this.reset_button.classList.add('soft_reset');
    this.reset_button.innerHTML = '&#8634;';
    this.reset_button.onclick = function() {
        self.handleReset();
        attrs.resetCallback.call(self);
    };
    
    this.heading = document.createElement('h2');
    this.heading.textContent = attrs.heading;
    
    this.body = document.createElement('div');
    this.body.classList.add('modal-body');
    
    this.footer = document.createElement('div');
    this.footer.classList.add('modal-footer' + styleMod);
    
    this.footer_buttons = document.createElement('div');
    this.footer_buttons.classList.add('sidebyside');
    
    this.okay_button = document.createElement('div');
    this.okay_button.classList.add('user_yes' + styleMod, 'left', 'pop_out');
    this.okay_button.textContent = attrs.okayText;
    this.okay_button.onclick = function() {
        self.handleOkay();
        attrs.okayCallback.call(self);
    };
    
    this.cancel_button = document.createElement('div');
    this.cancel_button.classList.add('user_no' + styleMod, 'right', 'pop_out');
    this.cancel_button.textContent = attrs.cancelText;
    this.cancel_button.onclick = function() {
        self.handleCancel();
        attrs.cancelCallback.call(self);
    };
    
    this.header.appendChild(this.close_button);
    this.header.appendChild(this.reset_button);
    this.header.appendChild(this.heading);
    
    this.footer_buttons.appendChild(this.okay_button);
    this.footer_buttons.appendChild(this.cancel_button);
    this.footer.appendChild(this.footer_buttons);
    
    this.content.appendChild(this.header);
    this.content.appendChild(this.body);
    this.content.appendChild(this.footer);
    this.element.appendChild(this.content);
    this.element.style.display = 'none';
}
Modal.prototype = Object.create(Element.prototype);
Modal.prototype.handleClose = function() {
    'use strict';
    this.hide();
};
Modal.prototype.handleReset = function() {
    'use strict';
};
Modal.prototype.handleOkay = function() {
    'use strict';
    this.hide();
};
Modal.prototype.handleCancel = function() {
    'use strict';
    this.hide();
};