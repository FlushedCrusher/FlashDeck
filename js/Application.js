// Application Control
function emptyHandler() {}
function initSettings() {
    'use strict';
    
    config_settings.forEach(function(setting) {
        setting.init();
    });
}

var stateChangeEvent = new CustomEvent("stateChange", {});
var typeChangeEvent = new CustomEvent("typeChange", {});
var stateCallbacks = {};
var typeCallbacks = {};

function stateChangeHandler() {
    'use strict';
    setStateCallbacks();
}
function typeChangeHandler() {
    'use strict';
    setTypeCallbacks();
}
function changeAppState( state ) {
    'use strict';
    config.appState = state;
    document.dispatchEvent( stateChangeEvent );
}
/*exported changeAppType */
function changeAppType( type ) {
    'use strict';
    config.quizType = type;
    document.dispatchEvent( typeChangeEvent );
}

var firstLoadStateCallbacks = {
    onResetPress            : emptyHandler,
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
    },
    configOkayCallback      : function() {
        'use strict';
        config.saveState();
    },
    configCancelCallback    : function() {
        'use strict';
        config.applyState( config.state );
        initSettings();
    },
    configResetCallback     : emptyHandler,
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : function() {
        'use strict';
        quiz.flipCard();
    },
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var initStateCallbacks = {
    onResetPress            : emptyHandler,
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
    },
    configOkayCallback      : function() {
        'use strict';
        timer.start();
        changeAppState( config.stateEnum.QUIZZING );
        config.saveState();
    },
    configCancelCallback    : function() {
        'use strict';
        changeAppState( config.stateEnum.FIRSTLOAD );
        deck_loader.setLoadedText();
        quiz.clear();
        config.applyState( config.state );
        initSettings();
    },
    configResetCallback     : function() {
        'use strict';
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
        progress_bar.clear();
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
    },
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : function() {
        'use strict';
        quiz.flipCard();
    },
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var quizzingStateCallbacks = {
    onResetPress            : emptyHandler,
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
        timer.toggleTimer();
        eventManager.removeWindowKeyListeners();
    },
    configOkayCallback      : function() {
        'use strict';
        timer.toggleTimer();
        eventManager.addWindowKeyListeners();
        config.saveState();
    },
    configCancelCallback    : function() {
        'use strict';
        timer.toggleTimer();
        eventManager.addWindowKeyListeners();
        config.applyState( config.state );
        initSettings();
    },
    configResetCallback     : function() {
        'use strict';
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
        timer.clear();
        progress_bar.clear();
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
        quiz.setCard( quiz.deck.cards[0] );
    },
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : function() {
        'use strict';
        timer.clear();
        quiz.cycleBackward();
    },
    onNavFlipPress          : function() {
        'use strict';
        eventManager.removeWindowKeyListeners();
        eventManager.addResponseKeyListeners();
        response_modal.show();
        timer.toggleTimer();
        quiz.flipCard();
    },
    onNavRightPress         : function() {
        'use strict';
        timer.clear();
        quiz.cycleForward();
    },
    onResponseReturnPress   : this.onResponseLeftPress,
    onResponseLeftPress     : function() {
        'use strict';
        success_indicator.element.classList.add("flash");
        setTimeout(function() {
            success_indicator.element.classList.remove("flash");
        }, config.flashDuration);
        quiz.flipCard();
        quiz.handleResponse( true, timer.duration );
        eventManager.addWindowKeyListeners();
        eventManager.removeResponseKeyListeners();
        response_modal.hide();
        timer.clear();
        timer.toggleTimer();
    },
    onResponseRightPress    : function() {
        'use strict';
        failure_indicator.element.classList.add("flash");
        setTimeout(function() {
            failure_indicator.element.classList.remove("flash");
        }, config.flashDuration);
        quiz.flipCard();
        quiz.handleResponse( false, timer.duration );
        eventManager.addWindowKeyListeners();
        eventManager.removeResponseKeyListeners();
        response_modal.hide();
        timer.clear();
        timer.toggleTimer();
    },
    onSpacePress            : function() {
        'use strict';
        pause_overlay.toggleOverlay();
        timer.toggleTimer();
        if(eventManager.windowKeyExists) {
            eventManager.removeWindowKeyListeners();
        } else {
            eventManager.addWindowKeyListeners();
        }
    }
};
var finishedStateCallbacks = {
    onResetPress            : function() {
        'use strict';
        changeAppState( config.stateEnum.QUIZZING );
        quiz.deck.removeCard( 0 );
        quiz.flipCard();
        firework_overlay.remove();
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
        timer.clear();
        progress_bar.clear();
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
        quiz.setCard( quiz.deck.cards[0] );
        timer.start();
        reset_button.invisible();
    },
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
    },
    configOkayCallback      : emptyHandler,
    configCancelCallback    : emptyHandler,
    configResetCallback     : emptyHandler,
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : emptyHandler,
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var testTypeCallbacks = {};
var standardTypecallbacks = {};
var reviewTypeCallbacks = {};

function setStateCallbacks() {
    'use strict';
    switch(config.appState.value) {
        case 'firstLoad':
            stateCallbacks = firstLoadStateCallbacks;
            break;
        case 'initial':
            stateCallbacks = initStateCallbacks;
            break;
        case 'quizzing':
            stateCallbacks = quizzingStateCallbacks;
            break;
        case 'finished':
            stateCallbacks = finishedStateCallbacks;
            break;
        default:
            break;
    }
}
function setTypeCallbacks() {
    'use strict';
    switch(config.quizType.value) {
        case 'test':
            typeCallbacks = testTypeCallbacks;
            break;
        case 'standard':
            typeCallbacks = standardTypecallbacks;
            break;
        case 'review':
            typeCallbacks = reviewTypeCallbacks;
            break;
        default:
            break;
    }
}

// Event Handlers
function windowLeftHandler() {
    'use strict';
    stateCallbacks.onNavLeftPress();
}
function windowUpHandler() {
    'use strict';
    stateCallbacks.onNavFlipPress();
}
function windowRightHandler() {
    'use strict';
    stateCallbacks.onNavRightPress();
}
function responseReturnHandler() {
    'use strict';
    stateCallbacks.onResponseReturnPress();
}
function responseLeftHandler() {
    'use strict';
    stateCallbacks.onResponseLeftPress();
}
function responseRightHandler() {
    'use strict';
    stateCallbacks.onResponseRightPress();
}
function windowSpaceHandler() {
    'use strict';
    stateCallbacks.onSpacePress();
}
function persistStateLoadHandler() {
    'use strict';
    console.log('Persist state loaded.');
    var data = JSON.parse(localStorage.flashDeck);
    for(var index in data.quiz.cards) {
        if(data.quiz.cards.hasOwnProperty(index)) {
            quiz.deck.addCard( new Card( data.quiz.cards[index] ) );
        }
    }
    for(index in data.quiz.mastered) {
        if(data.quiz.mastered.hasOwnProperty(index)) {
            var lastIndex = quiz.deck.numCards();
            quiz.deck.addCard( new Card( data.quiz.mastered[index] ) );
            quiz.deck.addToMastered( lastIndex );
        }
    }
    quiz.setCard( quiz.deck.getCard( data.quiz.currentIndex ) );
    quiz.setCycleMethod(config.cycle);
    quiz.setDeckLimit(config.deckLimit);
    quiz.setMasteryType(config.masteryType);
    correct.setCount( data.correct );
    incorrect.setCount( data.incorrect );
    timer.setTime( data.timer );
    progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
    progress_bar.setCurrentVal( quiz.deck.numMastered() );
    progress_bar.setCalculatedWidth();
    changeAppState( config.appState );
    timer.start();
    stateCallbacks.onSpacePress();
}
function persistStateUnloadHandler() {
    'use strict';
    var json = {
        'state'     : config.getState(),
        'timesatamp': new Date().getTime(),
        'quiz'      : {
            cards           : Object.assign({}, quiz.deck.cards),
            mastered        : Object.assign({}, quiz.deck.mastered),
            currentIndex    : quiz.getCurrentIndex()
        },
        correct     : correct.getCount(),
        incorrect   : incorrect.getCount(),
        timer       : timer.getTime()
    };
    localStorage.flashDeck = JSON.stringify(json);
}

// Modal Handlers
function responseOkayCallback() {
    'use strict';
    stateCallbacks.onResponseLeftPress();
}
function responseCancelCallback() {
    'use strict';
    stateCallbacks.onResponseRightPress();
}
function configCloseCallback() {
    'use strict';
    stateCallbacks.configCloseCallback();
}
function configResetCallback() {
    'use strict';
    stateCallbacks.configResetCallback();
}
function configOkayCallback() {
    'use strict';
    stateCallbacks.configOkayCallback();
}
function configCancelCallback() {
    'use strict';
    stateCallbacks.configCancelCallback();
}

// Button Handlers
function onNavLeftPress() {
    'use strict';
    stateCallbacks.onNavLeftPress();
}
function onNavFlipPress() {
    'use strict';
    stateCallbacks.onNavFlipPress();
}
function onNavRightPress() {
    'use strict';
    stateCallbacks.onNavRightPress();
}
function onConfigPress() {
    'use strict';
    stateCallbacks.onConfigPress();
}
function onResetPress() {
    'use strict';
    stateCallbacks.onResetPress();
}

// Select Handlers
function selectInit() {
    'use strict';
    /*jshint validthis: true */
    var method = config[this.select.dataset.name];
    this.setSelect( method.name );
}
function handleSelectCycle() {
    'use strict';
    /*jshint validthis: true */
    config[this.select.dataset.name] = config.cycleEnum[this.select.value];
}
function handleCycleChange() {
    'use strict';
    /*jshint validthis: true */
    quiz.setCycleMethod(config.cycleEnum[this.select.value]);
}
function handleSelectLimit() {
    'use strict';
    /*jshint validthis: true */
    config[this.select.dataset.name] = config.limitEnum[this.select.value];
}
function handleLimitChange() {
    'use strict';
    /*jshint validthis: true */
    quiz.setDeckLimit(config.limitEnum[this.select.value]);
}
function handleSelectMastery() {
    'use strict';
    /*jshint validthis: true */
    config[this.select.dataset.name] = config.masteryEnum[this.select.value];
}
function handleMasteryChange() {
    'use strict';
    /*jshint validthis: true */
    quiz.setMasteryType(config.masteryEnum[this.select.value]);
}

// Toggle Handlers
function toggleInit() {
    'use strict';
    /*jshint validthis: true */
    var on = config[this.toggle.dataset.name];
    this.setToggle(on);
}
function handleToggle() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    config[this.toggle.dataset.name] = (val === 'true') ? true : false;
}
function handleResponseCountVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        correct.visible();
        incorrect.visible();
    } else {
        correct.invisible();
        incorrect.invisible();
    }
}
function handleResponseIndicatorVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        success_indicator.visible();
        failure_indicator.visible();
    } else {
        success_indicator.invisible();
        failure_indicator.invisible();
    }
}
function handleTimerVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        timer.visible();
    } else {
        timer.invisible();
    }
}
function handlePersistStateToggle() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        eventManager.addPersistStateListener();
    } else {
        eventManager.removePersistStateListener();
    }
}
function handleProgressVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        progress_bar.visible();
    } else {
        progress_bar.invisible();
    }
}

// Overlay Handlers
function pauseApplyCallback() {
    'use strict';

}
function pauseRemoveCallback() {
    'use strict';

}
function fireworkApplyCallback() {
    'use strict';

}
function fireworkRemoveCallback() {
    'use strict';
    
}

// Loader Handler
function handleLoadDeck( result ) {
    'use strict';
    var deck = new Deck();
    var cards = result.split('\n');
    cards.forEach( function( card ) {
        var _card = card.split('[]');
        deck.addCard( new Card(_card[0], _card[1]));
    });
    quiz.setDeck( deck );
    quiz.setCycleMethod(config.cycle);
    quiz.setDeckLimit(config.deckLimit);
    quiz.setMasteryType(config.masteryType);
    changeAppState( config.stateEnum.INITIAL );
}

// Quiz Handlers
function cycleCallback() {
    'use strict';
    if(quiz.isFinished()) {
        quiz.deck.cards.push( new Card(config.endMessageFront, config.endMessageBack) );
        changeAppState( config.stateEnum.FINISHED );
        firework_overlay.apply();
        timer.toggleTimer();
        timer.clear();
        setTimeout(function() {
            quiz.flipCard();
            reset_button.visible();
        }, 2000);
    }
}
function flipCallback() {
    'use strict';
    
}
function responseCallback( known, time ) {
    'use strict';
    /*jshint validthis: true */
    if(known) {
        correct.increment();
    } else {
        incorrect.increment();
    }
    var index = this.getCurrentIndex();
    var card = this.deck.cards[ index ];
    card.handleResponse( known );
    card.calculateAverageAnswerTime( time );
    if(card.isMastered()) {
        this.deck.addToMastered( index );
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
        progress_bar.setCurrentVal( quiz.deck.numMastered() );
        progress_bar.setCalculatedWidth();
    }
    this.cycleCard();
}
function resetCallback() {
    'use strict';
    correct.clear();
    incorrect.clear();
}