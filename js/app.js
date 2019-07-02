/*
 * Memory Game JavaScript file
/*

 /* Several initiating globl variables*/
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const reorder = document.getElementsByClassName('fa-repeat')[0];
let nrMoves = 0;
let card1 = 0;
let card2 = 0;
let countMatches = 0;
const star = []; // an array containing the stars from the score panel
for (s=0;s<=2;s++) {
   star[s] = document.getElementsByClassName('fa-star')[s];
}
let seconds = 0;
let stopTimer = false;

renewGrid(); //renew the grid upon each loading of the game

reorder.addEventListener('click', renewGrid); //renew the grid on restart click

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function renewGrid() {
  var currentArray = [];  //an array containing the cards to be reshuffled

  for (i=0; i<cards.length; i++) {
    currentArray.push(cards[i]);
  }

  shuffle(currentArray);

  newArray = []; //new array containin the reshuffled cards

  for (k=0;k<cards.length;k++){
    newArray.push(currentArray[k].innerHTML);
  }

  for (m=0;m<cards.length;m++) {  //write the reshuffled cards to the html
    cards[m].innerHTML = newArray[m];
    cards[m].classList.remove('open', 'show', 'match'); //clear open classes
  }
  card1 = 0;
  card2 = 0;

  nrMoves = -1; //zero the move counter
  moves();
  countMatches = 0;

  for (s=0;s<=2;s++) {    //return the starting three full star rating
     star[s].className = 'fa fa-star';
  }
  document.querySelector('.scoreStars').innerHTML = "";
  stopTimer = true;
  seconds = 0;                            //set timer to zero
  document.querySelector('.time').innerHTML = seconds;
}

function displayCard(evt) { //the function called upon a click on the deck
  if ((evt.target.nodeName === 'LI')
  && !evt.target.classList.contains('open', 'show', 'match')
  && (card2===0)) {   //make sure that only 2 cards can be open
    let card = evt.target;
    card.classList.add('open', 'show');  //open card
    //first click only starts timer (otherwise timer accelerates):
    if ((nrMoves === 0) && (card1 === 0)) {stopTimer = false; timer()};
    checkCards(card);   //start checking procedure
  }
}

function winGame () {   //called to check if winning and run the win sequence

  let messageStars = [];

  if (countMatches === 1) {   //the winning condition
    //write moves and seconds to the winning message
    document.querySelector('.numMoves').innerHTML = nrMoves;
    document.querySelector('.seconds').innerHTML = seconds;
    //write stars score to the winning message
    for (c=0; c<=2;c++) {
      messageStars[c] = star[c].cloneNode(); //clone stars to avoide removig
      document.querySelector('.scoreStars').appendChild(messageStars[c]);
    }
    stopTimer = true;  //stops the timer
    //display winning message
    document.querySelector('.win_msg').style.display = 'block';
  }

  //close winning message if a click is outside it
  const container = document.querySelector('.container');

  container.addEventListener('click', function(abc) {
    if (abc.target.classList.contains('win_msg')) {
      document.querySelector('.win_msg').style.display = 'block';
    } else {document.querySelector('.win_msg').style.display = 'none';}
  })

}

function uponButtonClick() {
  renewGrid();
  document.querySelector('.win_msg').style.display = 'none';
}

const button = document.querySelector('.button')
button.addEventListener('click', uponButtonClick);

function hideCards() {  //called if the pair of cards do not match
  card1.classList.remove('open', 'show');
  card2.classList.remove('open', 'show');
  card1 = 0;
  card2 = 0;
}

function matchCards() { //called if cards match
  card1.classList.add('match');
  card2.classList.add('match');
  card1 = 0;
  card2 = 0;
  countMatches +=1;
  winGame();
}

function checkCards(card) { // function to check if cards match
  if (card1 === 0) {
      card1 = card;
  } else {
    card2 = card;
      if (card1.innerHTML === card2.innerHTML) {
        setTimeout(function(){matchCards()}, 1000); //delay matching
      } else {
        setTimeout(function(){hideCards()}, 1000); //delay hiding
        }
      moves(); //record moves
      rating(); //change rating
    }
}

deck.addEventListener('click', displayCard); //listens for click on the deck

function moves() {
  nrMoves +=1;
  const moves = document.querySelector('.moves');
  moves.innerHTML = nrMoves;
}

function rating() {         //changes the star rating as moves increase
  if ((nrMoves > 12)&&(nrMoves <=15)) {
    star[2].className = 'fa fa-star-half-o';
  }
  if ((nrMoves > 15)&&(nrMoves <=18)) {
    star[2].className = 'fa fa-star-o';
  }
  if ((nrMoves > 18)&&(nrMoves <=21)) {
    star[1].className = 'fa fa-star-half-o';
  }
  if ((nrMoves > 21)&&(nrMoves <=24)) {
    star[1].className = 'fa fa-star-o';
  }
  if ((nrMoves > 24)&&(nrMoves <=27)) {
    star[0].className = 'fa fa-star-half-o';
  }
  if (nrMoves > 27) {
    star[0].className = 'fa fa-star-o';
  }
}

function timer() {                  //the timer
  if (!stopTimer) {
    seconds += 1;
    setTimeout(function(){timer()}, 1000);
    document.querySelector('.time').innerHTML = seconds;
  }
}
