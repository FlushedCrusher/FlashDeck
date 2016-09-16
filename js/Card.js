function Card(attr, definition) {
    this.phrase;
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
        for(elem in attr) {
            this[elem] = attr[elem]
        }
    } else {
        this.phrase = attr;
    }
}
Card.prototype.getPhrase = function() { return this.phrase; };
Card.prototype.getDefinition = function() { return this.definition; };
Card.prototype.getTimesCorrect = function() { return this.timesCorrect; };
Card.prototype.getTimesIncorrect = function() { return this.timesIncorrect; };
Card.prototype.getTimesAnswered = function() { return this.timesCorrect + this.timesIncorrect; };
Card.prototype.getAverageAnswerTime = function() { return this.averageAnswerTime; };
Card.prototype.getMasteryLevel = function() { return this.masteryLevel; };
Card.prototype.setPhrase = function( newVal ) { this.phrase = newVal; };
Card.prototype.setDefinition = function( newVal ) { this.definition = newVal.toLowerCase(); };
Card.prototype.setMasteryLevel = function( newVal ) { this.masteryLevel = newVal; };
Card.prototype.setMasteryType = function( newVal ) { this.masteryType = newVal; };
Card.prototype.timesCorrectPlus = function( num ) { this.timesCorrect += num || 1; };
Card.prototype.timesIncorrectPlus = function( num ) { this.timesIncorrect += num || 1 };
Card.prototype.calculateAverageAnswerTime = function( num ) {
    var tmp = this.averageAnswerTime * (this.getTimesAnswered() - 1) + num;
    this.averageAnswerTime = tmp / this.getTimesAnswered();
};
Card.prototype.reset = function() {
    this.timesCorrect = 0;
    this.timesIncorrect = 0;
    this.averageAnswerTime = 0;
}
Card.prototype.isMastered = function() { return this.timesCorrect === this.masteryLevel; };
Card.prototype.print = function() {
    var tmp = this.phrase + ": " + this.definition;

    return tmp;
}
Card.prototype.printStats = function() {
    var tmp = '~Card Stats~ ' + '\n';
    tmp += 'Phrase: ' + this.phrase + '\n';
    tmp += 'Definition: ' + this.definition + '\n';
    tmp += 'Times Correct: ' + this.timesCorrect + '\n';
    tmp += 'Times Incorrect: ' + this.timesIncorrect + '\n';
    
    return tmp;
};
Card.prototype.handleResponse = function( correct ) {
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
}