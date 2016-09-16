/* ********** ********** ********** ********** **********
 * Register Elements with ElementFactory
 */
ElementFactory.registerElement('toggle', Toggle);
ElementFactory.registerElement('select', Select);
ElementFactory.registerElement('modal', Modal);
ElementFactory.registerElement('button', Button);
ElementFactory.registerElement('group', Group);
ElementFactory.registerElement('indicator', Indicator);
ElementFactory.registerElement('timer', Timer);
ElementFactory.registerElement('overlay', Overlay);
ElementFactory.registerElement('counter', Counter);
ElementFactory.registerElement('loader', Loader);
ElementFactory.registerElement('quiz', Quiz);
/* ********** ********** ********** ********** **********
 * Configuration
 */
var config = (localStorage.flashDeck) ?
    new Config(JSON.parse(localStorage.flashDeck).state) :
    new Config();
/* ********** ********** ********** ********** **********
 * Quiz
 */
var quiz = ElementFactory.createElement('quiz', {
    cycleCallback       : cycleCallback,
    flipCallback        : flipCallback,
    responseCallback    : responseCallback,
    resetCallback       : resetCallback
});
/* ********** ********** ********** ********** **********
 * Events
 */
var eventManager = new EventManager({
    windowLeftHandler           : windowLeftHandler,
    windowUpHandler             : windowUpHandler,
    windowRightHandler          : windowRightHandler,
    responseReturnHandler       : responseReturnHandler,
    responseLeftHandler         : responseLeftHandler,
    responseRightHandler        : responseRightHandler,
    windowSpaceHandler          : windowSpaceHandler,
    stateChangeHandler          : stateChangeHandler,
    typeChangeHandler           : typeChangeHandler,
    persistStateLoadHandler     : persistStateLoadHandler,
    persistStateUnloadHandler   : persistStateUnloadHandler
});
/* ********** ********** ********** ********** **********
 * Modals
 */
var response_modal = ElementFactory.createElement('modal', {
    styleMod    : '2',
    heading     : 'Did you know this one?',
    okayText    : 'YES',
    cancelText  : 'NO',
    okayCallback    : responseOkayCallback,
    cancelCallback  : responseCancelCallback
});
var config_modal = ElementFactory.createElement('modal',{
    styleMod    : '1',
    heading     : 'Settings',
    okayText    : 'APPLY',
    cancelText  : 'CANCEL',
    closeCallback   : configCloseCallback,
    resetCallback   : configResetCallback,
    okayCallback    : configOkayCallback,
    cancelCallback  : configCancelCallback
});
/* ********** ********** ********** ********** **********
 * Buttons
 */
var config_button = ElementFactory.createElement('button', {
    id          : 'config_button',
    text        : '',
    shadow      : 'left',
    handler     : onConfigPress
});
var reset_button = ElementFactory.createElement('button', {
    id          : 'reset_button',
    text        : '&#8634;',
    shadow      : 'left',
    handler     : onResetPress
});
var nav_left = ElementFactory.createElement('button', {
    id          : 'nav_left',
    text        : '&larr;',
    shadow      : 'left',
    handler     : onNavLeftPress
});
var nav_flip = ElementFactory.createElement('button', {
    id          : 'nav_flip',
    text        : '&#8631;',
    shadow      : 'center',
    handler     : onNavFlipPress
});
var nav_right = ElementFactory.createElement('button', {
    id          : 'nav_right',
    text        : '&rarr;',
    shadow      : 'right',
    handler     : onNavRightPress
});
/* ********** ********** ********** ********** **********
 * Groups
 */
var nav_control = ElementFactory.createElement('group', {
    clsList  : [
        'sidebyside'
    ]
});
var footer = ElementFactory.createElement('group', {
    clsList  : [
        'footer'
    ]
});
/* ********** ********** ********** ********** **********
 * Indicators
 */
var success_indicator = ElementFactory.createElement('indicator', {
    clsList : [
        'success'
    ],
    imgUrl  : '../images/check.png'
});
var failure_indicator = ElementFactory.createElement('indicator', {
    clsList : [
        'failure'
    ],
    imgUrl  : '../images/exx.png'
});
/* ********** ********** ********** ********** **********
 * Timers
 */
var timer = ElementFactory.createElement('timer', {
    shadow  : 'left'
});
/* ********** ********** ********** ********** **********
 * Counters
 */
var correct = ElementFactory.createElement('counter', {
    style   : 'correct'
});
var incorrect = ElementFactory.createElement('counter', {
    style   : 'incorrect'
});
/* ********** ********** ********** ********** **********
 * Overlays
 */
var pause_overlay = ElementFactory.createElement('overlay', {
    cls : 'pause',
    applyCallback   : pauseApplyCallback,
    removeCallback  : pauseRemoveCallback
});
var firework_overlay = ElementFactory.createElement('overlay', {
    cls : 'pyro',
    applyCallback   : fireworkApplyCallback,
    removeCallback  : fireworkRemoveCallback
});
/* ********** ********** ********** ********** **********
 * Loaders
 */
var deck_loader = ElementFactory.createElement('loader', {
    label   : 'Import Deck',
    text    : 'Choose a source',
    handler : handleLoadDeck,
    link    : emptyHandler
});
/* ********** ********** ********** ********** **********
 * Selects
 */
var select_cycle = ElementFactory.createElement('select', {
    init    : selectInit,
    label   : 'Cycle Method',
    handler : handleSelectCycle,
    name    : 'cycle',
    options : config.cycleEnum,
    link    : handleCycleChange
});
var select_limit = ElementFactory.createElement('select', {
    init    : selectInit,
    label   : 'Deck Limit',
    handler : handleSelectLimit,
    name    : 'deckLimit',
    options : config.limitEnum,
    link    : handleLimitChange
});
var select_mastery = ElementFactory.createElement('select', {
    init    : selectInit,
    label   : 'Card Mastery',
    handler : handleSelectMastery,
    name    : 'masteryType',
    options : config.masteryEnum,
    link    : handleMasteryChange
});
/* ********** ********** ********** ********** **********
 * Toggles
 */
var toggle_persist = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Persist State',
    handler : handleToggle,
    name    : 'persistState',
    link    : handlePersistStateToggle
});
var toggle_flip = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Flip Card on Hover',
    handler : handleToggle,
    name    : 'flipOnHover'
});
var toggle_counts = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Show Response Count',
    handler : handleToggle,
    name    : 'showReponseCount',
    link    : handleResponseCountVisibility
});
var toggle_indicators = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Show Response Indicators',
    handler : handleToggle,
    name    : 'showReponseIndicators',
    link    : handleResponseIndicatorVisibility
});
var toggle_timer = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Show Timer',
    handler : handleToggle,
    name    : 'showTimer',
    link    : handleTimerVisibility
});
/* ********** ********** ********** ********** **********
 * Build UI
 */
config_modal.body.appendChild(select_cycle.element);
config_modal.body.appendChild(select_limit.element);
config_modal.body.appendChild(select_mastery.element);
config_modal.body.appendChild(toggle_persist.element);
config_modal.body.appendChild(toggle_flip.element);
config_modal.body.appendChild(toggle_counts.element);
config_modal.body.appendChild(toggle_indicators.element);
config_modal.body.appendChild(toggle_timer.element);
config_modal.body.appendChild(deck_loader.element);

nav_control.element.appendChild(config_button.element);
nav_control.element.appendChild(reset_button.element);
nav_control.element.appendChild(nav_left.element);
nav_control.element.appendChild(nav_flip.element);
nav_control.element.appendChild(nav_right.element);

quiz.element.insertBefore(correct.element, quiz.card_container);
quiz.element.appendChild(incorrect.element);

footer.element.appendChild(success_indicator.element);
footer.element.appendChild(failure_indicator.element);

FlashDeckMain.appendChild(pause_overlay.element);
FlashDeckMain.appendChild(firework_overlay.element);
FlashDeckMain.appendChild(timer.element);
FlashDeckMain.appendChild(config_modal.element);
FlashDeckMain.appendChild(response_modal.element);
FlashDeckMain.appendChild(quiz.element);
FlashDeckMain.appendChild(nav_control.element);
FlashDeckMain.appendChild(footer.element);

/* ********** ********** ********** ********** **********
* Initialize
*/
eventManager.addWindowKeyListeners();
eventManager.addWindowPauseListener();
eventManager.addStateChangeListener();
eventManager.addTypeChangeListener();
setStateCallbacks( config.appState );
setTypeCallbacks( config.quizType );
response_modal.hide('reset_button');
response_modal.hide('close_button');