# FlashDeck #

A project for quizzing & mastering flash cards.

## Installation ##

This is an optional step, if you want to serve the app statically.
You can also run from file by opening html/index.html in a browser (Prefferably Chrome).

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

## TODO (Incomplete) ##

### Version 1.0.0 ###

X Add quiz cycle type to config settings

X Add Deck reset button to config setting dailauge

X Add keyboard helper overlay

X Add Keyboard event listener controls

X Add Pause / Continue functionality

X Add Random Cycling to quizzing

X Refactor Config Setting Dailauge to use Pause / Continue functionality

### Version 1.1.0 ###

* Add DeckLimit to config settings
    * User should be able to specify how many cards to review at a time
* Add isMastered type to config settings
    * User should be able to specify mastery on three correct answers total, or three consecutive correct answers
* Refactor to use HTML5 import
    * Modularize UI to individual components
* Document Sequence Diagrams for Application events

### Version 2.0.0 ###

* Add mobile device support to UI
    * Application should be usable via mobile devices
* Add speech recognition functionality (Chrome Only)
    * User should be able to respond via voice
* Add learn mode to application
    * There should be an application mode that allows the app to learn correct responses that do not exactly match definitions
* Add utterances to cards
    * Cards should retain a list of utterances that qualify as correct
* Add statistics
    * The application should provide the user with statistics on response times & attempts needed before mastery
    
### Version 3.0.0 ###

* Add retention checking to quizzes
    * The application should periodically reassess mastered cards
    * Correct reassessments should be disqualified for one rotation of reassessment
    * Incorrect reassessments should reenter quiz at a decreased mastery level
* Add method for deck / card management
    * The user should be able to modify decks and cards within decks from a UI
* Add database persistance to application
    * Users should be able to load quizes from any location and pick up where they left off