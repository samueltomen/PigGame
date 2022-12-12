'use strict';

// SELECTION DES ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const activePlayerClass = document.querySelector('.player');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
    // 1. GENERATE A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. CHECK FOR ROLLED 1: IF TRUE, SWITCH TO THE NEXT PLAYER
    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        // SWITCH TO THE NEXT PLAYER
      switchPlayer()
    }
});

btnHold.addEventListener('click', function () {
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    // score[1] = scores[1] + currentScore
    document.getElementById(`current--${activePlayer}`).textContent =
        scores[activePlayer];

    // Check if player's score is >= 100
        switchPlayer()
    // Finish the game

    // Switch to the next player
});
