/*! flashdeck - v1.2.0 - 2016-09-19 *//**
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
/**
 * Element Factory
*/
ElementFactory = window.ElementFactory ? window.ElementFactory : {};
(function(window, undefined) {
    'use strict';
    
    function _ElementFactory() {
        
        var registeredElements = new Map();
        
        function registerElement( key, value ) {
            registeredElements.set( key, value );
        }
        
        function createElement( type, attrs ) {
            var Cls = registeredElements.get(type);
            return new Cls( attrs );
        }
        
        return {
            registerElement : registerElement,
            createElement   : createElement
        };
    }
    ElementFactory = new _ElementFactory();
}(window));

/**
 * Element
 */
function Element() {}
Element.prototype.show = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.display = 'block';
};
Element.prototype.hide = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.display = 'none';
};
Element.prototype.toggle = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.display = (elem.style.display === 'none') ? 'block' : 'none';
};
Element.prototype.visible = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.visibility = 'visible';
};
Element.prototype.invisible = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.visibility = 'hidden';
};
Element.prototype.toggleVisibility = function( component ) {
    'use strict';
    var elem = component ? this[component] : this.element;
    elem.style.visibility = (elem.style.visibility === 'hidden') ? 'visible' : 'hidden';
};
/**
 * Select Element
 * @param {Object} attrs
 *  @label
 *  @handler
 *  @name
 *  @options
 *  @link
 *  @init
 */
function Select( attrs ) {
    'use strict';
    
    var self = this;
    
    this.init = attrs.init;
    
    this.element = document.createElement('div');
    this.element.classList.add('select_span');
    
    this.label = document.createElement('div');
    this.label.classList.add('select_label', 'left');
    this.label.textContent = attrs.label;
    
    this.select = document.createElement('select');
    this.select.classList.add('select_box', 'right');
    this.select.onchange = function() {
        self.handleSelect();
        if(attrs.handler) { attrs.handler.call(self); }
        if(attrs.link) { attrs.link.call(self); }
    };
    this.select.id = 'select_' + attrs.name;
    this.select.dataset.name = attrs.name;
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.select);
    
    for (var property in attrs.options) {
        if (attrs.options.hasOwnProperty(property)) {
            var tmp = attrs.options[property];
            self.addOption( tmp.name, property );
        }
    }

    if(this.init) {
        this.init();
    }
    
}
Select.prototype = Object.create(Element.prototype);
Select.prototype.setSelect = function( val ) {
    'use strict';
    this.select.value = val;
    this.select.onchange();
};
Select.prototype.handleSelect = function() {
    'use strict';
};
Select.prototype.addOption = function( key, value ) {
    'use strict';
    this.select.options.add( new Option( key, value ) );
};
/**
 * Toggle Element
 * @param {Object} attrs
 *  @label
 *  @handler
 *  @name
 *  @link
 *  @init
 */
function Toggle( attrs ) {
    'use strict';
    
    var self = this;
    
    this.init = attrs.init;
    
    this.element = document.createElement('div');
    this.element.classList.add('toggle_span');
    
    this.label = document.createElement('div');
    this.label.textContent = attrs.label;
    this.label.classList.add('toggle_label', 'left');
    
    this.button = document.createElement('div');
    this.button.classList.add('toggle_button', 'right', 'toggle_off');
    this.button.onclick = function() {
        self.handleToggle();
        if(attrs.handler) { attrs.handler.call(self); }
        if(attrs.link) { attrs.link.call(self); }
    };
    
    this.toggle = document.createElement('div');
    this.toggle.classList.add('toggle_toggle', 'toggle_toggle_left');
    this.toggle.dataset.value = 'false';
    this.toggle.dataset.name = attrs.name;
    
    this.text = document.createElement('div');
    this.text.classList.add('toggle_text');
    this.text.textContent = 'NO';
    
    this.button.appendChild(this.toggle);
    this.button.appendChild(this.text);
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.button);
    
    if(this.init) {
        this.init();
    }
}
Toggle.prototype = Object.create(Element.prototype);
Toggle.prototype.setToggle = function( on ) {
    'use strict';
    if(!on) {
        this.toggle.dataset.value = 'true';
    } else {
        this.toggle.dataset.value = 'false';
    }
    this.button.onclick();
};
Toggle.prototype.handleToggle = function() {
    'use strict';
    switch (this.toggle.dataset.value) {
        case 'true':
            this.toggleOff();
            break;
        case 'false':
            this.toggleOn();
            break;
        default:
            console.error("Error setting toggle.");
    }
};
Toggle.prototype.toggleOn = function() {
    'use strict';
    console.log('->toggleOn');
    // Move the toggle
    this.toggle.classList.add('toggle_toggle_right');
    this.toggle.classList.remove('toggle_toggle_left');
    // Change the color
    this.button.classList.add('toggle_on');
    this.button.classList.remove('toggle_off');
    // Change the text & set teh current state
    this.text.textContent = 'YES';
    this.toggle.dataset.value = 'true';
};
Toggle.prototype.toggleOff = function() {
    'use strict';
    console.log('->toggleOff');
    // Move the toggle
    this.toggle.classList.remove('toggle_toggle_right');
    this.toggle.classList.add('toggle_toggle_left');
    // Change the color
    this.button.classList.remove('toggle_on');
    this.button.classList.add('toggle_off');
    // Change the text & set teh current state
    this.text.textContent = 'NO';
    this.toggle.dataset.value = 'false';
};
/**
 * Modal Element
 * @param {Object} attrs
 *  @styleMod
 *  @heading
 *  @okayText
 *  @cancelText
 *  @closeCallback
 *  @resetCallback
 *  @okayCallback
 *  @cancelCallback
 */
function Modal( attrs ) {
    'use strict';
    
    var self = this;
    var styleMod = attrs.styleMod ? '-' + attrs.styleMod : '';
    
    this.element = document.createElement('div');
    this.element.classList.add('modal');
    
    this.content = document.createElement('div');
    this.content.classList.add('modal-content');
    
    this.header = document.createElement('div');
    this.header.classList.add('modal-header' + styleMod);
    
    this.close_button = document.createElement('span');
    this.close_button.classList.add('close');
    this.close_button.textContent = 'x';
    this.close_button.onclick = function() {
        self.handleClose();
        attrs.closeCallback.call(self);
    };
    
    this.reset_button = document.createElement('span');
    this.reset_button.classList.add('soft_reset');
    this.reset_button.innerHTML = '&#8634;';
    this.reset_button.onclick = function() {
        self.handleReset();
        attrs.resetCallback.call(self);
    };
    
    this.heading = document.createElement('h2');
    this.heading.textContent = attrs.heading;
    
    this.body = document.createElement('div');
    this.body.classList.add('modal-body');
    
    this.footer = document.createElement('div');
    this.footer.classList.add('modal-footer' + styleMod);
    
    this.footer_buttons = document.createElement('div');
    this.footer_buttons.classList.add('sidebyside');
    
    this.okay_button = document.createElement('div');
    this.okay_button.classList.add('user_yes' + styleMod, 'left', 'pop_out');
    this.okay_button.textContent = attrs.okayText;
    this.okay_button.onclick = function() {
        self.handleOkay();
        attrs.okayCallback.call(self);
    };
    
    this.cancel_button = document.createElement('div');
    this.cancel_button.classList.add('user_no' + styleMod, 'right', 'pop_out');
    this.cancel_button.textContent = attrs.cancelText;
    this.cancel_button.onclick = function() {
        self.handleCancel();
        attrs.cancelCallback.call(self);
    };
    
    this.header.appendChild(this.close_button);
    this.header.appendChild(this.reset_button);
    this.header.appendChild(this.heading);
    
    this.footer_buttons.appendChild(this.okay_button);
    this.footer_buttons.appendChild(this.cancel_button);
    this.footer.appendChild(this.footer_buttons);
    
    this.content.appendChild(this.header);
    this.content.appendChild(this.body);
    this.content.appendChild(this.footer);
    this.element.appendChild(this.content);
    this.element.style.display = 'none';
}
Modal.prototype = Object.create(Element.prototype);
Modal.prototype.handleClose = function() {
    'use strict';
    this.hide();
};
Modal.prototype.handleReset = function() {
    'use strict';
};
Modal.prototype.handleOkay = function() {
    'use strict';
    this.hide();
};
Modal.prototype.handleCancel = function() {
    'use strict';
    this.hide();
};
/**
 * Button Element
 * @param {Object} attrs
 *  @id
 *  @text
 *  @shadow
 *  @handler
 */
function Button( attrs ) {
    'use strict';
    
    var self = this;
    
    this.element= document.createElement('span');
    this.element.classList.add('nav', 'pop_out', 'nav_' + attrs.shadow);
    this.element.id = attrs.id;
    this.element.innerHTML = attrs.text;
    this.element.onclick = function() {
        self.handleButton();
        attrs.handler.call(self);
    };
    
}
Button.prototype = Object.create(Element.prototype);
Button.prototype.handleButton = function() {
    'use strict';
    console.log('->handleButton');
};
/**
 * Group Element
 * @param {Object} attrs
 *  @clsList
 */
function Group( attrs ) {
    'use strict';

    var self = this;
    
    attrs.clsList = attrs.clsList || [];
    
    this.element = document.createElement('div');
    attrs.clsList.forEach(function( cls ) {
        self.element.classList.add( cls);
    });
    
}
Group.prototype = Object.create(Element.prototype);
/**
 * Timer Element
 * @param {Object} attrs
 *  @increment
 *  @shadow
 */
function Timer( attrs ) {
    'use strict';

    this.timer = undefined;
    this.duration = 0;
    this.interval = attrs.interval || 100;
    
    this.element = document.createElement('div');
    this.element.textContent = '0:0:0';
    this.element.classList.add('timer', 'nav_' + attrs.shadow);
    
}
Timer.prototype = Object.create(Element.prototype);
Timer.prototype.getTime = function() {
    'use strict';
    return {
        duration    : this.duration,
        display     : this.element.textContent
    };
};
Timer.prototype.setTime = function( obj ) {
    'use strict';
    this.duration = obj.duration;
    this.element.textContent = obj.display;
};
Timer.prototype.increment = function() {
    'use strict';
    this.duration += this.interval;
    var secOverTen  =             ( this.duration / 100 )         % 10;
    var secs        = Math.floor  ( this.duration / 1000 )        % 60;
    var mins        = Math.floor( ( this.duration / 1000 ) / 60 ) % 60;
    this.element.textContent = mins + ":" + secs + ":" + secOverTen;
};
Timer.prototype.start = function() {
    'use strict';
    var _this = this;
    this.timer = setInterval(function() {
        _this.increment();
    }, _this.interval);
};
Timer.prototype.stop = function() {
    'use strict';
    clearInterval(this.timer);
    this.timer = null;
};
Timer.prototype.clear = function() {
    'use strict';
    this.duration = 0;
    this.element.textContent = '0:0:0';
};
Timer.prototype.toggleTimer = function() {
    'use strict';
    if(this.timer) {
        this.stop();
    } else {
        this.start();
    }
};
/**
 * Overlay Element
 * @params {Object} attrs
 *  @cls
 *  @applyCallback
 *  @removeCallback
 */
function Overlay( attrs ) {
    'use strict';

    this.applyCallback = attrs.applyCallback || function() {};
    this.removeCallback = attrs.removeCallback || function() {};
    
    this.element = document.createElement('div');
    this.element.classList.add(attrs.cls, 'stop_animation');
    this.element.style.display = 'none';
    
}
Overlay.prototype = Object.create(Element.prototype);
Overlay.prototype.apply = function() {
    'use strict';
    this.show();
    this.play();
    this.applyCallback();
};
Overlay.prototype.remove = function() {
    'use strict';
    this.hide();
    this.pause();
    this.removeCallback();
};
Overlay.prototype.toggleOverlay = function() {
    'use strict';
    var elem = this.element;
    if(elem.style.display === 'none') {
        this.apply();
    } else {
        this.remove();
    }
};
Overlay.prototype.play = function() {
    'use strict';
    this.element.classList.remove('stop_animation');
};
Overlay.prototype.pause = function() {
    'use strict';
    this.element.classList.add('stop_animation');
};
/**
 * Counter Element
 * @param {Object}
 *  @style
 */
function Counter( attrs ) {
    'use strict';

    this.element = document.createElement('div');
    this.element.classList.add('left', 'side_bar', attrs.style);
    this.element.textContent = 0;
    
}
Counter.prototype = Object.create(Element.prototype);
Counter.prototype.getCount = function() {
    'use strict';
    return this.element.textContent;
};
Counter.prototype.setCount = function( num ) {
    'use strict';
    this.element.textContent = num;
};
Counter.prototype.increment = function() {
    'use strict';
    var num = parseInt(this.element.textContent) + 1;
    this.element.textContent = num;
};
Counter.prototype.clear = function() {
    'use strict';
    this.element.textContent = 0;
};

/**
 * Loader Object
 * @param {Object} attrs
 *  @label
 *  @text
 *  @handler
 *  @link
 */
function Loader( attrs ) {
    'use strict';

    var self = this;
    
    this.onAfterLoad = attrs.handler || function() {
        console.log('Handle after load');
    };
    this.element = document.createElement('div');
    this.element.classList.add('toggle_span', 'blue_back');
    
    this.label = document.createElement('div');
    this.label.textContent = attrs.label;
    this.label.classList.add('toggle_label', 'left');
    
    this.input_label = document.createElement('label');
    this.input_label.classList.add('deck_input_button');
    this.input_label.htmlFor = 'deck_input';
    this.input_label.textContent = attrs.text;
    
    this.input_button = document.createElement('input');
    this.input_button.classList.add('deck_input');
    this.input_button.type = 'file';
    this.input_button.id = 'deck_input';
    this.input_button.onchange = function() {
        self.handleLoader( this.files );
        if(attrs.link) { attrs.link.call(self); }
    };
    
    this.loaded_text = document.createElement('span');
    this.loaded_text.classList.add('loaded_deck');
    
    this.element.appendChild(this.label);
    this.element.appendChild(this.input_label);
    this.element.appendChild(this.input_button);
    this.element.appendChild(this.loaded_text);
    
}
Loader.prototype = Object.create(Element.prototype);
Loader.prototype.setLoadedText = function( name ) {
    'use strict';
    this.loaded_text.textContent = name || '';
};
Loader.prototype.handleLoader = function( files ) {
    'use strict';
    console.log('->handleLoader');
    var _this = this;
    var reader = new FileReader();
    reader.onload = function(e) {
        _this.afterLoadHandler( reader.result );
    };
    reader.readAsText(files[0], 'UTF-8');
    this.setLoadedText( files[0].name );
};
Loader.prototype.afterLoadHandler = function( result ) {
    'use strict';
    this.onAfterLoad( result );
};
/**
 * Indicator Element
 * @param {Object} attrs
 *  @clsList
 *  @imgUrl
 */
function Indicator( attrs ) {
    'use strict';
    
    var self = this;
    
    attrs.clsList = attrs.clsList || [];
    
    this.element = document.createElement('div');
    attrs.clsList.forEach(function( cls ) {
        self.element.classList.add( cls);
    });
    
    this.image = document.createElement('img');
    this.image.src = attrs.imgUrl;
    
    this.element.appendChild( this.image );
    
}
Indicator.prototype = Object.create(Element.prototype);
/**
 * Progress Bar Element
 */
function ProgressBar( attrs ) {
    'use strict';
  
    this.maxVal = undefined;
    this.currentVal = undefined;
    
    this.element = document.createElement('div');
    this.element.classList.add('progress_bar');
    
    this.status_bar = document.createElement('div');
    this.status_bar.classList.add('status_bar');
    
    this.element.appendChild( this.status_bar );
    
}
ProgressBar.prototype = Object.create(Element.prototype);
ProgressBar.prototype.setMaxVal = function( val ) {
    'use strict';
    this.maxVal = val;
};
ProgressBar.prototype.setCurrentVal = function( val ) {
    'use strict';
    this.currentVal = val;
};
ProgressBar.prototype.setCalculatedWidth = function() {
    'use strict';
    this.status_bar.style.width = ((this.currentVal / this.maxVal) * 500) + 'px';
};
ProgressBar.prototype.clear = function() {
    'use strict';
    this.currentVal = 0;
    this.setCalculatedWidth();
};
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
/**
 * Event Manager Object
 * @param {Object} attrs
 *  @windowLeftHandler
 *  @windowUpHandler
 *  @windowRightHandler
 *  @responseReturnHandler
 *  @responseLeftHandler
 *  @responseRightHandler
 *  @windowSpaceHandler
 *  @stateChangeHandler
 *  @typeChangeHandler
 *  @persistStateLoadHandler
 *  @persistStateUnloadHandler
 */
function EventManager( attrs ) {
    'use strict';

    this.windowKeyHandler = function( event ) {
        console.log('->windowKeyHandler');
        switch (event.keyCode) {
            case 37: // (LEFT ARROW)
                attrs.windowLeftHandler.call(this);
                break;
            case 38: // (UP ARROW)
                attrs.windowUpHandler.call(this);
                break;
            case 39: // (RIGHT ARROW)
                attrs.windowRightHandler.call(this);
                break;
            default:
                break;
        }
    };
    this.responseKeyHandler = function( event ) {
        console.log('->responseKeyHandler');
        switch (event.keyCode) {
            case 13: // (ENTER)
                attrs.responseReturnHandler.call(this);
                break;
            case 37: // (LEFT ARROW)
                attrs.responseLeftHandler.call(this);
                break;
            case 39: // (RIGHT ARROW)
                attrs.responseRightHandler.call(this);
                break;
            default:
                break;
        }
    };
    this.windowPauseHandler = function( event ) {
        console.log('->windowPauseHandler');
        switch (event.keyCode) {
            case 32: // (SPACE)
                attrs.windowSpaceHandler.call(this);
                break;
            default:
                break;
        }
    };
    this.persistStateLoadHandler = function( event ) {
        attrs.persistStateLoadHandler.call(this);
    };
    this.persistStateUnloadHandler = function( event ) {
        attrs.persistStateUnloadHandler.call(this);
    };
    this.stateChangeHandler = function( event ) {
        attrs.stateChangeHandler.call(this);
    };
    this.typeChangeHandler = function( event ) {
        attrs.typeChangeHandler.call(this);
    };
    
    this.windowKeyExists = false;
    this.responseKeyexists = false;
    this.windowPauseExists = false;
    this.persistStateExists = false;
    
}
EventManager.prototype.addWindowKeyListeners = function() {
    'use strict';
    document.addEventListener("keyup", this.windowKeyHandler);
    this.windowKeyExists = true;
};
EventManager.prototype.addResponseKeyListeners = function() {
    'use strict';
    document.addEventListener("keyup", this.responseKeyHandler);
    this.responseKeyexists = true;
};
EventManager.prototype.addWindowPauseListener = function() {
    'use strict';
    document.addEventListener("keyup", this.windowPauseHandler);
    this.windowPauseExists = true;
};
EventManager.prototype.addPersistStateListener = function() {
    'use strict';
    window.addEventListener("load", this.persistStateLoadHandler);
    window.addEventListener("unload", this.persistStateUnloadHandler);
    this.persistStateExists = true;
};
EventManager.prototype.addStateChangeListener = function() {
    'use strict';
    document.addEventListener("stateChange", this.stateChangeHandler);
};
EventManager.prototype.addTypeChangeListener = function() {
    'use strict';
    document.addEventListener("typeChange", this.typeChangeHandler);
};

EventManager.prototype.removeWindowKeyListeners = function() {
    'use strict';
    document.removeEventListener("keyup", this.windowKeyHandler);
    this.windowKeyExists = false;
};
EventManager.prototype.removeResponseKeyListeners = function() {
    'use strict';
    document.removeEventListener("keyup", this.responseKeyHandler);
    this.responseKeyexists = false;
};
EventManager.prototype.removeWindowPauseListener = function() {
    'use strict';
    document.removeEventListener("keyup", this.windowPauseHandler);
    this.windowPauseExists = false;
};
EventManager.prototype.removePersistStateListener = function() {
    'use strict';
    window.removeEventListener("load", this.persistStateLoadHandler);
    window.removeEventListener("unload", this.persistStateUnloadHandler);
    delete localStorage.flashDeck;
    this.persistStateExists = false;
};
EventManager.prototype.removeStateChangeListener = function() {
    'use strict';
    document.removeEventListener("stateChange", this.stateChangeHandler);
};
EventManager.prototype.removeTypeChangeListener = function() {
    'use strict';
    document.removeEventListener("typeChange", this.typeChangeHandler);
};
/**
 * Config Object
 * @param {Object} userState
 */
function Config( userState ) {
    'use strict';
    
    var self = this;
    
    this.cycleEnum = {
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
    this.stateEnum = {
        FIRSTLOAD: {
            name: 'First Load',
            value: 'firstLoad'
        },
        INITIAL: {
            name: 'Initial',
            value: 'initial'
        },
        QUIZZING: {
            name: 'Quizzing',
            value: 'quizzing'
        },
        FINISHED: {
            name: 'Finished',
            value: 'finished'
        }
    };
    this.quizEnum = {
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
    this.limitEnum = {
        THREE   : {
            name: 'THREE',
            value: 3
        },
        FIVE    : {
            name: 'FIVE',
            value: 5
        },
        TEN     : {
            name: 'TEN',
            value: 10
        },
        TWENTY  : {
            name: 'TWENTY',
            value: 20
        },
        ALL     : {
            name: 'ALL',
            value: Number.MAX_VALUE
        }
    };
    this.masteryEnum = {
        STANDARD: {
            name: 'STANDARD',
            value: 'standard'
        },
        SEQUENTIAL: {
            name: 'SEQUENTIAL',
            value: 'sequential'
        }
    };
    
    this.appState              = undefined;
    this.cycle                 = undefined;
    this.deckLimit             = undefined;
    this.endMessageFront       = 'Congratulations!';
    this.endMessageBack        = 'You did it!';
    this.flashDuration         = 750;
    this.flipDuration          = 2000;
    this.flipOnHover           = undefined;
    this.masteryType           = undefined;
    this.masteryLevel          = 3;
    this.persistState          = undefined;
    this.quizType              = undefined;
    this.showReponseCount      = undefined;
    this.showReponseIndicators = undefined;
    this.showTimer             = undefined;
    this.showProgress          = undefined;
    this.version               = '1.1.0';
    
    this.default = {
        appState                : self.stateEnum.FIRSTLOAD,
        cycle                   : self.cycleEnum.FORWARD,   
        quizType                : self.quizEnum.REVIEW,
        deckLimit               : self.limitEnum.ALL,
        masteryType             : self.masteryEnum.STANDARD,
        flipOnHover             : false,
        persistState            : false,
        showReponseCount        : true,
        showReponseIndicators   : true,
        showTimer               : true,
        showProgress            : true
    };
    this.state = userState || this.default;
    
    this.applyState(this.state);
    
}
Config.prototype.setConfig = function( key, value ) {
    'use strict';
    this[key] = value;
};
Config.prototype.saveState = function() {
    'use strict';
    for(var setting in this.state) {
        if(this.state.hasOwnProperty(setting)) {
            this.state[setting] = this[setting];
        }
    }
};
Config.prototype.getState = function() {
    'use strict';
    return this.state;
};
Config.prototype.applyState = function( state ) {
    'use strict';
    for(var setting in state) {
        if(state.hasOwnProperty(setting)) {
            this.setConfig( setting, state[setting] );
        }
    }
};
// Application Control
function emptyHandler() {}
function initSettings() {
    'use strict';
    
    config_settings.forEach(function(setting) {
        setting.init();
    });
}

var stateChangeEvent = new CustomEvent("stateChange", {});
var typeChangeEvent = new CustomEvent("typeChange", {});
var stateCallbacks = {};
var typeCallbacks = {};

function stateChangeHandler() {
    'use strict';
    setStateCallbacks();
}
function typeChangeHandler() {
    'use strict';
    setTypeCallbacks();
}
function changeAppState( state ) {
    'use strict';
    config.appState = state;
    document.dispatchEvent( stateChangeEvent );
}
/*exported changeAppType */
function changeAppType( type ) {
    'use strict';
    config.quizType = type;
    document.dispatchEvent( typeChangeEvent );
}

var firstLoadStateCallbacks = {
    onResetPress            : emptyHandler,
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
    },
    configOkayCallback      : function() {
        'use strict';
        config.saveState();
    },
    configCancelCallback    : function() {
        'use strict';
        config.applyState( config.state );
        initSettings();
    },
    configResetCallback     : emptyHandler,
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : function() {
        'use strict';
        quiz.flipCard();
    },
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var initStateCallbacks = {
    onResetPress            : emptyHandler,
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
    },
    configOkayCallback      : function() {
        'use strict';
        timer.start();
        changeAppState( config.stateEnum.QUIZZING );
        config.saveState();
    },
    configCancelCallback    : function() {
        'use strict';
        changeAppState( config.stateEnum.FIRSTLOAD );
        deck_loader.setLoadedText();
        quiz.clear();
        config.applyState( config.state );
        initSettings();
    },
    configResetCallback     : function() {
        'use strict';
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
        progress_bar.clear();
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
    },
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : function() {
        'use strict';
        quiz.flipCard();
    },
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var quizzingStateCallbacks = {
    onResetPress            : emptyHandler,
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
        timer.toggleTimer();
        eventManager.removeWindowKeyListeners();
    },
    configOkayCallback      : function() {
        'use strict';
        timer.toggleTimer();
        eventManager.addWindowKeyListeners();
        config.saveState();
    },
    configCancelCallback    : function() {
        'use strict';
        timer.toggleTimer();
        eventManager.addWindowKeyListeners();
        config.applyState( config.state );
        initSettings();
    },
    configResetCallback     : function() {
        'use strict';
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
        timer.clear();
        progress_bar.clear();
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
        quiz.setCard( quiz.deck.cards[0] );
    },
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : function() {
        'use strict';
        timer.clear();
        quiz.cycleBackward();
    },
    onNavFlipPress          : function() {
        'use strict';
        eventManager.removeWindowKeyListeners();
        eventManager.addResponseKeyListeners();
        response_modal.show();
        timer.toggleTimer();
        quiz.flipCard();
    },
    onNavRightPress         : function() {
        'use strict';
        timer.clear();
        quiz.cycleForward();
    },
    onResponseReturnPress   : this.onResponseLeftPress,
    onResponseLeftPress     : function() {
        'use strict';
        success_indicator.element.classList.add("flash");
        setTimeout(function() {
            success_indicator.element.classList.remove("flash");
        }, config.flashDuration);
        quiz.flipCard();
        quiz.handleResponse( true, timer.duration );
        eventManager.addWindowKeyListeners();
        eventManager.removeResponseKeyListeners();
        response_modal.hide();
        timer.clear();
        timer.toggleTimer();
    },
    onResponseRightPress    : function() {
        'use strict';
        failure_indicator.element.classList.add("flash");
        setTimeout(function() {
            failure_indicator.element.classList.remove("flash");
        }, config.flashDuration);
        quiz.flipCard();
        quiz.handleResponse( false, timer.duration );
        eventManager.addWindowKeyListeners();
        eventManager.removeResponseKeyListeners();
        response_modal.hide();
        timer.clear();
        timer.toggleTimer();
    },
    onSpacePress            : function() {
        'use strict';
        pause_overlay.toggleOverlay();
        timer.toggleTimer();
        if(eventManager.windowKeyExists) {
            eventManager.removeWindowKeyListeners();
        } else {
            eventManager.addWindowKeyListeners();
        }
    }
};
var finishedStateCallbacks = {
    onResetPress            : function() {
        'use strict';
        changeAppState( config.stateEnum.QUIZZING );
        quiz.deck.removeCard( 0 );
        quiz.flipCard();
        firework_overlay.remove();
        quiz.deck.reset();
        correct.clear();
        incorrect.clear();
        timer.clear();
        progress_bar.clear();
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
        quiz.setCard( quiz.deck.cards[0] );
        timer.start();
        reset_button.invisible();
    },
    onConfigPress           : function() {
        'use strict';
        config_modal.toggle();
    },
    configOkayCallback      : emptyHandler,
    configCancelCallback    : emptyHandler,
    configResetCallback     : emptyHandler,
    configCloseCallback     : this.configCancelCallback,
    onNavLeftPress          : emptyHandler,
    onNavFlipPress          : emptyHandler,
    onNavRightPress         : emptyHandler,
    onResponseReturnPress   : emptyHandler,
    onResponseLeftPress     : emptyHandler,
    onResponseRightPress    : emptyHandler,
    onSpacePress            : emptyHandler
};
var testTypeCallbacks = {};
var standardTypecallbacks = {};
var reviewTypeCallbacks = {};

function setStateCallbacks() {
    'use strict';
    switch(config.appState.value) {
        case 'firstLoad':
            stateCallbacks = firstLoadStateCallbacks;
            break;
        case 'initial':
            stateCallbacks = initStateCallbacks;
            break;
        case 'quizzing':
            stateCallbacks = quizzingStateCallbacks;
            break;
        case 'finished':
            stateCallbacks = finishedStateCallbacks;
            break;
        default:
            break;
    }
}
function setTypeCallbacks() {
    'use strict';
    switch(config.quizType.value) {
        case 'test':
            typeCallbacks = testTypeCallbacks;
            break;
        case 'standard':
            typeCallbacks = standardTypecallbacks;
            break;
        case 'review':
            typeCallbacks = reviewTypeCallbacks;
            break;
        default:
            break;
    }
}

// Event Handlers
function windowLeftHandler() {
    'use strict';
    stateCallbacks.onNavLeftPress();
}
function windowUpHandler() {
    'use strict';
    stateCallbacks.onNavFlipPress();
}
function windowRightHandler() {
    'use strict';
    stateCallbacks.onNavRightPress();
}
function responseReturnHandler() {
    'use strict';
    stateCallbacks.onResponseReturnPress();
}
function responseLeftHandler() {
    'use strict';
    stateCallbacks.onResponseLeftPress();
}
function responseRightHandler() {
    'use strict';
    stateCallbacks.onResponseRightPress();
}
function windowSpaceHandler() {
    'use strict';
    stateCallbacks.onSpacePress();
}
function persistStateLoadHandler() {
    'use strict';
    console.log('Persist state loaded.');
    var data = JSON.parse(localStorage.flashDeck);
    for(var index in data.quiz.cards) {
        if(data.quiz.cards.hasOwnProperty(index)) {
            quiz.deck.addCard( new Card( data.quiz.cards[index] ) );
        }
    }
    for(index in data.quiz.mastered) {
        if(data.quiz.mastered.hasOwnProperty(index)) {
            var lastIndex = quiz.deck.numCards();
            quiz.deck.addCard( new Card( data.quiz.mastered[index] ) );
            quiz.deck.addToMastered( lastIndex );
        }
    }
    quiz.setCard( quiz.deck.getCard( data.quiz.currentIndex ) );
    quiz.setCycleMethod(config.cycle);
    quiz.setDeckLimit(config.deckLimit);
    quiz.setMasteryType(config.masteryType);
    correct.setCount( data.correct );
    incorrect.setCount( data.incorrect );
    timer.setTime( data.timer );
    progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
    progress_bar.setCurrentVal( quiz.deck.numMastered() );
    progress_bar.setCalculatedWidth();
    changeAppState( config.appState );
    timer.start();
    stateCallbacks.onSpacePress();
}
function persistStateUnloadHandler() {
    'use strict';
    var json = {
        'state'     : config.getState(),
        'timesatamp': new Date().getTime(),
        'quiz'      : {
            cards           : Object.assign({}, quiz.deck.cards),
            mastered        : Object.assign({}, quiz.deck.mastered),
            currentIndex    : quiz.getCurrentIndex()
        },
        correct     : correct.getCount(),
        incorrect   : incorrect.getCount(),
        timer       : timer.getTime()
    };
    localStorage.flashDeck = JSON.stringify(json);
}

// Modal Handlers
function responseOkayCallback() {
    'use strict';
    stateCallbacks.onResponseLeftPress();
}
function responseCancelCallback() {
    'use strict';
    stateCallbacks.onResponseRightPress();
}
function configCloseCallback() {
    'use strict';
    stateCallbacks.configCloseCallback();
}
function configResetCallback() {
    'use strict';
    stateCallbacks.configResetCallback();
}
function configOkayCallback() {
    'use strict';
    stateCallbacks.configOkayCallback();
}
function configCancelCallback() {
    'use strict';
    stateCallbacks.configCancelCallback();
}

// Button Handlers
function onNavLeftPress() {
    'use strict';
    stateCallbacks.onNavLeftPress();
}
function onNavFlipPress() {
    'use strict';
    stateCallbacks.onNavFlipPress();
}
function onNavRightPress() {
    'use strict';
    stateCallbacks.onNavRightPress();
}
function onConfigPress() {
    'use strict';
    stateCallbacks.onConfigPress();
}
function onResetPress() {
    'use strict';
    stateCallbacks.onResetPress();
}

// Select Handlers
function selectInit() {
    'use strict';
    /*jshint validthis: true */
    var method = config[this.select.dataset.name];
    this.setSelect( method.name );
}
function handleSelectCycle() {
    'use strict';
    /*jshint validthis: true */
    config[this.select.dataset.name] = config.cycleEnum[this.select.value];
}
function handleCycleChange() {
    'use strict';
    /*jshint validthis: true */
    quiz.setCycleMethod(config.cycleEnum[this.select.value]);
}
function handleSelectLimit() {
    'use strict';
    /*jshint validthis: true */
    config[this.select.dataset.name] = config.limitEnum[this.select.value];
}
function handleLimitChange() {
    'use strict';
    /*jshint validthis: true */
    quiz.setDeckLimit(config.limitEnum[this.select.value]);
}
function handleSelectMastery() {
    'use strict';
    /*jshint validthis: true */
    config[this.select.dataset.name] = config.masteryEnum[this.select.value];
}
function handleMasteryChange() {
    'use strict';
    /*jshint validthis: true */
    quiz.setMasteryType(config.masteryEnum[this.select.value]);
}

// Toggle Handlers
function toggleInit() {
    'use strict';
    /*jshint validthis: true */
    var on = config[this.toggle.dataset.name];
    this.setToggle(on);
}
function handleToggle() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    config[this.toggle.dataset.name] = (val === 'true') ? true : false;
}
function handleResponseCountVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        correct.visible();
        incorrect.visible();
    } else {
        correct.invisible();
        incorrect.invisible();
    }
}
function handleResponseIndicatorVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        success_indicator.visible();
        failure_indicator.visible();
    } else {
        success_indicator.invisible();
        failure_indicator.invisible();
    }
}
function handleTimerVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        timer.visible();
    } else {
        timer.invisible();
    }
}
function handlePersistStateToggle() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        eventManager.addPersistStateListener();
    } else {
        eventManager.removePersistStateListener();
    }
}
function handleProgressVisibility() {
    'use strict';
    /*jshint validthis: true */
    var val = this.toggle.dataset.value;
    if(val === 'true') {
        progress_bar.visible();
    } else {
        progress_bar.invisible();
    }
}

// Overlay Handlers
function pauseApplyCallback() {
    'use strict';

}
function pauseRemoveCallback() {
    'use strict';

}
function fireworkApplyCallback() {
    'use strict';

}
function fireworkRemoveCallback() {
    'use strict';
    
}

// Loader Handler
function handleLoadDeck( result ) {
    'use strict';
    var deck = new Deck();
    var cards = result.split('\n');
    cards.forEach( function( card ) {
        var _card = card.split('[]');
        deck.addCard( new Card(_card[0], _card[1]));
    });
    quiz.setDeck( deck );
    quiz.setCycleMethod(config.cycle);
    quiz.setDeckLimit(config.deckLimit);
    quiz.setMasteryType(config.masteryType);
    changeAppState( config.stateEnum.INITIAL );
}

// Quiz Handlers
function cycleCallback() {
    'use strict';
    if(quiz.isFinished()) {
        quiz.deck.cards.push( new Card(config.endMessageFront, config.endMessageBack) );
        changeAppState( config.stateEnum.FINISHED );
        firework_overlay.apply();
        timer.toggleTimer();
        timer.clear();
        setTimeout(function() {
            quiz.flipCard();
            reset_button.visible();
        }, 2000);
    }
}
function flipCallback() {
    'use strict';
    
}
function responseCallback( known, time ) {
    'use strict';
    /*jshint validthis: true */
    if(known) {
        correct.increment();
    } else {
        incorrect.increment();
    }
    var index = this.getCurrentIndex();
    var card = this.deck.cards[ index ];
    card.handleResponse( known );
    card.calculateAverageAnswerTime( time );
    if(card.isMastered()) {
        this.deck.addToMastered( index );
        progress_bar.setMaxVal(quiz.deck.numCards() + quiz.deck.numMastered() );
        progress_bar.setCurrentVal( quiz.deck.numMastered() );
        progress_bar.setCalculatedWidth();
    }
    this.cycleCard();
}
function resetCallback() {
    'use strict';
    correct.clear();
    incorrect.clear();
}
/* ********** ********** ********** ********** **********
 * Register Elements with ElementFactory
 */
ElementFactory.registerElement('toggle', Toggle);
ElementFactory.registerElement('select', Select);
ElementFactory.registerElement('modal', Modal);
ElementFactory.registerElement('button', Button);
ElementFactory.registerElement('group', Group);
ElementFactory.registerElement('indicator', Indicator);
ElementFactory.registerElement('timer', Timer);
ElementFactory.registerElement('overlay', Overlay);
ElementFactory.registerElement('counter', Counter);
ElementFactory.registerElement('loader', Loader);
ElementFactory.registerElement('progress', ProgressBar);
ElementFactory.registerElement('quiz', Quiz);
/* ********** ********** ********** ********** **********
 * Configuration
 */
var config = (localStorage.flashDeck) ?
    new Config(JSON.parse(localStorage.flashDeck).state) :
    new Config();
/* ********** ********** ********** ********** **********
 * Quiz
 */
var quiz = ElementFactory.createElement('quiz', {
    cycleCallback       : cycleCallback,
    flipCallback        : flipCallback,
    responseCallback    : responseCallback,
    resetCallback       : resetCallback
});
/* ********** ********** ********** ********** **********
 * Events
 */
var eventManager = new EventManager({
    windowLeftHandler           : windowLeftHandler,
    windowUpHandler             : windowUpHandler,
    windowRightHandler          : windowRightHandler,
    responseReturnHandler       : responseReturnHandler,
    responseLeftHandler         : responseLeftHandler,
    responseRightHandler        : responseRightHandler,
    windowSpaceHandler          : windowSpaceHandler,
    stateChangeHandler          : stateChangeHandler,
    typeChangeHandler           : typeChangeHandler,
    persistStateLoadHandler     : persistStateLoadHandler,
    persistStateUnloadHandler   : persistStateUnloadHandler
});
/* ********** ********** ********** ********** **********
 * Modals
 */
var response_modal = ElementFactory.createElement('modal', {
    styleMod    : '2',
    heading     : 'Did you know this one?',
    okayText    : 'YES',
    cancelText  : 'NO',
    okayCallback    : responseOkayCallback,
    cancelCallback  : responseCancelCallback
});
var config_modal = ElementFactory.createElement('modal',{
    styleMod    : '1',
    heading     : 'Settings',
    okayText    : 'APPLY',
    cancelText  : 'CANCEL',
    closeCallback   : configCloseCallback,
    resetCallback   : configResetCallback,
    okayCallback    : configOkayCallback,
    cancelCallback  : configCancelCallback
});
/* ********** ********** ********** ********** **********
 * Buttons
 */
var config_button = ElementFactory.createElement('button', {
    id          : 'config_button',
    text        : '',
    shadow      : 'left',
    handler     : onConfigPress
});
var reset_button = ElementFactory.createElement('button', {
    id          : 'reset_button',
    text        : '&#8634;',
    shadow      : 'left',
    handler     : onResetPress
});
var nav_left = ElementFactory.createElement('button', {
    id          : 'nav_left',
    text        : '&larr;',
    shadow      : 'left',
    handler     : onNavLeftPress
});
var nav_flip = ElementFactory.createElement('button', {
    id          : 'nav_flip',
    text        : '&#8631;',
    shadow      : 'center',
    handler     : onNavFlipPress
});
var nav_right = ElementFactory.createElement('button', {
    id          : 'nav_right',
    text        : '&rarr;',
    shadow      : 'right',
    handler     : onNavRightPress
});
/* ********** ********** ********** ********** **********
 * Groups
 */
var nav_control = ElementFactory.createElement('group', {
    clsList  : [
        'sidebyside'
    ]
});
var footer = ElementFactory.createElement('group', {
    clsList  : [
        'footer'
    ]
});
/* ********** ********** ********** ********** **********
 * Indicators
 */
var success_indicator = ElementFactory.createElement('indicator', {
    clsList : [
        'success'
    ],
    imgUrl  : '../images/check.png'
});
var failure_indicator = ElementFactory.createElement('indicator', {
    clsList : [
        'failure'
    ],
    imgUrl  : '../images/exx.png'
});
/* ********** ********** ********** ********** **********
 * Timers
 */
var timer = ElementFactory.createElement('timer', {
    shadow  : 'left'
});
/* ********** ********** ********** ********** **********
 * Counters
 */
var correct = ElementFactory.createElement('counter', {
    style   : 'correct'
});
var incorrect = ElementFactory.createElement('counter', {
    style   : 'incorrect'
});
/* ********** ********** ********** ********** **********
 * Overlays
 */
var pause_overlay = ElementFactory.createElement('overlay', {
    cls : 'pause',
    applyCallback   : pauseApplyCallback,
    removeCallback  : pauseRemoveCallback
});
var firework_overlay = ElementFactory.createElement('overlay', {
    cls : 'pyro',
    applyCallback   : fireworkApplyCallback,
    removeCallback  : fireworkRemoveCallback
});
/* ********** ********** ********** ********** **********
 * Progress Bar
 */
var progress_bar = ElementFactory.createElement('progress', {});
/* ********** ********** ********** ********** **********
 * Loaders
 */
var deck_loader = ElementFactory.createElement('loader', {
    label   : 'Import Deck',
    text    : 'Choose a source',
    handler : handleLoadDeck,
    link    : emptyHandler
});
/* ********** ********** ********** ********** **********
 * Selects
 */
var select_cycle = ElementFactory.createElement('select', {
    init    : selectInit,
    label   : 'Cycle Method',
    handler : handleSelectCycle,
    name    : 'cycle',
    options : config.cycleEnum,
    link    : handleCycleChange
});
var select_limit = ElementFactory.createElement('select', {
    init    : selectInit,
    label   : 'Deck Limit',
    handler : handleSelectLimit,
    name    : 'deckLimit',
    options : config.limitEnum,
    link    : handleLimitChange
});
var select_mastery = ElementFactory.createElement('select', {
    init    : selectInit,
    label   : 'Card Mastery',
    handler : handleSelectMastery,
    name    : 'masteryType',
    options : config.masteryEnum,
    link    : handleMasteryChange
});
/* ********** ********** ********** ********** **********
 * Toggles
 */
var toggle_persist = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Save Progress',
    handler : handleToggle,
    name    : 'persistState',
    link    : handlePersistStateToggle
});
var toggle_counts = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Show Response Count',
    handler : handleToggle,
    name    : 'showReponseCount',
    link    : handleResponseCountVisibility
});
var toggle_indicators = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Show Response Indicators',
    handler : handleToggle,
    name    : 'showReponseIndicators',
    link    : handleResponseIndicatorVisibility
});
var toggle_timer = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Show Timer',
    handler : handleToggle,
    name    : 'showTimer',
    link    : handleTimerVisibility
});
var toggle_progress = ElementFactory.createElement('toggle', {
    init    : toggleInit,
    label   : 'Show Progress Bar',
    handler : handleToggle,
    name    : 'showTimer',
    link    : handleProgressVisibility
});
/* ********** ********** ********** ********** **********
 * Hash the config Settings
 */
var config_settings = [];
config_settings.push(select_cycle);
config_settings.push(select_limit);
config_settings.push(select_mastery);
config_settings.push(toggle_persist);
config_settings.push(toggle_counts);
config_settings.push(toggle_indicators);
config_settings.push(toggle_timer);
config_settings.push(toggle_progress);
/* ********** ********** ********** ********** **********
 * Build UI
 */
config_modal.body.appendChild(select_cycle.element);
config_modal.body.appendChild(select_limit.element);
config_modal.body.appendChild(select_mastery.element);
config_modal.body.appendChild(toggle_persist.element);
config_modal.body.appendChild(toggle_counts.element);
config_modal.body.appendChild(toggle_indicators.element);
config_modal.body.appendChild(toggle_timer.element);
config_modal.body.appendChild(toggle_progress.element);
config_modal.body.appendChild(deck_loader.element);

nav_control.element.appendChild(config_button.element);
nav_control.element.appendChild(reset_button.element);
nav_control.element.appendChild(nav_left.element);
nav_control.element.appendChild(nav_flip.element);
nav_control.element.appendChild(nav_right.element);

quiz.element.insertBefore(correct.element, quiz.card_container);
quiz.element.appendChild(incorrect.element);

footer.element.appendChild(success_indicator.element);
footer.element.appendChild(failure_indicator.element);

FlashDeckMain.appendChild(pause_overlay.element);
FlashDeckMain.appendChild(firework_overlay.element);
FlashDeckMain.appendChild(timer.element);
FlashDeckMain.appendChild(config_modal.element);
FlashDeckMain.appendChild(response_modal.element);
FlashDeckMain.appendChild(quiz.element);
FlashDeckMain.appendChild(progress_bar.element);
FlashDeckMain.appendChild(nav_control.element);
FlashDeckMain.appendChild(footer.element);

/* ********** ********** ********** ********** **********
* Initialize
*/
eventManager.addWindowKeyListeners();
eventManager.addWindowPauseListener();
eventManager.addStateChangeListener();
eventManager.addTypeChangeListener();
setStateCallbacks( config.appState );
setTypeCallbacks( config.quizType );
response_modal.hide('reset_button');
response_modal.hide('close_button');