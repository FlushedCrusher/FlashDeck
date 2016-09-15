function Deck( cards ) {
    this.cards = cards || [];
    this.mastered = [];
    this.limit = Number.MAX_VALUE;
}
Deck.prototype.getCards = function() { return this.cards; };
Deck.prototype.getMastered = function() { return this.mastered; };
Deck.prototype.getCount = function() {
    return Math.min(this.cards.length, this.limit);
};
Deck.prototype.getCard = function( index ) {
    return (typeof index !== 'undefined') ? this.cards[index] : this.getCards;
};
Deck.prototype.getRandomCard = function() {
    var index = Math.round( Math.random() * this.numCards() ) + 1;
    return this.cards[index];
};
Deck.prototype.getCardIndex = function( card ) {
    return this.cards.indexOf( card );
};
Deck.prototype.setLimit = function( num ) {
    this.limit = num;
};
Deck.prototype.numCards = function() { return this.cards.length; };
Deck.prototype.numMastered = function() { return this.mastered.lengh; };
Deck.prototype.addCard = function( card ) { this.cards.push( card ); };
Deck.prototype.removeCard = function( index ) { this.cards.splice(index, 1); };
Deck.prototype.addToMastered = function( index ) {
    this.mastered.push( this.cards[index] );
    this.removeCard( index );
};
Deck.prototype.setMasteryLevel = function( val ) {
    this.cards.forEach( function( card ) {
        card.setMasteryLevel( val );
    });
    this.mastered.forEach( function( card ) {
        card.setMasteryLevel( val );
    });
}
Deck.prototype.isMastered = function() {
    return this.numCards() === 0;
};
Deck.prototype.reset = function() {
    var self = this;
    this.cards.forEach( function( card ) {
        card.reset();
    });
    this.mastered.forEach( function( card ) {
        card.reset();
        self.cards.push( card );
    });
    this.mastered = [];
};
Deck.prototype.printCard = function( index ) {
    return this.cards[index].print();
};
Deck.prototype.printCardStats = function( index ) {
    return this.cards[index].printStats();
};
Deck.prototype.printCards = function() {
    var tmp = [];
    this.cards.forEach(function( card ) {
        tmp.push(card.print());
    });
    return tmp;
};
Deck.prototype.printStats = function() {
    var tmp = [];
    this.cards.forEach(function( card ) {
        tmp.push(card.printStats());
    });
    return tmp;
};