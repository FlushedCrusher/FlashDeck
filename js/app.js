// ********************************************************
// *********************************** Window Event Listeners (Keyboard Controls) 
// ********************************************************

window.addEventListener('load', function() {
    addWindowKeyListener();
});

window.addEventListener('onunload', function() {
    removeWindowKeyListener();
    window.removeEventListener('load', function() {
        console.log('->window load event removed');
    });
    window.removeEventListener('onunload', function() {
        console.log('->windoe unload event removed');
    });
});
/**
 * Add the keypress listener for window controls
 */
function addWindowKeyListener() {
    document.addEventListener("keyup", windowKeyHandler);
}
/**
 * Remove the keypress listener for window controls
 */
function removeWindowKeyListener() {
    document.removeEventListener("keyup", windowKeyHandler);
}
/**
 * Add the keypress listener for response modal controls
 */
function addResponseKeyListener() {
    document.addEventListener("keyup", responseKeyHandler);
}
/**
 * Remove the keypress listener for response modal controls
 */
function removeResponseKeyListener() {
    document.removeEventListener("keyup", responseKeyHandler);
}
/**
 * Window key listener handler
 */
function windowKeyHandler( event ) {
    console.log('->windowKeyHandler');
    switch (event.keyCode) {
        case 32: // Start or Stop the timer (SPACE)
            toggleTimer();
            break;
        case 37: // Cycle cards backward    (LEFT ARROW)
            cycleCardBackward();
            break;
        case 38: // Flip card               (UP ARROW)
            flipCard();
            break;
        case 39: // Cycle cards forward     (RIGHT ARROW)
            cycleCardForward();
            break;
        default:
            break;
    }
}
/**
 * Response modal key listener handleResponse
*/
function responseKeyHandler( event ) {
    console.log('->responseKeyHandler');
    switch (event.keyCode) {
        case 13: // Respond YES (ENTER)
            handleUserQuery(true);
            break;
        case 37: // Respond YES (LEFT ARROW)
            handleUserQuery(true);
            break;
        case 39: // Respond NO  (RIGHT ARROW)
            handleUserQuery(false);
            break;
        default:
            break;
    }
} 

// ********************************************************
// *********************************** Card flip operations 
// ********************************************************
 
/**
 * Trigger a card flip
 */
function flipCard() {
    console.log('->flipCard');
    // Stop the timer
    destroyTimer();
    // Toggle flipped state
    current_card.classList.toggle('flipped');
    // Return if the quiz has ended
    switch (config.appState.value) {
        case 'quizzing':
            handleFlip();
            break;
        default:
            return;
    }
}
/**
 * Handle the flip operations
*/
function handleFlip() {
    console.log('->handleFlip');
    switch (config.flipType) {
        case 'test':
            quickFlip();
            break;
        case 'userInput':
            userFlip();
            break;
        default:
            console.error('Error flipping card.');
    }
}
/**
 * Quick flip
 */
function quickFlip() {
    console.log('->quickFlip');
    // Flip the card back over after some time
    setTimeout(function() {
        current_card.classList.toggle('flipped');
    }, config.flipDuration);
}
/**
 * User flip
 */
function userFlip() {
    console.log('->userFlip');
    // Display response modal if showing back of card
    if(current_card.classList.contains('flipped')) {
        // Apply proper key controls
        removeWindowKeyListener();
        addResponseKeyListener();
        _responseModal.style.display = "block";
    } else {   
        // Apply proper key controls
        removeResponseKeyListener();
        addWindowKeyListener();
    }
}

// ********************************************************
// ************************************ Response operations 
// ********************************************************

/**
 * Handle user query response
 */
function handleUserQuery( known ) {
    console.log('->handleUserQuery');
    // Get current index
    var index = parseInt(current_card.dataset.index);
    // Get the response element
    var element = getResponseElement( known );
    // Handle the response in card
    myDeck.cards[index].handleResponse( known );
    // Calculate the average response time
    myDeck.cards[index].calculateAverageAnswerTime( config.timerDuration );
    // Close the Response Modal
    _responseModal.style.display = "none";
    // Flip the card
    flipCard();
    // Handle the response in the UI
    handleResponse(element);
    // Chack the deck mastery
    checkMastery( index );
}
/**
 * Return element associated with response
 */
function getResponseElement( known ) {
    console.log('->getResponseElement');
    switch( known ) {
        case true:
            return big_check;
            break;
        case false:
            return big_exx;
            break;
        default:
            console.error("Error getting response element.");
    }
}
/**
 * Trigger the animation for responses
 */
function handleResponse( element ) {
    console.log('->handleResponse');
    // Flash the response icon
    element.classList.add("flash");
    // Grayout the card
    current_card.classList.add("grayout");
    // Increment the response count
    addCount(element.dataset.countId);
    // Remove the response icon flash styling & cycle the card
    setTimeout(function() {
        element.classList.remove("flash");
        getNextcard();
    }, config.flashDuration)
}
/**
 * Increment the response count
 */
function addCount( elementId ) {
    console.log('->addCount');
    // Get reference to counter
    var el = document.getElementById(elementId);
    // Parse the test as an integer
    var num = parseInt(el.innerHTML);
    // Increment the integer
    num += 1;
    // Assign the new value
    el.innerHTML = num;
}
/**
 * Chack the mastery of a card in the deck
 */
function checkMastery( index ) {
    console.log('->checkMastery');
    var cardInQuestion = myDeck.cards[index];
    if(cardInQuestion.isMastered()) {
        console.log(cardInQuestion.phrase,'Mastered!');
        myDeck.addToMastered( index );
        current_card.dataset.index = parseInt(current_card.dataset.index) - 1;
    }
}

// ********************************************************
// ********************************** Card cycle operations 
// ********************************************************
 
/**
 * Get the next card
 */
function getNextcard() {
    console.log('->getNextcard');
    // Check for deck mastery
    if(myDeck.isMastered()) { 
        setUIEndState();
        return;
    }
    // Cycle the card based on config settings
    switch (config.cycle.value) {
        case 'forward':
            cycleCardForward();
            break;
        case 'backward':
            cycleCardBackward();
            break;
        case 'random':
            cycleCardRandom();
            break;
        default:
            console.error("Error cycling cards");
    }
}
/**
 * Cycle the current card forward
 */
function cycleCardForward() {
    console.log('->cycleCardForward');
    // Get the index of the current card
    var index = parseInt(current_card.dataset.index);
    // Cycle the card
    cycleCard( index, 1 );
}
/**
 * Cycle the current card forward
 */
function cycleCardBackward() {
    console.log('->cycleCardBackward');
    // Get the index of the current card
    var index = parseInt(current_card.dataset.index);
    // If index is 0, set index to one mare than last index
    if(index === 0) { index = setLength(); }
    // Cycle the card
    cycleCard( index, -1 );
}
/**
 * Clcle the current card at random
 */
function cycleCardRandom() {
    console.log('->cycleCardRandom');
    // TODO
}
/**
 * Cycle card
 */
function cycleCard( index, val ) {
    console.log('->cycleCard');
    // Increment / Decrement the index, taking the number of cards
    // in the deck into account
    index = (index + val) % setLength();
    // Assign the new index to the card element
    current_card.dataset.index = index;
    // If not, assign the card new values
    front.innerHTML = myDeck.cards[index].phrase;
    back.innerHTML = myDeck.cards[index].definition;
    // Un-grayout the card
    current_card.classList.remove("grayout");
    // Start the timer for the new card
    initTimer();
}
/**
 * Returns the length of the set of cards or deck length
 */
function setLength() {
    return Math.min( myDeck.numCards(), config.deckLimit );
}

// Card hover events
current_card.addEventListener('mouseover', function() {
    if(config.flipOnHover) { current_card.classList.add('flipped'); }
});
current_card.addEventListener('mouseout', function() {
    if(config.flipOnHover) { current_card.classList.remove('flipped'); }
});

// ********************************************************
// *************************************** Response Modal operations 
// ********************************************************
 
// Get the modal elements
var _responseModal = document.getElementById('responseModal');
var btn = document.getElementById("myBtn");

/**
 * When the user clicks on the button, open the modal
 */ 
btn.onclick = function() {
    _responseModal.style.display = "block";
}

// ********************************************************
// *************************************** Config Modal operations 
// ********************************************************
 
// Get the modal elements
var _configModal = document.getElementById('configModal');
var configBtn = document.getElementById("config_settings");

/**
 * When the user clicks on the button, open the modal
 */ 
configBtn.onclick = function() {
    console.log('->configBtn');
    stopTimer();
    if(config.appState.value !== 'firstLoad') { showConfigSettings(); }
    _configModal.style.display = "block";
}
/*
 * When the user clicks on <span> (x), close the modal
 */
config_close.onclick = function() {
    closeConfigModal();
}
/**
 * Handle a toggle button click
 */
function handleToggle( event ) {
    console.log('->handleToggle');
    // Get reference to the circle in the toggle button
    var _toggle = (!event.target.firstElementChild) ? 
        ((event.target.previousElementSibling) ?
            event.target.previousElementSibling :
            event.target) : 
        event.target.firstElementChild;
    // Get a reference to the whole toggle button
    var _button = _toggle.parentElement;
    // Get a reference to the text inside the toggle button
    var _span   = _button.children[1];
    // Get the previous state of the toggle button
    var _state   = _toggle.dataset.value;
    // Get a reference to the Label and and setting id
    var _setting = _button.parentElement.firstElementChild;
    switch (_state) {
        case 'true':
            toggleOff(_toggle, _button, _span);
            break;
        case 'false':
            toggleOn(_toggle, _button, _span);
            break;
        default:
            console.error("Error setting toggle.");
    }
    setConfigFromToggle( _setting );
}
/**
 * Set toggle to 'YES'
 */
function toggleOn(_toggle, _button, _span) {
    console.log('->toggleOn');
    var _text = 'YES';
    // Move the toggle
    _toggle.classList.add('toggle_toggle_right');
    _toggle.classList.remove('toggle_toggle_left');
    // Change the color
    _button.classList.add('toggle_on');
    _button.classList.remove('toggle_off');
    // Change the text & set teh current state
    _span.textContent = _text;
    _toggle.dataset.value = 'true';
}
/**
 * Set toggle to 'NO'
 */
function toggleOff(_toggle, _button, _span) {
    console.log('->toggleOff');
    var _text = 'NO';
    // Move the toggle
    _toggle.classList.remove('toggle_toggle_right');
    _toggle.classList.add('toggle_toggle_left');
    // Change the color
    _button.classList.remove('toggle_on');
    _button.classList.add('toggle_off');
    // Change the text & set teh current state
    _span.textContent = _text;
    _toggle.dataset.value = 'false';
}
/**
 * Close configmodal
 */
function closeConfigModal() {
    console.log('->closeConfigModal');
    _configModal.style.display = "none";
    if(config.appState.value === 'quizzing') {
        startTimer();
    }
}

// ********************************************************
// *********************************** Quiz / UI operations 
// ********************************************************

// Perform operations when the app loads
flashDeckApp.onload = onAppLoad;
// Perform operations when the app is closed
flashDeckApp.onunload = onAppUnload;

/**
 * Set the UI to the end state
 */
function setUIEndState() {
    console.log('->setUIEndState');
    // Set card content
    front.innerHTML = config.endMessageFront;
    back.innerHTML  = config.endMessageBack;
    // Set app state
    config.appState = stateEnum.FINISHED;
    // Show the fireworks
    fireworks.style.visibility = 'visible';
    fireworks_window.style.visibility = 'visible';
    fireworks_window.style.backgroundColor = "#ffffff";
    // Show the back end message
    setTimeout(flipCard, 1500);
    // Hide the reset button after som etime
    setTimeout( function() {
        reset_button.style.visibility = 'visible';
    }, 1500);
}
/**
 * Set the UI to the initial state
 */
function setUIInitState() {
    console.log('->setUIInitState');
    // Reset response counts
    if(!config.fromSavedState) {
        correct.innerHTML = 0;
        in_correct.innerHTML = 0;
    }
    // Set card content
    if(config.appState.value === 'finished') {
        setTimeout( setCardInit, config.flipDuration / 2);
    } else {
        setCardInit();
    }
    // Hide the fireworks
    fireworks.style.visibility = 'hidden';
    fireworks_window.style.visibility = 'hidden';
    fireworks_window.style.backgroundColor = "transparent";
    // Hide the reset button
    reset_button.style.visibility = 'hidden';
    // Flip card to front
    current_card.classList.remove('flipped')
}
/**
 * Assign default settings
 */
function assignDefaultSettings() {
    console.log('->assignDefaultSettings');
    for(setting in config.default) {
        config[setting] = (typeof config[setting] === 'undefined') ? config.default[setting] : config[setting];
    }
}
/**
 * Define user settings
 */
function defineUserSettings() {
    console.log('->defineUserSettings');
    // Set the cycle type
    config.cycle = config.cycle;
    // Set response flash duration
    config.flashDuration = config.flashDuration;
    // Set card flip duration
    config.flipDuration = config.flipDuration;
    // Flip card on hover?
    config.flipOnHover = config.flipOnHover;
    // Define the flip type
    config.flipType =config.flipType;
    // Define deck mastery level
    config.masteryLevel = config.masteryLevel;
    // Show response counts?
    config.showReponseCount = config.showReponseCount;
    // Show response indicators?
    config.showReponseIndicators = config.showReponseIndicators;
    // Show the timer?
    config.showTimer = config.showTimer;
}
/**
 * Assign user settings
 */
function assignUserSettings() {
    console.log('->assignUserSettings');
}
/**
 * Apply user settings
 */
function applySettings() {
    console.log('->applySettings');
    // Update the UI
    var _func;
    switch (config.appState.value) {
        case 'firstLoad':
            if(myDeck.cards.length > 0) {
                config.appState = stateEnum.INITIAL;
                init();
            }
            break;
        case 'initial':
            config.appState = stateEnum.QUIZING;
            _func = setToggleFromConfig;
            handleApplySettings( _func );
            break;
        case 'quizzing':
            startTimer();
            _func = setConfigFromToggle;
            handleApplySettings( _func );
            break;
        default:
            console.error("Error applying settings");
    }
    _configModal.style.display = "none";
}
/**
 * Handle Apply Settings
*/
function handleApplySettings( _func ) {
    _func( flipOnHover );
    _func( showReponseCount );
    _func( showReponseIndicators );
    _func( showTimer );
    setVisibility( correct );
    setVisibility( in_correct );
    setVisibility( timer );
    setVisibility( big_check );
    setVisibility( big_exx );
    // Set the deck mastery level
    myDeck.setMasteryLevel( config.masteryLevel );
}
/**
 * Set the toggle based on the config settings
 */
function setToggleFromConfig( element ) {
    var event = {};
    event.target = element.nextElementSibling;
    element.nextElementSibling.firstElementChild.dataset.value = !config[element.id];
    handleToggle( event );
}
/**
 * Set the config settings based on the toggles
 */
function setConfigFromToggle( element ) {
    var val = element.nextElementSibling.firstElementChild.dataset.value;
    config[element.id] = (val === 'true') ? true : false;
}
/**
 * Set visibility of features
 */
function setVisibility( element ) {
    var setting = element.dataset.name;
    var val = (config[setting]) ? 'visible' : 'hidden';
    element.style.visibility = val;
}
/**
 * Set the initial card
 */
function setCardInit() {
    console.log('->setCardInit');
    current_card.dataset.index = 0;
    front.innerHTML = myDeck.cards[0].phrase;
    back.innerHTML = myDeck.cards[0].definition;
}
/**
 * Reset the quiz
 */
function reset() {
    console.log('->reset');
    config.appState = stateEnum.FIRSTLOAD;
    // Reset deck mastery
    myDeck.reset()
    // Document that we are not loading saved data
    config.fromSavedState = false;
    applySettings();
}
/**
 * Initialize the quiz
 */
function init() {
    console.log('->init');
    // Assign default config settings
    assignDefaultSettings();
    // Define & assign user config settings
    // defineUserSettings(); // TODO
    // Apply settings
    applySettings();;
    // Set initial UI state
    setUIInitState();
    // Initialize the timer
    initTimer();
}
/**
 * Perform app operations on load
 */
function onAppLoad() {
    console.log('->onAppLoad');
    // Check for saved app data.
    if(localStorage.flashDeck) {
        // Get saved data
        var appData = JSON.parse(localStorage.flashDeck);
        // Print information
        console.log('Loading saved application state...');
        console.log('Last saved on:',new Date(appData.timestamp));
        config = appData.config;
        // Document that we are loading saved data
        config.fromSavedState = true;
        // Build the application
        config.appState = stateEnum.FIRSTLOAD;
        loadDeck(appData.deck);
        correct.textContent = appData.correct;
        in_correct.textContent  = appData.inCorrect;
        applySettings();
    }
}
/**
 * Perform app operations on unload
 */
function onAppUnload() {
    console.log('->onAppUnload');
    // Save app data
    var json = {
        'config'    : config,
        'correct'   : correct.textContent,
        'deck'      : myDeck,
        'inCorrect' : in_correct.textContent,
        'timestamp' : Date.now(),
        'version'   : config.version
    };
    localStorage.flashDeck = JSON.stringify(json);
    
}
/**
 * Load card handler
 */
function loadCardHandler( files ) {
    console.log('->loadCardHandler');
    config.appState = stateEnum.FIRSTLOAD;
    var reader = new FileReader
    reader.onload = function(e) {
        // Document that we are not loading saved data
        config.fromSavedState = false;
        afterLoadHandler( reader.result );
    }
    reader.readAsText(files[0], 'UTF-8');
    addNameToDom( files[0].name );
}
/**
 * Perform operations after cards loaded
 */
function afterLoadHandler( results ) {
    console.log('->afterLoadHandler');
    myDeck = new Deck();
    myCards = results.split('\n');
    addToDeck( myCards );
}
/**
 * Add cards to deck
 */
function addToDeck( cards ) {
    console.log('->addToDeck');
    cards.forEach( function( card ) {
        var _card = card.split(',');
        myDeck.addCard( new Card(_card[0], _card[1]));
    });
    showConfigSettings();
}
/**
 * Load deck to application
 */
function loadDeck( deck ) {
    console.log('->loadDeck');
    var cards = deck.cards;
    var mastered = deck.mastered;
    cards.forEach(function( card ) {
        var tmp = new Card(card.phrase, card.definition);
        tmp.timesCorrect        = card.timesCorrect;
        tmp.timesIncorrect      = card.timesIncorrect;
        tmp.averageAnswerTime   = card.averageAnswerTime;
        tmp.masteryLevel        = card.masteryLevel;
        myDeck.addCard( tmp )
    });
    mastered.forEach(function( card ) {
        var tmp = new Card(card.phrase, card.definition);
        tmp.timesCorrect        = card.timesCorrect;
        tmp.timesIncorrect      = card.timesIncorrect;
        tmp.averageAnswerTime   = card.averageAnswerTime;
        tmp.masteryLevel        = card.masteryLevel;
        myDeck.addCard( tmp )
        myDeck.addToMastered( myDeck.cards.length - 1 );
    });
}
/**
 * Show the config settings
 */
function showConfigSettings() {
    console.log('->showConfigSettings');
    var elements = document.getElementsByClassName('toggle_span');
    for(var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.style.display = 'inline-block';
    }
}
/**
 * Added laoded filenme to DOM
 */
function addNameToDom( name ) {
    console.log('->addNameToDom');
    var tmp         = document.createElement('span');
    tmp.textContent = name;
    tmp.id          = 'loaded_cards';
    settings_body.appendChild(tmp);
}

// ********************************************************
// *********************************** Timer operations 
// ********************************************************

// The timer variable
var myTimer;
/**
 * Initialize the timer
 */
function initTimer() {
    console.log('->initTimer');
    destroyTimer();
    setStartTime();
    clearDurationTime();
    startTimer();
}
/**
 * Clear the duration time
 */
function clearDurationTime() {
    console.log('->clearDurationTime');
    config.timerDuration = 0;
}
/**
 * Set the start time
 */
function setStartTime() {
    console.log('->setStartTime');
    config.timerStart = new Date();
}
/**
 * Start the timer
 */
function startTimer() {
    console.log('->startTimer');
    myTimer = setInterval(incrementTimer, config.timerIncrement);
}
/**
 * Increment the timer
 */
function incrementTimer() {
    // console.log('->incrementTimer');
    var timer = document.getElementById("timer");
    config.timerDuration += config.timerIncrement;
    var secOverTen  =             ( config.timerDuration / 100 )         % 10;
    var secs        = Math.floor  ( config.timerDuration / 1000 )        % 60;
    var mins        = Math.floor( ( config.timerDuration / 1000 ) / 60 ) % 60;
    timer.innerHTML = mins + ":" + secs + ":" + secOverTen;
}
/**
 * Destroy the timer
 */
function destroyTimer() {
    console.log('->destroyTimer');
    stopTimer();
    setEndTime();
}
/**
 * Stop the timer
 */
function stopTimer() {
    console.log('->stopTimer');
    clearInterval(myTimer);
    myTimer = null;
}
/**
 * Set the end time
 */
function setEndTime() {
    console.log('->setEndTime');
    config.timerEnd = new Date();
}
/**
 * Toggle the interval
 */
function toggleTimer() {
    if(!myTimer) {
        startTimer();
    } else {
        stopTimer();
    }
}

// ********************************************************
// ********************************* Speech recognition ops 
// ********************************************************
/*

// Handle language selection change
function updateCountry( selection ) {
    var select = selection || _language.getSelected();
    _language.setSelection( select );
    _dialect.removeOptions();
    _dialect.addOptions( langs[select], 2 );
    _dialect.styleVisibility( langs[select][1].length );
    _dialect.setSelection( select );
};

// Language variable
// var langs = [...]; // languages.js

// Reference to language selection elements <select>
var select_language = document.getElementById('select_language');
var select_dialect  = document.getElementById('select_dialect');

// Create selection objects
var _language = new Selection(select_language);
var _dialect = new Selection(select_dialect);

// Add language options
_language.addOptions( langs, 1 );

// Assign the default language
updateCountry(6);

// Reference to card elements
// var myDeck          = document.getElementById('myDeck');
// var current_card    = document.getElementById('current_card');
// var front           = document.getElementById('front');
// var back            = document.getElementById('back');
// var correct         = document.getElementById('correct');
// var in_correct      = document.getElementById('in_correct');

// Speech variables
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

// Speech elements
// var start_button    = document.getElementById('start_button');

// Check if speech supported by browser
if (!('webkitSpeechRecognition' in window)) {
  console.log( 'Speech recognition not supported in current browser. Please use Chrome' + '\n' +
         'If you are using Chrome already, time to upgrade!');
} else {
  start_button.style.display = 'inline-block';
    
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    //showInfo('info_speak_now');
    start_img.src = '../images/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = '../images/mic.gif';
      //showInfo('info_no_speech');
      console.log('->Speech not recognized.');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = '../images/mic.gif';
      //showInfo('info_no_microphone');
      console.log('->No microphone detected.');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        //showInfo('info_blocked');
        console.log('Access blocked.');
      } else {
        //showInfo('info_denied');
        console.log('Access denied.');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = '../images/mic.gif';
    if (!final_transcript) {
      //showInfo('info_start');
      return;
    }
    //showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = final_transcript.toLowerCase();
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      //showButtons('inline-block');
    }
  };
}

// Deal with line breaks
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, ' ').replace(one_line, ' ');
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = '../images/mic-slash.gif';
  //showInfo('info_allow');
  //showButtons('none');
  start_timestamp = event.timeStamp;
}

*/