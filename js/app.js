// Trigger the animation for responses
function handleResponse( element ) {
    element.classList.add("flash");
    current_card.classList.add("grayout");
    addCount(element.dataset.countId);
    setTimeout(function() {
        element.classList.remove("flash");
        cycleCardForward();
    }, config.flashDuration)
}

// Add to the response type count
function addCount( elementId ) {
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

// Cycle the current card forward
function cycleCardForward() {
    var index = parseInt(current_card.dataset.index);
    index = (index + 1) % myDeck.numCards();
    current_card.dataset.index = index;
    if(!isNaN( index ))  {
        front.innerHTML = myDeck.cards[index].phrase;
        back.innerHTML = myDeck.cards[index].definition;
    } else {
        // Deck mastered!
        if(!myDeck.isMastered()) {
            alert('ERROR', 'Deck should be mastered but for some reason is not.');
        } else {
           handleMastered();
        }
    }
    current_card.classList.remove("grayout");
}

// Handle Mastered Deck
function handleMastered() {
    front.innerHTML = 'Congratulations!';
    back.innerHTML = 'You did it!';
    config.quizFinished = true;
    fireworks.style.visibility = 'visible';
    full_window.style.visibility = 'visible';
    full_window.style.backgroundColor = "#ffffff";
    setTimeout(flipCard, 1500);
}

// Cycle the current card forward
function cycleCardBackward() {
    var index = parseInt(current_card.dataset.index);
    if(index === 0) { index = myDeck.numCards(); }
    index = (index - 1) % myDeck.numCards();
    current_card.dataset.index = index;
    front.innerHTML = myDeck.cards[index].phrase;
    back.innerHTML = myDeck.cards[index].definition;
    current_card.classList.remove("grayout");
}

// Card hover events
current_card.addEventListener('mouseover', function() {
    if(config.flipOnHover) { current_card.classList.add('flipped'); }
});
current_card.addEventListener('mouseout', function() {
    if(config.flipOnHover) { current_card.classList.remove('flipped'); }
});

// Trigger a card flip
function flipCard() {
    if(config.quizFinished) {
        current_card.classList.toggle('flipped');
        return;
    }
    switch (config.quizType) {
        case 'test':
            current_card.classList.add('flipped');
            setTimeout(function() {
                current_card.classList.remove('flipped');
            }, 1000 + config.flipDuration);
            break;
        case 'userInput':
            current_card.classList.toggle('flipped');
            if(current_card.classList.contains('flipped')) {
                modal.style.display = "block";
            }
            break;
        default:
            alert('An error has occured.');
            
    }
}

//User input modal

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function( event ) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/*

// Handle language selection change
function updateCountry( selection ) {
    var select = selection || _language.getSelected();
    _language.setSelection( select );
    _dialect.removeOptions();
    _dialect.addOptions( langs[select], 2 );
    _dialect.styleVisibility( langs[select][1].length );
    _dialect.setSelection( select );
};

// Language variable
// var langs = [...]; // languages.js

// Reference to language selection elements <select>
var select_language = document.getElementById('select_language');
var select_dialect  = document.getElementById('select_dialect');

// Create selection objects
var _language = new Selection(select_language);
var _dialect = new Selection(select_dialect);

// Add language options
_language.addOptions( langs, 1 );

// Assign the default language
updateCountry(6);

// Reference to card elements
// var myDeck          = document.getElementById('myDeck');
// var current_card    = document.getElementById('current_card');
// var front           = document.getElementById('front');
// var back            = document.getElementById('back');
// var correct         = document.getElementById('correct');
// var in_correct      = document.getElementById('in_correct');

// Speech variables
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

// Speech elements
// var start_button    = document.getElementById('start_button');

// Check if speech supported by browser
if (!('webkitSpeechRecognition' in window)) {
  console.log( 'Speech recognition not supported in current browser. Please use Chrome' + '\n' +
         'If you are using Chrome already, time to upgrade!');
} else {
  start_button.style.display = 'inline-block';
    
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    //showInfo('info_speak_now');
    start_img.src = '../images/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = '../images/mic.gif';
      //showInfo('info_no_speech');
      console.log('Speech not recognized.');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = '../images/mic.gif';
      //showInfo('info_no_microphone');
      console.log('No microphone detected.');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        //showInfo('info_blocked');
        console.log('Access blocked.');
      } else {
        //showInfo('info_denied');
        console.log('Access denied.');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = '../images/mic.gif';
    if (!final_transcript) {
      //showInfo('info_start');
      return;
    }
    //showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = final_transcript.toLowerCase();
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      //showButtons('inline-block');
    }
  };
}

// Deal with line breaks
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, ' ').replace(one_line, ' ');
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = '../images/mic-slash.gif';
  //showInfo('info_allow');
  //showButtons('none');
  start_timestamp = event.timeStamp;
}

*/

// Handle user query if known
function handleUserQuery( known ) {
    var index = parseInt(current_card.dataset.index);
    var element = getResponseElement( known );
    myDeck.cards[index].handleResponse( known );
    modal.style.display = "none";
    flipCard();
    handleResponse(element);
    checkMastery( index );
}

// Chack the mastery of a card in the deck
function checkMastery( index ) {
    var cardInQuestion = myDeck.cards[index];
    if(cardInQuestion.isMastered()) {
        console.log(cardInQuestion.phrase,'Mastered!');
        myDeck.addToMastered( index );
        current_card.dataset.index = parseInt(current_card.dataset.index) - 1;
    }
}

// Return element associated with response
function getResponseElement( known ) {
    switch( known ) {
        case true:
            return big_check;
            break;
        case false:
            return big_exx;
            break;
        default:
            console.error("Error getting response element.");
    }
}

// Initialize the quiz using a myDeck variable of length 1+
function init() {
    myDeck.reset();
    current_card.classList.remove('flipped')
    config.quizFinished = false;
    fireworks.style.visibility = 'hidden';
    full_window.style.visibility = 'hidden';
    full_window.style.backgroundColor = "transparent";
    current_card.dataset.index = 0;
    front.innerHTML = myDeck.cards[0].phrase;
    back.innerHTML = myDeck.cards[0].definition;
}