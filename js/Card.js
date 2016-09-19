/**
 * Card Object
 * @param {Object || String} attr
 * @param {String} definittion
 */
function Card(attr, definition) {
    'use strict';
    
    this.phrase = undefined;
    this.definition = (definition) ? definition.toLowerCase() : '';
    this.timesCorrect = 0;
    this.timesIncorrect = 0;
    this.averageAnswerTime = 0;
    this.masteryLevel = 3;
    this.masteryType = 'standard';
    
    this.handleStandard = function( correct ) {
        switch( correct ) {
            case true:
                this.timesCorrectPlus( 1 );
                break;
            case false:
                this.timesIncorrectPlus( 1 );
                break;
            default:
                console.error("Error handling response.");
        } 
    };
    this.handleSequntial = function( correct ) {
        switch( correct ) {
            case true:
                this.timesCorrectPlus( 1 );
                break;
            case false:
                this.timesCorrect = 0;
                this.timesIncorrectPlus( 1 );
                break;
            default:
                console.error("Error handling response.");
        } 
    };
    
    if(typeof attr === 'object') {
        for(var elem in attr) {
            if(attr.hasOwnProperty(elem)){
                this[elem] = attr[elem];
            }
        }
    } else {
        this.phrase = attr;
    }
}
Card.prototype.getPhrase = function() {
    'use strict';
    return this.phrase;
};
Card.prototype.getDefinition = function() {
    'use strict';
    return this.definition;
};
Card.prototype.getTimesCorrect = function() {
    'use strict';
    return this.timesCorrect;
};
Card.prototype.getTimesIncorrect = function() {
    'use strict';
    return this.timesIncorrect;
};
Card.prototype.getTimesAnswered = function() {
    'use strict';
    return this.timesCorrect + this.timesIncorrect;
};
Card.prototype.getAverageAnswerTime = function() {
    'use strict';
    return this.averageAnswerTime;
};
Card.prototype.getMasteryLevel = function() {
    'use strict';
    return this.masteryLevel;
};
Card.prototype.setPhrase = function( newVal ) {
    'use strict';
    this.phrase = newVal;
};
Card.prototype.setDefinition = function( newVal ) {
    'use strict';
    this.definition = newVal.toLowerCase();
};
Card.prototype.setMasteryLevel = function( newVal ) {
    'use strict';
    this.masteryLevel = newVal;
};
Card.prototype.setMasteryType = function( newVal ) {
    'use strict';
    this.masteryType = newVal;
};
Card.prototype.timesCorrectPlus = function( num ) {
    'use strict';
    this.timesCorrect += num || 1;
};
Card.prototype.timesIncorrectPlus = function( num ) {
    'use strict';
    this.timesIncorrect += num || 1;
};
Card.prototype.calculateAverageAnswerTime = function( num ) {
    'use strict';
    var tmp = this.averageAnswerTime * (this.getTimesAnswered() - 1) + num;
    this.averageAnswerTime = tmp / this.getTimesAnswered();
};
Card.prototype.reset = function() {
    'use strict';
    this.timesCorrect = 0;
    this.timesIncorrect = 0;
    this.averageAnswerTime = 0;
};
Card.prototype.isMastered = function() {
    'use strict';
    return this.timesCorrect === this.masteryLevel;
};
Card.prototype.print = function() {
    'use strict';
    var tmp = this.phrase + ": " + this.definition;

    return tmp;
};
Card.prototype.printStats = function() {
    'use strict';
    var tmp = '~Card Stats~ ' + '\n';
    tmp += 'Phrase: ' + this.phrase + '\n';
    tmp += 'Definition: ' + this.definition + '\n';
    tmp += 'Times Correct: ' + this.timesCorrect + '\n';
    tmp += 'Times Incorrect: ' + this.timesIncorrect + '\n';
    
    return tmp;
};
Card.prototype.handleResponse = function( correct ) {
    'use strict';
    switch( this.masteryType ) {
        case 'standard':
            this.handleStandard( correct );
            break;
        case 'sequential':
            this.handleSequntial( correct );
            break;
        default:
            console.error("Error handling response.");
    } 
};