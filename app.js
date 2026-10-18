const restartButtonElement = document.querySelector('#restart-button');
const PairCountElement = document.querySelector('#pairs');
const movesElement = document.querySelector('#moves');
const gameboardElement = document.querySelector('#game-board');
const timeElement = document.querySelector('#timer')
const cardboardElement = document.querySelectorAll('.board-card')
const messageElement = document.querySelector('#message');
// console.log(restartButtonElement)
// console.log(PairCountElement)
// console.log(movesElement)
// console.log(gameboardElement)
// console.log(timeElement)
console.log(cardboardElement)

// 1. cache all the board-card with querySelectorAll()
// 2. Loop through all the cards and add event listener to each eleemnt
// 3. the event listener should call the chooseCard function()

const emojis = [
    "🩷", "🧸", "🍁",
    "🫖", "🍰", "💌",
    "🩷", "🧸", "🍁",
    "🫖", "🍰", "💌"
];
//vriables to stroe the cards
let firstcard = null;
let secondcard = null;
let firstcardElement = null;
let secondcardElement = null;
let moves = 0;
let pairs = 0;
let time = 60;

function startTimer (){
}


function startGame(){
    shuffleCards()
}

function handleClick(event){
    chooseCard(event)
}

function chooseCard(event){
    const cardIndex = Number(event.target.id.split('card-')[1]) -1


    // to not allow choosing the same card twice 
    if (event.target.textContent !== '?') {
        return
    }
    
    console.log(emojis[cardIndex])
    console.log('Picked card')

    // if not first and not the second 
    if(!firstcard && !secondcard){
        firstcard = emojis[cardIndex]
        firstcardElement = event.target
        event.target.textContent = emojis[cardIndex]
        
    }

  else if( firstcard && !secondcard ) {
//    1. do the same as firstCard reveal
//    2. write if statement to check if firstCard is same as secondCard
//    3. if they are pairs++

    secondcard= emojis[cardIndex]
    secondcardElement = event.target;
    event.target.textContent = emojis[cardIndex]
    moves++;
        movesElement.textContent = moves;
  


 if (firstcard === secondcard) {

    console.log('its a match');

    pairs++;
    PairCountElement.textContent = pairs + " / 6";



    if (pairs === 6) {
        messageElement.textContent =
            "🎉 Congratulations! You found all pairs!";
    }


   
 else  {
    console.log('not a match ')
    
    setTimeout(() => {

            firstcardElement.textContent = '?';
            secondcardElement.textContent = '?';

            firstcard = null;
            secondcard = null;

            firstcardElement = null
            secondcardElement = null
        }, 1000);
    }

 
}   
}

}

function shuffleCards(){
    emojis.sort((a,b)=> .5 - Math.random())
    console.log(emojis)
}

function restartGame() {

    moves = 0;
    pairs = 0;
  

    firstcard = null;
    secondcard = null;
    messageElement.textContent = "ready to play ";


    
    movesElement.textContent = 0;
    PairCountElement.textContent = "0 / 6";

 }

restartButtonElement.addEventListener("click", restartGame);

cardboardElement.forEach((card) => {
  card.addEventListener('click', handleClick);
});


startGame()