const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchCards = 0;
let attempts = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        attempts += 1;
        matchCards += 1;

        if (matchCards === 6) {
            setTimeout(() => {
                alert(`You won in ${attempts} attempts!`);
                resetGame();
            }, 1000);
        }
    }
    else {
        unflipCards();
        attempts += 1;
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function resetBoard() {
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

let shuffle = (function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
    return shuffle;
})();

let addEventFlipCard = (function addEventFlipCard() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
    return addEventFlipCard;
})();

function unflipAll() {
    cards.forEach(card => {
        card.classList.remove('flip');
    });
}

function resetGame() {
    unflipAll();
    resetBoard();
    matchCards = 0;
    attempts = 0;
    shuffle();
    addEventFlipCard();
}