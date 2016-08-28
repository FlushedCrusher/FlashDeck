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

var config = {
    cycle                   : cycleEnum.FORWARD,
    endMessageFront         : 'Congratulations!',
    endMessageBack          : 'You did it!',
    flashDuration           : 750,
    flipDuration            : 2000,
    flipOnHover             : false,
    flipType                : 'userInput',
    masteryLevel            : 3,
    showReponseCount        : true,
    showReponseIndicators   : true,
    showTimer               : true,
    timerDuration           : 0,
    timerEnd                : 0,
    timerStart              : 0,
    timerIncrement          : 100,
    quizFinished            : false
};

config.default = {
    flipOnHover             : false,
    showReponseCount        : true,
    showReponseIndicators   : true,
    showTimer               : true
};