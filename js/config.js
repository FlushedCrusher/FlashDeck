/**
 * Config Object
 * @param {Object} userState
 */
function Config( userState ) {
    
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
    
    this.appState              = undefined;
    this.cycle                 = undefined;
    this.deckLimit             = undefined;
    this.endMessageFront       = 'Congratulations!';
    this.endMessageBack        = 'You did it!';
    this.flashDuration         = 750;
    this.flipDuration          = 2000;
    this.flipOnHover           = undefined;
    this.masteryLevel          = 3;
    this.persistState          = undefined;
    this.quizType              = undefined;
    this.showReponseCount      = undefined;
    this.showReponseIndicators = undefined;
    this.showTimer             = undefined;
    this.version               = '1.1.0';
    
    this.default = {
        appState                : self.stateEnum.FIRSTLOAD,
        cycle                   : self.cycleEnum.FORWARD,   
        quizType                : self.quizEnum.REVIEW,
        deckLimit               : Number.MAX_VALUE,
        flipOnHover             : false,
        persistState            : false,
        showReponseCount        : true,
        showReponseIndicators   : true,
        showTimer               : true
    };
    this.state = userState || this.default;
    
    this.applyState(this.state);
    
}
Config.prototype.setConfig = function( key, value ) {
    this[key] = value;
};
Config.prototype.saveState = function() {
    for(setting in this.state) {
        this.state[setting] = this[setting];
    }
};
Config.prototype.getState = function() {
    return this.state;
};
Config.prototype.applyState = function( state ) {
    for(setting in state) {
        this.setConfig( setting, state[setting] );
    }
};