# Configuration

Setting                 | Name                       | Description
----------------------- | ---------------            | -------------
*cycle*                 | *Cycle Method*             | *Method used to cycle cards after a response.*
                        | FORWARD                    | Cycle to the next immediate card.
                        | BACKWARD                   | Cycle to the previous immediate card.
                        | RANDOM                     | Cycle to a random card.
*deckLimit*             | *Deck Limit*               | *Max number of cards to quiz at a time.*
                        | THREE                      | 3 cards at a time.
                        | FIVE                       | 5 cards at a time.
                        | TEN                        | 10 cards at a time.
                        | TWENTY                     | 20 cards at a time.
                        | ALL                        | All cards at once.
*masteryType*           | *Card Matery*              | *Method used to determine card mastery.*
                        | SATNDARD                   | Three cumulative correct responses determine mastery.
                        | SEQUENTIAL                 | Three consecutive correct answers determine mastery.
*persistState*          | *Save Progress*            | *Keep track of progress or not.*
                        | YES                        | Save a cookie of where you are.
                        | NO                         | Progress lost on session end.
*showReponseCount*      | *Show Response Count*      | *Show/hide the count of correct/incorrect answers.*
                        | YES                        | Shown.
                        | NO                         | Hidden.
*showReponseIndicators* | *Show Response Indicators* | *Show/hide indicators on correct/incorrect response.*
                        | YES                        | Shown.
                        | NO                         | Hidden.
*showTimer*             | *Show Timer*               | *Show/hide response timer.*
                        | YES                        | Shown.
                        | NO                         | Hidden.