var config = new Config();

// Register Elements
ElementFactory.registerElement('toggle', Toggle);
ElementFactory.registerElement('select', Select);
ElementFactory.registerElement('modal', Modal);
ElementFactory.registerElement('button', Button);
ElementFactory.registerElement('timer', Timer);
ElementFactory.registerElement('overlay', Overlay);

// Create Elements

// Modals
var response_modal = ElementFactory.createElement('modal', {
    heading     : 'Did you know this one?',
    okayText    : 'YES',
    cancelText  : 'NO',
    closeCallback   : function() { console.log('handler'); },
    resetCallback   : function() { console.log('handler'); },
    okayCallback    : function() { console.log('handler'); },
    cancelCallback  : function() { console.log('handler'); }
});
response_modal.hide('reset_button');
response_modal.hide('close_button');
var config_modal = ElementFactory.createElement('modal',{
    styleMod    : '1',
    heading     : 'Settings',
    okayText    : 'APPLY',
    cancelText  : 'CANCEL',
    closeCallback   : function() { console.log('handler'); },
    resetCallback   : function() { console.log('handler'); },
    okayCallback    : function() { console.log('handler'); },
    cancelCallback  : function() { console.log('handler'); }
});
var config_button = ElementFactory.createElement('button', {
    id          : 'config_button',
    text        : '',
    shadow      : 'left',
    handler     : function() { config_modal.toggle(); }
});

// Selects & Toggles
var select_cycle = ElementFactory.createElement('select', {
    label   : 'Cycle Method',
    handler : function() {
        config[this.select.dataset.name] = config.cycleEnum[this.select.value];
    },
    name    : 'cycle',
    options : config.cycleEnum
});
var toggle_flip = ElementFactory.createElement('toggle', {
    label   : 'Flip Card on Hover',
    handler : handleToggle,
    name    : 'flipOnHover',
});
var toggle_counts = ElementFactory.createElement('toggle', {
    label   : 'Show Response Count',
    handler : handleToggle,
    name    : 'showReponseCount',
});
var toggle_indicators = ElementFactory.createElement('toggle', {
    label   : 'Show Response Indicators',
    handler : handleToggle,
    name    : 'showReponseIndicators',
});
var toggle_timer = ElementFactory.createElement('toggle', {
    label   : 'Show Timer',
    handler : handleToggle,
    name    : 'showTimer',
});

// Timer
var timer = ElementFactory.createElement('timer', {
    shadow  : 'left'
});

// Overlays
var pause_overlay = ElementFactory.createElement('overlay', {
    cls : 'pause'
});
var firework_overlay = ElementFactory.createElement('overlay', {
    cls : 'pyro'
});

// Handlers
function handleToggle() {
    var val = this.toggle.dataset.value;
    config[this.toggle.dataset.name] = (val === 'true') ? true : false;
}

config_modal.body.appendChild(select_cycle.element);
config_modal.body.appendChild(toggle_flip.element);
config_modal.body.appendChild(toggle_counts.element);
config_modal.body.appendChild(toggle_indicators.element);
config_modal.body.appendChild(toggle_timer.element);

FlashDeckMain.appendChild(pause_overlay.element);
FlashDeckMain.appendChild(firework_overlay.element);
FlashDeckMain.appendChild(timer.element);
FlashDeckMain.appendChild(config_modal.element);
FlashDeckMain.appendChild(config_button.element);
FlashDeckMain.appendChild(response_modal.element);