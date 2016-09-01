# FlashDeck #

A project for quizzing & mastering flash cards.

## Installation ##

This is an optional step, if you want to serve the app statically.
You can also run from file by opening html/index.html in a browser (Prefferably Chrome)

```dart
npm install -g
```

OR

```dart
npm install http-server -g
```

## Usage ##

```dart
http-server $PATH_TO_PROJECT
```
Navigat to: [http-server address]/html/

OR

$PATH_TO_PROJECT/html/index.html

*   Load deck of cards using the upload feature in the Settings modal.
    *  Two sample decks are provided; short & long
*   Click the 'Apply' button and get goin!
*   Keyboard controls are easiest:
    *  Space Bar   : Pause
    *  Left Arrow  : Cycle Backward
    *  Up Arrow    : Flip Card and Respond
    *  Right Arrow : Cycle Forward

## TODO ##

### Version 1.0.0 ###

* Add Deck reset button to config setting dailauge
X Add keyboard helper overlay
X Add Pause / Continue functionality
X Add Keyboard event listener controls
X Refactor Config Setting Dailauge to use Pause / Continue functionality

### Version 1.1.0 ###

* Add DeckLimit to config settings
* Refactor to use HTML5 import

### Varsion 2.0.0 ###
    
* Add speech recognition functionality
    
    



