const restartButtonElement = document.querySelector('#restart-button');
const PairCountElement = document.querySelector('#pairs');
const movesElement = document.querySelector('#moves');
const gameboardElement = document.querySelector('#game-board');

const emojis = [
    "🩷", "🧸", "🍁",
    "🫖", "🍰", "💌"
];
//vriables to stroe the cards
let fristcard = null;
let secondcard = null;
let moves = 0;
let pairs = 0;

function createCards() {
    // // zero for the first element in the groub (clearing the board) 
    gameboardElement.innerHTML = "";


    //to create emojis pairs 
    let allEmojis = emojis.concat(emojis);

    // reorgnize the card randomly 
    allEmojis.sort(function () {
        return Math.random() - 0.5;
    });
   // create each of the cards 
    for (let i = 0; i < allEmojis.length; i++) {
         //creating the button 
        let card = document.createElement("button");

        card.className = "board-card";
        card.textContent = "?";  // shows the ? on the cards 

        card.dataset.emoji = allEmojis[i];  //store the emojis inside the cards

        //adding the event listesner to the cards 
        card.addEventListener("click", function () {

            if (card.textContent !== "?") {
                return;
            }
             //shows the emojis on the cards 
            card.textContent = card.dataset.emoji;
            //choosing the first card if is selected or no 
            if (fristcard === null) {

                fristcard = card;
              
            } else {

                secondcard = card;
                //counting the moves 
                moves++;
                //updating the count on the screen
                movesElement.textContent = moves;
                //checking the pairs 
                if (fristcard.dataset.emoji === secondcard.dataset.emoji) {
                   //counting and updaiting the pairs
                    pairs++;
                    PairCountElement.textContent = pairs + " / 6";

                    fristcard = null;
                    secondcard = null;

                    if (pairs === 6) {
                        alert("🎉 You Win!");
                    }

                } else {

                    setTimeout(function () {
                      //hide the cards if not matching or not winning
                        fristcard.textContent = "?";
                        secondcard.textContent = "?";

                        fristcard = null;
                        secondcard = null;
                    //waiting 1000 millisecond
                    }, 1000);
                }
            }
        });
        // for showing the  cards 
        gameboardElement.appendChild(card);
    }
}

function restartGame() {

    moves = 0;
    pairs = 0;

    fristcard = null;
    secondcard = null;

    movesElement.textContent = 0;
    PairCountElement.textContent = "0 / 6";
 /// creating new cards 
    createCards();
}

restartButtonElement.addEventListener("click", restartGame);

createCards();