/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');

const reorder = document.getElementsByClassName('fa-repeat')[0];

reorder.addEventListener('click', renewGrid);

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

  var currentArray = [];

  for (i=0; i<cards.length; i++) {
    currentArray.push(cards[i]);
  }

  shuffle(currentArray);

  newArray = [];

  for (k=0;k<cards.length;k++){
    newArray.push(currentArray[k].innerHTML);
    }

  for (m=0;m<cards.length;m++) {
    cards[m].innerHTML = newArray[m];
  }
}

let nrCard = 0;
let openCards = [];

deck.addEventListener('click', function(evt) {

  if (evt.target.nodeName === 'LI') {
    // evt.target.classList.add('open', 'show');
    evt.target.classList.add('open', 'show');
    openCards.push(evt.target.firstElementChild);
    nrCard += 1;

    // openCards.push(evt.target.firstElementChild);

    if (openCards.length <= 1) {
      }

    else if (openCards.length === 2) {
      // evt.target.classList.add('open', 'show');
      // openCards.push(evt.target.firstElementChild);
      // if (openCards.length === 2) {
        if (openCards[0] == openCards[1]) {
        openCards[0].parentElement.classList.toggle('open');
        openCards[0].parentElement.classList.toggle('show');
        openCards[1].parentElement.classList.toggle('open');
        openCards[1].parentElement.classList.toggle('show');
        openCards[0].parentElement.classList.add('match');
        openCards[1].parentElement.classList.add('match');
      } else {
        openCards[0].parentElement.classList.toggle('open');
        // openCards[0].parentElement.classList.toggle('show');
        openCards[1].parentElement.classList.toggle('open');
        // openCards[1].parentElement.classList.toggle('show');
        // openCards = [];
      }
    }
    if (nrCard > 2) {
      openCards = [];
      nrCard = 0;}

    // if (nrCard > 2) {
    //   openCards[0].parentElement.classList.toggle('open');
    //   openCards[0].parentElement.classList.toggle('show');
    //   openCards[1].parentElement.classList.toggle('open');
    //   openCards[1].parentElement.classList.toggle('show');
    //   nrCard = 0;
    // }


    // if (openCards[0] == openCards[1]) {
      //   console.log('match');
      // }
}
// } else if (evt.target.nodeName === 'I') {
//   evt.target.parentElement.classList.add('open', 'show');
//   // evt.target.parentElement.classList.toggle('show');
// }
// }
})





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
