function Config() {
    this.default = {
        flipOnHover             : false,
        showReponseCount        : true,
        showReponseIndicators   : true,
        showTimer               : true
    };
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
        QUIZING: {
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
    this.appState              = this.stateEnum.FIRSTLOAD;
    this.cycle                 = this.cycleEnum.FORWARD;
    this.deckLimit             = Number.MAX_VALUE;
    this.endMessageFront       = 'Congratulations!';
    this.endMessageBack        = 'You did it!';
    this.flashDuration         = 750;
    this.flipDuration          = 2000;
    this.flipOnHover           = undefined;
    this.fromSavedState        = undefined;
    this.masteryLevel          = 3;
    this.quizType              = this.quizEnum.REVIEW;
    this.saveConfig            = true;
    this.saveDeck              = true;
    this.showReponseCount      = undefined;
    this.showReponseIndicators = undefined;
    this.showTimer             = undefined;
    this.version               = '1.0.0';
}
Config.prototype.setConfig = function( key, value ) {
    this[key] = value;
};