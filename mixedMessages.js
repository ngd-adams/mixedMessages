const suits = ['spade', 'club', 'diamond', 'heart'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const blackjack = 21;
const dealerStandThrehold = 16;
const playerStandThrehold = 18;

// Function to generate a random suit
const randSuit = arr => {
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
}; 

// Function to generate a random number
const randRank = arr => {
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
}; 

// Function to generate a random card
const generateRandomCard = (arr1, arr2) => {
    return { suit: randSuit(arr1), rank: randRank(arr2) };
};

// Function to check if a card is already in the given hand
const isCardInHand = (card, hand) => {
    return hand.some(item => item.suit === card.suit && item.rank === card.rank);
};

// Function to deal cards to the player and dealer without duplicates
const dealCards = () => {
    const playerHand = [];
    const dealerHand = [];

    while (playerHand.length < 2 || dealerHand.length < 2) {
        const newCardPlayer = generateRandomCard(suits, ranks);
        const newCardDealer = generateRandomCard(suits, ranks);

        if (playerHand.length < 2 && !isCardInHand(newCardPlayer, playerHand) && !isCardInHand(newCardPlayer, dealerHand)) {
            playerHand.push(newCardPlayer);
        }

        if (dealerHand.length < 2 && !isCardInHand(newCardDealer, dealerHand) && !isCardInHand(newCardDealer, playerHand)) {
            dealerHand.push(newCardDealer);
        }
    }

    return { player: playerHand, dealer: dealerHand }; 
};

const hands = dealCards();

// console.log(hands);
console.log(`You were delt the ${hands.player[0].rank} of ${hands.player[0].suit}s and the ${hands.player[1].rank} of ${hands.player[1].suit}s`);
console.log(`The dealer was delt the ${hands.dealer[0].rank} of ${hands.dealer[0].suit}s and the ${hands.dealer[1].rank} of ${hands.dealer[1].suit}s`);

// Function to calculate the total value of a hand
const calculateHandValue = hand => {
    let totalValue = 0;
    let numAces = 0;

    for (const card of hand) {
        const rank = card.rank;

        if (rank === 'Ace') { 
            numAces++; // Count Aces separately to decide their value later

        } else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') { 
            totalValue += 10; // Face cards have a value of 10

        } else {
            totalValue += +rank; // Numeric cards have their face value
        }
    }

    // Determine the value of Aces (either 1 or 11) to get closest to 21 without busting
    
    for (let i = 0; i < numAces; i++) {
        if (totalValue + 11 <= blackjack) {
            totalValue += 11;
        } else {
            totalValue += 1;
        }
    }

    return totalValue;
};

let playerTotalValue = calculateHandValue(hands.player);
let dealerTotalValue = calculateHandValue(hands.dealer);
let playerGotBlackjack = false;


//console.log('Player hand:', hands.player);
console.log('Your total value:', playerTotalValue);

//console.log('Dealer hand:', hands.dealer);
console.log("Dealer's total value:", dealerTotalValue);


//function for drawing new cards
const drawCard = (playerHand, dealerHand, playerTotalValue, participant) => {
    let newCard;

    do {
        newCard = generateRandomCard(suits, ranks);
    } while (isCardInHand(newCard, playerHand) || isCardInHand(newCard, dealerHand));

    playerHand.push(newCard);
    playerTotalValue = calculateHandValue(playerHand);

    console.log(`${participant === 'You' ? 'You' : participant } hit and drew the ${newCard.rank} of ${newCard.suit}s`);
    console.log(`${participant === 'You' ? 'Your' : participant + "'s"} total value is now: ${playerTotalValue}`);

    return playerTotalValue;
};

// Game loop for the player
while (playerTotalValue < playerStandThrehold) {
    playerTotalValue = drawCard(hands.player, hands.dealer, playerTotalValue, 'You');

    if (playerTotalValue === blackjack) {
        console.log('Blackjack! Player wins!');
        process.exit(); // Exit the script after printing the message
    } else if (playerTotalValue > 21) {
        console.log('You went bust! Dealer wins!');
        process.exit(); // Exit the script after printing the message
    }
};

// Print message when the player stands
console.log('You stand.');

// Game loop for the dealer
if (playerTotalValue <= blackjack) {
    dealerTotalValue = calculateHandValue(hands.dealer);
    while (dealerTotalValue < dealerStandThrehold) {
        dealerTotalValue = drawCard(hands.dealer, hands.player, dealerTotalValue, 'Dealer');
    }
};

// Print message when the dealer stands
console.log('Dealer stands.');

// Determine the winner
if (playerTotalValue === blackjack && dealerTotalValue === blackjack) {
    console.log('It\'s a tie!');
} else if (playerTotalValue === dealerTotalValue) {
    console.log('It\'s a tie!');
} else if (playerTotalValue === blackjack) {
    console.log('Blackjack! Player wins!');
} else if (dealerTotalValue === blackjack && playerTotalValue < blackjack) {
    console.log('Dealer got Blackjack! Player loses!');
} else if (dealerTotalValue > blackjack) {
    console.log('Dealer went bust! Player wins!');
} else if (playerTotalValue > blackjack) {
    console.log('You went bust! Dealer wins!');
} else if (playerTotalValue > dealerTotalValue) {
    console.log('Player wins!');
} else {
    console.log('Dealer wins!');
};
