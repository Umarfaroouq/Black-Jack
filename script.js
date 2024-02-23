// Define the suits and values for a standard deck of cards
const suits = ['♠', '♣', '♥', '♦'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Initialize empty arrays for the deck, dealer's cards, and player's cards
let deck = [];
let dealerCards = [];
let playerCards = [];

// Function to create a new deck of cards
function createDeck() {
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Function to shuffle the deck of cards
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Function to deal a card from the deck
function dealCard() {
    return deck.pop();
}

// Function to calculate the score of a hand of cards
function calculateScore(cards) {
    let score = 0;
    let hasAce = false;
    for (let card of cards) {
        if (card.value === 'A') {
            hasAce = true;
        }
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            score += 10;
        } else if (card.value === 'A') {
            score += 11;
        } else {
            score += parseInt(card.value);
        }
    }
    if (hasAce && score > 21) {
        score -= 10;
    }
    return score;
}

// Function to render cards on the UI
function renderCards(cards, elementId) {
    const cardContainer = document.getElementById(elementId);
    cardContainer.innerHTML = '';
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.textContent = `${card.value}${card.suit}`;
        cardContainer.appendChild(cardDiv);
    });
}

// Function to start the game by shuffling the deck and dealing cards to the dealer and player
function startGame() {
    deck = shuffleDeck(createDeck());
    dealerCards = [dealCard(), dealCard()];
    playerCards = [dealCard(), dealCard()];
    renderCards(dealerCards, 'dealer-cards');
    renderCards(playerCards, 'player-cards');
    updateScores();
}

// Function to handle player hitting (requesting another card)
function hit() {
    playerCards.push(dealCard());
    renderCards(playerCards, 'player-cards');
    updateScores();
    if (calculateScore(playerCards) > 21) {
        endGame();
    }
}

// Function to handle player standing (ending their turn)
function stand() {
    while (calculateScore(dealerCards) < 17) {
        dealerCards.push(dealCard());
    }
    renderCards(dealerCards, 'dealer-cards');
    updateScores();
    endGame();
}

// Function to update the displayed scores on the UI
function updateScores() {
    document.getElementById('player-score').textContent = `Score: ${calculateScore(playerCards)}`;
    document.getElementById('dealer-score').textContent = `Score: ${calculateScore(dealerCards)}`;
}

// Function to end the game and determine the winner
function endGame() {
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);
    let message = '';
    if (playerScore > 21) {
        message = 'You busted! Dealer wins.';
    } else if (dealerScore > 21 || playerScore > dealerScore) {
        message = 'You win!';
    } else if (playerScore < dealerScore) {
        message = 'Dealer wins!';
    } else {
        message = 'It\'s a tie!';
    }
    alert(message);
}
