// Application Control
function emptyHandler() {};

var stateChangeEvent = new CustomEvent("stateChange", {});
var typeChangeEvent = new CustomEvent("typeChange", {});
var stateCallbacks = {};
var typeCallbacks = {};

function stateChangeHandler() {
    setStateCallbacks();
}
function typeChangeHandler() {
    setTypeCallbacks();
}
function changeAppState( state ) {
    config.appState = state;
    document.dispatchEvent( stateChangeEvent );
}
function changeAppType( type ) {
    config.quizType = type;
    document.dispatchEvent( typeChangeEvent );
}

var firstLoadStateCallbacks = {
    onConfigPress           : function() {
        config_modal.toggle();
    },
    configOkayCallback      : function() {
        config.saveState();
    },
    configCancelCallback    : function() {
        config.applyState( config.state );
        select_cycle.init();
        toggle_flip.init();
        toggle_counts.init();
        toggle_indicators.init();
        toggle_timer.init();
    },
    configResetCallback     : emptyHandler,
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : function() {
        quiz.flipCard();
    },
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var initStateCallbacks = {
    onConfigPress           : function() {
        config_modal.toggle();
    },
    configOkayCallback      : function() {
        timer.start();
        changeAppState( config.stateEnum.QUIZZING );
        config.saveState();
    },
    configCancelCallback    : function() {
        changeAppState( config.stateEnum.FIRSTLOAD );
        deck_loader.setLoadedText();
        quiz.clear();
        config.applyState( config.state );
        select_cycle.init();
        toggle_flip.init();
        toggle_counts.init();
        toggle_indicators.init();
        toggle_timer.init();
    },
    configResetCallback     : function() {
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
    },
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : function() {
        quiz.flipCard();
    },
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var quizzingStateCallbacks = {
    onConfigPress           : function() {
        config_modal.toggle();
        timer.toggleTimer();
        eventManager.removeWindowKeyListeners();
    },
    configOkayCallback      : function() {
        timer.toggleTimer();
        eventManager.addWindowKeyListeners();
        config.saveState();
    },
    configCancelCallback    : function() {
        timer.toggleTimer();
        eventManager.addWindowKeyListeners();
        config.applyState( config.state );
        select_cycle.init();
        toggle_flip.init();
        toggle_counts.init();
        toggle_indicators.init();
        toggle_timer.init();
    },
    configResetCallback     : function() {
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
        timer.clear();
        quiz.setCard( quiz.deck.cards[0] );
    },
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : function() {
        quiz.cycleBackward();
    },
    onNavFlipPress          : function() {
        eventManager.removeWindowKeyListeners();
        eventManager.addResponseKeyListeners();
        response_modal.show();
        timer.toggleTimer();
        quiz.flipCard();
    },
    onNavRightPress         : function() {
        quiz.cycleForward();
    },
    onResponseReturnPress   : this.onResponseLeftPress,
    onResponseLeftPress     : function() {
        quiz.flipCard();
        quiz.handleResponse( true, timer.duration );
        eventManager.addWindowKeyListeners();
        eventManager.removeResponseKeyListeners();
        response_modal.hide();
        timer.clear();
        timer.toggleTimer();
    },
    onResponseRightPress    : function() {
        quiz.flipCard();
        quiz.handleResponse( false, timer.duration );
        eventManager.addWindowKeyListeners();
        eventManager.removeResponseKeyListeners();
        response_modal.hide();
        timer.clear();
        timer.toggleTimer();
    },
    onSpacePress            : function() {
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
    onConfigPress           : function() {
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
    stateCallbacks.onNavLeftPress();
};
function windowUpHandler() {
    stateCallbacks.onNavFlipPress();
};
function windowRightHandler() {
    stateCallbacks.onNavRightPress();
};
function responseReturnHandler() {
    stateCallbacks.onResponseReturnPress();
};
function responseLeftHandler() {
    stateCallbacks.onResponseLeftPress();
};
function responseRightHandler() {
    stateCallbacks.onResponseRightPress();
};
function windowSpaceHandler() {
    stateCallbacks.onSpacePress();
};

// Modal Handlers
function responseOkayCallback() {
    stateCallbacks.onResponseLeftPress();
};
function responseCancelCallback() {
    stateCallbacks.onResponseRightPress();
};
function configCloseCallback() {
    stateCallbacks.configCloseCallback();
};
function configResetCallback() {
    stateCallbacks.configResetCallback();
};
function configOkayCallback() {
    stateCallbacks.configOkayCallback();
};
function configCancelCallback() {
    stateCallbacks.configCancelCallback();
};

// Button Handlers
function onNavLeftPress() {
    stateCallbacks.onNavLeftPress();
}
function onNavFlipPress() {
    stateCallbacks.onNavFlipPress();
}
function onNavRightPress() {
    stateCallbacks.onNavRightPress();
}
function onConfigPress() {
    stateCallbacks.onConfigPress();
}

// Select Handlers
function selectInit() {
    var method = config[this.select.dataset.name];
    this.setSelect( method.name );
}
function handleSelectCycle() {
    config[this.select.dataset.name] = config.cycleEnum[this.select.value];
}
function handleCycleChange() {
    quiz.setCycleMethod(config.cycleEnum[this.select.value]);
}

// Toggle Handlers
function toggleInit() {
    var on = config[this.toggle.dataset.name];
    this.setToggle(on);
}
function handleToggle() {
    var val = this.toggle.dataset.value;
    config[this.toggle.dataset.name] = (val === 'true') ? true : false;
}
function handleResponseCountVisibility() {
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        correct.visible();
        incorrect.visible();
    } else {
        correct.invisible();
        incorrect.invisible();
    }
}
function handleTimerVisibility() {
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        timer.visible();
    } else {
        timer.invisible();
    }
}

// Overlay Handlers
function pauseApplyCallback() {

};
function pauseRemoveCallback() {

};
function fireworkApplyCallback() {};
function fireworkRemoveCallback() {};

// Loader Handler
function handleLoadDeck( result ) {
    var deck = new Deck();
    var cards = result.split('\n');
    cards.forEach( function( card ) {
        var _card = card.split('[]');
        deck.addCard( new Card(_card[0], _card[1]));
    });
    quiz.setDeck( deck );
    changeAppState( config.stateEnum.INITIAL );
}

// Quiz Handlers
function cycleCallback() {
    if(quiz.isFinished()) {
        quiz.deck.cards.push( new Card(config.endMessageFront, config.endMessageBack) );
        changeAppState( config.stateEnum.FINISHED );
        firework_overlay.apply();
        timer.toggleTimer();
        timer.clear();
        setTimeout(function() {
            quiz.flipCard();
        }, 2000);
    }
};
function flipCallback() {};
function responseCallback( known ) {
    if(known) {
        correct.increment();
    } else {
        incorrect.increment();
    }
}
function resetCallback() {
    correct.clear();
    incorrect.clear();
}