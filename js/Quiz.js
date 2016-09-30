/**
 * Quiz Element
 * @param {Object} attrs
 *  @deck
 *  @cycleMethod
 *  @cycleCallback
 *  @flipCallback
 *  @responseCallback
 *  @resetCallback
 */
function Quiz( attrs ) {
    'use strict';
 
    this.deck = attrs.deck || new Deck();
    this.cycleMethod = attrs.cycleMethod || 'forward';
    this.cycleCallback = attrs.cycleCallback || function() {
        console.log('Cycling');
    };
    this.flipCallback = attrs.flipCallback || function() {
        console.log('Flipping');
    };
    this.responseCallback = attrs.responseCallback || function( known ) {
        console.log('Handling Response for: ' + known);
    };
    this.resetCallback = attrs.resetCallback || function() {
        console.log('Resetting');
    };
    
    this.element = document.createElement('div');
    this.element.classList.add('quiz_container');
        
    this.card_container = document.createElement('div');
    this.card_container.classList.add('left', 'card_container');
    
    this.current_card = document.createElement('div');
    this.current_card.classList.add('card');
    this.current_card.dataset.index = 0;
    
    this.front = document.createElement('span');
    this.front.classList.add('front');
    this.front.textContent = 'FRONT';
    
    this.back = document.createElement('span');
    this.back.classList.add('back');
    this.back.textContent = 'BACK';
    
    this.current_card.appendChild(this.front);
    this.current_card.appendChild(this.back);
    
    this.card_container.appendChild(this.current_card);
    
    this.element.appendChild(this.card_container);
}
Quiz.prototype = Object.create(Element.prototype);
Quiz.prototype.getCurrentIndex = function() {
    'use strict';
    return parseInt( this.current_card.dataset.index );
};
Quiz.prototype.setDeck = function( deck ) {
    'use strict';
    this.deck = deck;
    this.setCard( this.deck.getCard( 0 ) );
};
Quiz.prototype.setCard = function( card ) {
    'use strict';
    this.front.textContent = card.phrase;
    this.back.textContent = card.definition;
    this.current_card.dataset.index = this.deck.getCardIndex( card );
};
Quiz.prototype.setCycleMethod = function( _cycleEnum ) {
    'use strict';
    this.cycleMethod = _cycleEnum.value;
};
Quiz.prototype.setDeckLimit = function( _limitEnum ) {
    'use strict';
    this.deck.setLimit( _limitEnum.value );
};
Quiz.prototype.setMasteryType = function( _masteryEnum ) {
    'use strict';
    this.deck.setMasteryType( _masteryEnum.value );
};
Quiz.prototype.flipCard = function() {
    'use strict';
    this.flipCallback();
    this.current_card.classList.toggle('flipped');
};
Quiz.prototype.cycleCard = function() {
    'use strict';
    this.cycleCallback();
    switch(this.cycleMethod) {
        case 'forward':
            this.cycleForward();
            break;
        case 'backward':
            this.cycleBackward();
            break;
        case 'random':
            this.cycleRandom();
            break;
        default:
            this.cycleForward();
            console.error('error cycling card. Defaulting to forward cycle.');
    }
};
Quiz.prototype.cycleForward = function() {
    'use strict';
    console.log('->cycleForward');
    var index = (this.getCurrentIndex() + 1) % this.deck.getCount();
    this.setCard( this.deck.getCard( index ) );
};
Quiz.prototype.cycleBackward = function() {
    'use strict';
    console.log('->cycleBackward');
    var index = ((this.getCurrentIndex() || this.deck.getCount()) - 1) % this.deck.getCount();
    this.setCard( this.deck.getCard( index ) );
};
Quiz.prototype.cycleRandom = function() {
    'use strict';
    console.log('->cycleRandom');
    var index = this.getCurrentIndex();
    var card;
    while(index === this.getCurrentIndex()) {
        card = this.deck.getRandomCard();
        index = this.deck.getCardIndex( card );
    }
    this.setCard( card );
};
Quiz.prototype.handleResponse = function( known, time ) {
    'use strict';
    this.responseCallback.call(this, known, time );
};
Quiz.prototype.clear = function() {
    'use strict';
    this.deck = [];
    this.front.textContent = 'FRONT';
    this.back.textContent = 'BACK';
    this.current_card.dataset.index = 0;
};
Quiz.prototype.reset = function() {
    'use strict';
    this.resetCallback();
};
Quiz.prototype.isFinished = function() {
    'use strict';
    return this.deck.isMastered();
};