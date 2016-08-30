var cycleEnum = {
    FORWARD: {
        name: 'Forward',
        value: 'forward'
    },
    BACKWARD: {
        name: 'Backward',
        value: 'backward'
    },
    RANDOM: {
        name: 'Random',
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

var config = {
    appState                : stateEnum.FIRSTLOAD,
    cycle                   : cycleEnum.FORWARD,
    deckLimit               : Number.MAX_VALUE,
    endMessageFront         : 'Congratulations!',
    endMessageBack          : 'You did it!',
    flashDuration           : 750,
    flipDuration            : 2000,
    flipOnHover             : undefined,
    flipType                : 'userInput',
    masteryLevel            : 3,
    showReponseCount        : undefined,
    showReponseIndicators   : undefined,
    showTimer               : undefined,
    timerDuration           : 0,
    timerEnd                : 0,
    timerStart              : 0,
    timerIncrement          : 100,
    varsion                 : '1.0.0'
};

config.default = {
    flipOnHover             : false,
    showReponseCount        : true,
    showReponseIndicators   : true,
    showTimer               : true
};