'use strict';

// SELECTION DES ELEMENTS ET VARIABLES
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

// FUNCTIONS
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// DECLARATION DES VARIABLES A L'EXTERIEUR DE LA FONCTION
let scores;
let currentScore;
let activePlayer;
let playing;

function init() {
    // VARIABLES (REINITIALISATION)
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // REINITIALISER LE SCORE
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    // RETIRER LA CLASSE WINNER AU 2 JOUEURS
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    // RETIRER LA CLASSE ACTIVE AU JOUEUR 2 ET LA REACTIVER AU JOUEUR 1
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    // MASQUER LE DE
    diceEl.classList.add('hidden');
}

init();

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
    if (playing) {
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
            switchPlayer();
        }
    }
});

// HOLD BUTTON
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. ADD CURRENT SCORE TO ACTIVE PLAYER
        scores[activePlayer] += currentScore;
        // score[1] = scores[1] + currentScore --> AUTRE FACON D'ECRIRE
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // CHECK IF PLAYER'S SCORE IS >= 100
        if (scores[activePlayer] >= 100) {
            // FINISH THE GAME
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

// NEW GAME BUTTON
btnNew.addEventListener('click', init)
