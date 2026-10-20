const restartButtonElement = document.querySelector('#restart-button');
const startButtonElement = document.querySelector('#start-button');
const PairCountElement = document.querySelector('#pairs');
const movesElement = document.querySelector('#moves');
const gameboardElement = document.querySelector('#game-board');
const timeElement = document.querySelector('#timer')
const cardboardElement = document.querySelectorAll('.board-card')
const messageElement = document.querySelector('#message');
const playerNameElement = document.querySelector('#player-name');
const highScoreElement = document.querySelector('#high-score');
const pauseButtonElement = document.querySelector('#pause-button');
const darkModeButton = document.querySelector('#dark-mode-button');
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
    "🌻", "🧸", "🧁",
    "🕯️", "🍰", "💌",
    "🌻", "🧸", "🧁",
    "🕯️", "🍰", "💌"
];
//vriables to stroe the cards
let firstcard = null;
let secondcard = null;
let firstcardElement = null;
let secondcardElement = null;
let timerInterval
let highscore=0;
let playerName = '' ;
let isPaused = false ;
let moves = 0;
let pairs = 0;
let time = 60;


//functions 


//timer function 
function startTimer() {

  timerInterval = setInterval(() => {
     if (isPaused) {
            return;
        }

    time--;
    console.log(time);

    timeElement.textContent = `00:${time}`;
 //to stop when the time is finished 
    if (time <= 0) {

        clearInterval(timerInterval);

        messageElement.textContent = "⏰ Time's Up" +" "+ playerName + "!";
     
    }

}, 1000);

}


function startGame() {
 playerName = playerNameElement.value 

    if (playerName === '') {
        playerName = 'Player';
    }

  
 messageElement.textContent = `Good Luck ${playerName} ✿`;
    cardboardElement.forEach((card) => {
    card.addEventListener('click', handleClick);
});


    shuffleCards()
    startTimer()
}

function handleClick(event) {
    chooseCard(event)
}

function chooseCard(event) {
   
    //so we canot reveal cards we it pause 
if (isPaused) {
    return;
}
    const cardIndex = Number(event.target.id.split('card-')[1]) - 1


    // to not allow choosing the same card twice 
    if (event.target.textContent !== '🌸') {
        return
    }

    console.log(emojis[cardIndex])
    console.log('Picked card')

    // if not first and not the second 
    if (!firstcard && !secondcard) {
        firstcard = emojis[cardIndex]
        firstcardElement = event.target
        event.target.textContent = emojis[cardIndex]

    }

    else if (firstcard && !secondcard) {
        //    1. do the same as firstCard reveal
        //    2. write if statement to check if firstCard is same as secondCard
        //    3. if they are pairs++

        secondcard = emojis[cardIndex]
        secondcardElement = event.target;
        event.target.textContent = emojis[cardIndex]
        moves++;
        movesElement.textContent = moves;



        if (firstcard === secondcard) { // if statement if the matches are correct

            console.log('its a match');

            pairs++;
            PairCountElement.textContent = pairs + " / 6";


            firstcard = null;
            secondcard = null;

            firstcardElement = null
            secondcardElement = null

     
     if (pairs === 6) {

    messageElement.textContent =
        `🎉 Congratulations ${playerName} You found all pairs!`;

        clearInterval(timerInterval) //stop the timer after finding all the matches


        //highest score 
    if (highscore === 0 || moves< highscore) {

        highscore = moves;
        highScoreElement.textContent = highscore;

    }
}

}
        else { // else if there is no  matches 
            console.log('not a match ')

            setTimeout(() => {

                firstcardElement.textContent = '🌸';
                secondcardElement.textContent = '🌸';

                firstcard = null;
                secondcard = null;

                firstcardElement = null
                secondcardElement = null
            }, 1000);
        }

    }

}

function shuffleCards() {
    emojis.sort((a, b) => .5 - Math.random())
    console.log(emojis)
}

function restartGame() {
clearInterval(timerInterval);
    moves = 0;
    pairs = 0;
    time = 60

    firstcard = null;
    secondcard = null;
    firstcardElement = null;
    secondcardElement = null;

    isPaused = false;
    
    messageElement.textContent = " Ready to play? ♡";
    movesElement.textContent = 0;
    PairCountElement.textContent = "0 / 6";
    timeElement.textContent = '00:60';
    pauseButtonElement.textContent = 'Pause';

   shuffleCards();
   resetCards();
}

function resetCards(){
    for(let card of cardboardElement){
        card.textContent = '🌸'
    }
}


function pauseGame (){
    if (!isPaused){
        clearInterval(timerInterval);
        pauseButtonElement.textContent = "Resume";
        isPaused = true
    }
    else{
        startTimer();
        pauseButtonElement.textContent = "pause";
        isPaused = false
    }
}

restartButtonElement.addEventListener("click", restartGame);
startButtonElement.addEventListener("click", startGame);
pauseButtonElement.addEventListener("click", pauseGame);



//dark mode click toggle switching between two states like switch on/ of 
darkModeButton.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

});


