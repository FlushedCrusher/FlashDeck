/**
 * Deck Object
 * @param {Card[]} cards
 */
function Deck( cards ) {
    'use strict';
    
    this.cards = cards || [];
    this.mastered = [];
    this.limit = Number.MAX_VALUE;
}
Deck.prototype.getCards = function() {
    'use strict';
    return this.cards;
};
Deck.prototype.getMastered = function() {
    'use strict';
    return this.mastered;
};
Deck.prototype.getCount = function() {
    'use strict';
    return Math.min(this.cards.length, this.limit);
};
Deck.prototype.getCard = function( index ) {
    'use strict';
    return (typeof index !== 'undefined') ? this.cards[index] : this.getCards;
};
Deck.prototype.getRandomCard = function() {
    'use strict';
    var index = Math.round( Math.random() * this.numCards() ) + 1;
    return this.cards[index];
};
Deck.prototype.getCardIndex = function( card ) {
    'use strict';
    return this.cards.indexOf( card );
};
Deck.prototype.setLimit = function( num ) {
    'use strict';
    this.limit = num;
};
Deck.prototype.numCards = function() {
    'use strict';
    return this.cards.length;
};
Deck.prototype.numMastered = function() {
    'use strict';
    return this.mastered.length;
};
Deck.prototype.addCard = function( card ) {
    'use strict';
    this.cards.push( card );
};
Deck.prototype.removeCard = function( index ) {
    'use strict';
    this.cards.splice(index, 1);
};
Deck.prototype.addToMastered = function( index ) {
    'use strict';
    this.mastered.push( this.cards[index] );
    this.removeCard( index );
};
Deck.prototype.setMasteryLevel = function( val ) {
    'use strict';
    this.cards.forEach( function( card ) {
        card.setMasteryLevel( val );
    });
    this.mastered.forEach( function( card ) {
        card.setMasteryLevel( val );
    });
};
Deck.prototype.setMasteryType = function ( val ) {
    'use strict';
    this.cards.forEach( function( card ) {
        card.setMasteryType( val );
    });
    this.mastered.forEach( function( card ) {
        card.setMasteryType( val );
    });
};
Deck.prototype.isMastered = function() {
    'use strict';
    return this.numCards() === 0;
};
Deck.prototype.reset = function() {
    'use strict';
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
    'use strict';
    return this.cards[index].print();
};
Deck.prototype.printCardStats = function( index ) {
    'use strict';
    return this.cards[index].printStats();
};
Deck.prototype.printCards = function() {
    'use strict';
    var tmp = [];
    this.cards.forEach(function( card ) {
        tmp.push(card.print());
    });
    return tmp;
};
Deck.prototype.printStats = function() {
    'use strict';
    var tmp = [];
    this.cards.forEach(function( card ) {
        tmp.push(card.printStats());
    });
    return tmp;
};