// A way to store a deck of cards & cards mastered in a deck
function Deck( cards ) {
    this.cards = cards || [];
    this.mastered = [];
}

// A way to get a deck of cards & cards mastered in a deck
Deck.prototype.getCards = function() { return this.cards; };
Deck.prototype.getMastered = function() { return this.mastered; };

// A way to get a single card
Deck.prototype.getCard = function( index ) {
    return (index) ? this.cards[index] : this.getCards;
};

// A way to get a single card at random
Deck.prototype.getRandomCard = function() {
    var index = Math.round(Math.random()*this.numCards()) + 1;
    return this.cards[index];
};

// A way to get the number of cards in a deck & the number of cards mastered in a deck
Deck.prototype.numCards = function() { return this.cards.length; };
Deck.prototype.numMastered = function() { return this.mastered.lengh; };

// A way to add and remove cards from a deck
Deck.prototype.addCard = function( card ) { this.cards.push( card ); };
Deck.prototype.removeCard = function( index ) { this.cards.splice(index, 1); };

// A way to add to the mastered cards in a deck
Deck.prototype.addToMastered = function( index ) {
    this.mastered.push( this.cards[index] );
    this.removeCard( index );
};

// A way to tell if a deck is mastered
Deck.prototype.isMastered = function() {
    return this.numCards.length === 0;
};

// A way to reset the mastery of a deck
Deck.prototype.reset = function() {
    var self = this;
    this.mastered.forEach( function( card ) {
        self.cards.push( card );
    });
    this.mastered = [];
};

// A way to print a card in a deck
Deck.prototype.printCard = function( index ) {
    return this.cards[index].print();
};

// A way to print the stats of a card in a a deck
Deck.prototype.printCardStats = function( index ) {
    return this.cards[index].printStats();
};

// A way to print all cards in a deck
Deck.prototype.printCards = function() {
    var tmp = [];
    this.cards.forEach(function( card ) {
        tmp.push(card.print());
    });
    return tmp;
};

// A way to print the stats of all cards in a deck
Deck.prototype.printStats = function() {
    var tmp = [];
    this.cards.forEach(function( card ) {
        tmp.push(card.printStats());
    });
    return tmp;
};