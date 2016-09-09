// An object to store a card attributes
function Card(phrase, definition) {
    this.phrase = phrase;
    this.definition = definition.toLowerCase();
    this.timesCorrect = 0;
    this.timesIncorrect = 0;
    this.averageAnswerTime = 0;
    this.masteryLevel = 3;
}

// A function(s) to get card card attributes
Card.prototype.getPhrase = function() { return this.phrase; };
Card.prototype.getDefinition = function() { return this.definition; };
Card.prototype.getTimesCorrect = function() { return this.timesCorrect; };
Card.prototype.getTimesIncorrect = function() { return this.timesIncorrect; };
Card.prototype.getTimesAnswered = function() { return this.timesCorrect + this.timesIncorrect; };
Card.prototype.getAverageAnswerTime = function() { return this.averageAnswerTime; };
Card.prototype.getMasteryLevel = function() { return this.masteryLevel; };

// A function(s) to set card attributes
Card.prototype.setPhrase = function( newVal ) { this.phrase = newVal; };
Card.prototype.setDefinition = function( newVal ) { this.definition = newVal.toLowerCase(); };
Card.prototype.setMasteryLevel = function( newVal ) { this.masteryLevel = newVal; };

// A function to increment correct / incorrect counts
Card.prototype.timesCorrectPlus = function( num ) { this.timesCorrect += num || 1; };
Card.prototype.timesIncorrectPlus = function( num ) { this.timesIncorrect += num || 1 };
Card.prototype.calculateAverageAnswerTime = function( num ) {
    var tmp = this.averageAnswerTime * (this.getTimesAnswered() - 1) + num;
    this.averageAnswerTime = tmp / this.getTimesAnswered();
};

// A way to reset the mastery of a card
Card.prototype.reset = function() {
    this.timesCorrect = 0;
    this.timesIncorrect = 0;
    this.averageAnswerTime = 0;
}

// A function to tell if a card is mastered
Card.prototype.isMastered = function() { return this.timesCorrect === this.masteryLevel; };

// A function to print a card
Card.prototype.print = function() {
    var tmp = this.phrase + ": " + this.definition;

    return tmp;
}

// A function to print card stats
Card.prototype.printStats = function() {
    var tmp = '~Card Stats~ ' + '\n';
    tmp += 'Phrase: ' + this.phrase + '\n';
    tmp += 'Definition: ' + this.definition + '\n';
    tmp += 'Times Correct: ' + this.timesCorrect + '\n';
    tmp += 'Times Incorrect: ' + this.timesIncorrect + '\n';
    
    return tmp;
};

// A function to handle a response
Card.prototype.handleResponse = function( correct ) {
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
}