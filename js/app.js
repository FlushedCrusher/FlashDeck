// Handle language selection change
function updateCountry( selection ) {
    var select = selection || _language.getSelected();
    _language.setSelection( select );
    _dialect.removeOptions();
    _dialect.addOptions( langs[select], 2 );
    _dialect.styleVisibility( langs[select][1].length );
    _dialect.setSelection( select );
};

// Trigger the animation for responses
function handleResponse(element) {
    element.classList.add("flash");
    current_card.classList.add("grayout");
    addCount(element.dataset.countId);
    setTimeout(function() {
        element.classList.remove("flash");
        cycleCard();
    }, 750)
}

// Add to the response type count
function addCount(elementId) {
    var el = document.getElementById(elementId);
    var num = parseInt(el.innerHTML);
    num += 1;
    el.innerHTML = num;
}

// Reset the response counts
function reset() {
    correct.innerHTML = 0;
    in_correct.innerHTML = 0;
    init();
}

// Cycle the current card
function cycleCard() {
    var index = parseInt(current_card.dataset.index);
    index = (index + 1) % myDeck.numCards();
    current_card.dataset.index = index;
    current_card.innerHTML = myDeck.cards[index].phrase;
    current_card.classList.remove("grayout");
}

// Reference to language selection elements <select>
var select_language = document.getElementById('select_language');
var select_dialect  = document.getElementById('select_dialect');
var start_button    = document.getElementById('start_button');

// Create selection objects
var _language = new Selection(select_language);
var _dialect = new Selection(select_dialect);

// Add language options
_language.addOptions( langs, 1 );

// Assign the default language
updateCountry(6);

function init() {
    current_card.dataset.index = 0;
    current_card.innerHTML = myDeck.cards[0].phrase;
}