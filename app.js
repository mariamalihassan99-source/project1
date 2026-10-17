const restartButtonElement = document.querySelector('#restart-button');
const PairCountElement = document.querySelector('#pairs');
const movesElement = document.querySelector('#moves');
const gameboardElement = document.querySelector('#game-board');
const timeElement = document.querySelector('#timer')
const cardboardElement = document.querySelectorAll('.board-card')

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
    const cardIndex = Number(event.target.id.split('card-')[1])
    console.log(cardIndex)
    console.log('Picked card')
    if(!firstcard && !secondcard){
        firstcard = emojis[cardIndex]
        event.target.textContent = emojis[cardIndex]
        
    }

  else if( firstcard && !secondcard ) {
//    1. do the same as firstCard reveal
//    2. write if statement to check if firstCard is same as secondCard
//    3. if they are pairs++

    secondcard= emojis[cardIndex]
    event.target.textContent = emojis[cardIndex]
    moves++;
        movesElement.textContent = moves;
  }


else if (firstcard === secondcard) {
    console.log("it's a match");
    pairs++;
 PairCountElement.textContent = `${pairs} / 6`;
 

}
   
 else  {
    console.log('not a match ')
    firstcard = null;
        secondcard = null;
    
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

    movesElement.textContent = 0;
    PairCountElement.textContent = "0 / 6";

 }

restartButtonElement.addEventListener("click", restartGame);

cardboardElement.forEach((card) => {
  card.addEventListener('click', handleClick);
});


startGame()