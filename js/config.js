/**
 * Config Object
 * @param {Object} userState
 */
function Config( userState ) {
    'use strict';
    
    var self = this;
    
    this.cycleEnum = {
        FORWARD: {
            name: 'FORWARD',
            value: 'forward'
        },
        BACKWARD: {
            name: 'BACKWARD',
            value: 'backward'
        },
        RANDOM: {
            name: 'RANDOM',
            value: 'random'
        }
    };
    this.stateEnum = {
        FIRSTLOAD: {
            name: 'First Load',
            value: 'firstLoad'
        },
        INITIAL: {
            name: 'Initial',
            value: 'initial'
        },
        QUIZZING: {
            name: 'Quizzing',
            value: 'quizzing'
        },
        FINISHED: {
            name: 'Finished',
            value: 'finished'
        }
    };
    this.quizEnum = {
        TEST: {
            name: 'TEST',
            value: 'test'
        },
        STANDARD: {
            name: 'STANDARD',
            value: 'standard'
        },
        REVIEW: {
            name: 'REVIEW',
            value: 'review'
        }
    };
    this.limitEnum = {
        THREE   : {
            name: 'THREE',
            value: 3
        },
        FIVE    : {
            name: 'FIVE',
            value: 5
        },
        TEN     : {
            name: 'TEN',
            value: 10
        },
        TWENTY  : {
            name: 'TWENTY',
            value: 20
        },
        ALL     : {
            name: 'ALL',
            value: Number.MAX_VALUE
        }
    };
    this.masteryEnum = {
        STANDARD: {
            name: 'STANDARD',
            value: 'standard'
        },
        SEQUENTIAL: {
            name: 'SEQUENTIAL',
            value: 'sequential'
        }
    };
    
    this.appState              = undefined;
    this.cycle                 = undefined;
    this.deckLimit             = undefined;
    this.endMessageFront       = 'Congratulations!';
    this.endMessageBack        = 'You did it!';
    this.flashDuration         = 750;
    this.flipDuration          = 2000;
    this.flipOnHover           = undefined;
    this.masteryType           = undefined;
    this.masteryLevel          = 3;
    this.persistState          = undefined;
    this.quizType              = undefined;
    this.showReponseCount      = undefined;
    this.showReponseIndicators = undefined;
    this.showTimer             = undefined;
    this.showProgress          = undefined;
    this.version               = '1.1.0';
    
    this.default = {
        appState                : self.stateEnum.FIRSTLOAD,
        cycle                   : self.cycleEnum.FORWARD,   
        quizType                : self.quizEnum.REVIEW,
        deckLimit               : self.limitEnum.ALL,
        masteryType             : self.masteryEnum.STANDARD,
        flipOnHover             : false,
        persistState            : false,
        showReponseCount        : true,
        showReponseIndicators   : true,
        showTimer               : true,
        showProgress            : true
    };
    this.state = userState || this.default;
    
    this.applyState(this.state);
    
}
Config.prototype.setConfig = function( key, value ) {
    'use strict';
    this[key] = value;
};
Config.prototype.saveState = function() {
    'use strict';
    for(var setting in this.state) {
        if(this.state.hasOwnProperty(setting)) {
            this.state[setting] = this[setting];
        }
    }
};
Config.prototype.getState = function() {
    'use strict';
    return this.state;
};
Config.prototype.applyState = function( state ) {
    'use strict';
    for(var setting in state) {
        if(state.hasOwnProperty(setting)) {
            this.setConfig( setting, state[setting] );
        }
    }
};