var cycleEnum = {
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

var stateEnum = {
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

var quizEnum = {
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

var config = {
    appState                : stateEnum.FIRSTLOAD,
    cycle                   : cycleEnum.FORWARD,
    deckLimit               : Number.MAX_VALUE,
    endMessageFront         : 'Congratulations!',
    endMessageBack          : 'You did it!',
    flashDuration           : 750,
    flipDuration            : 2000,
    flipOnHover             : undefined,
    fromSavedState          : undefined,
    masteryLevel            : 3,
    quizType                : quizEnum.REVIEW,
    saveConfig              : true,
    saveDeck                : true,
    showReponseCount        : undefined,
    showReponseIndicators   : undefined,
    showTimer               : undefined,
    timerDuration           : 0,
    timerEnd                : 0,
    timerStart              : 0,
    timerIncrement          : 100,
    version                 : '1.0.0'
};

config.default = {
    flipOnHover             : false,
    showReponseCount        : true,
    showReponseIndicators   : true,
    showTimer               : true
};