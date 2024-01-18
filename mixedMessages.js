const suits = ['spade', 'club', 'diamond', 'heart'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

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
        if (totalValue + 11 <= 21) {
            totalValue += 11;
        } else {
            totalValue += 1;
        }
    }

    return totalValue;
};

let playerTotalValue = calculateHandValue(hands.player);
let dealerTotalValue = calculateHandValue(hands.dealer);

//console.log('Player hand:', hands.player);
console.log('Your total value:', playerTotalValue);

//console.log('Dealer hand:', hands.dealer);
console.log("Dealer's total value:", dealerTotalValue);

const drawCard = (playerHand, dealerHand, playerTotalValue, participant) => {
    let newCard;

    do {
        newCard = generateRandomCard(suits, ranks);
    } while (isCardInHand(newCard, playerHand) || isCardInHand(newCard, dealerHand));

    playerHand.push(newCard);
    playerTotalValue = calculateHandValue(playerHand);

    console.log(`${participant} hit and drew the ${newCard.rank} of ${newCard.suit}s`);
    console.log(`${participant}r total value is now: ${playerTotalValue}`);

    return playerTotalValue;
};

playerTotalValue = calculateHandValue(hands.player);
while (playerTotalValue <= 18) {
    playerTotalValue = drawCard(hands.player, hands.dealer, playerTotalValue, 'You');

    if (playerTotalValue === 21) {
        console.log('Blackjack! Player wins!');
        break; // Use break instead of return to exit the loop
    } else if (playerTotalValue > 21) {
        console.log('You went bust! Dealer wins!');
        break; // Use break instead of return to exit the loop
    }
};



/* NEW CODE HERE -> person has to hit all before the dealer gets delt, put the rules in README as not quite actual Blackjack

//later include The dealer must continue to take cards until the total is 17 or more, at which point the dealer must stand. If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand
// player decides to hit if less than 14 but stands at 19

console.log(`you were delt ${yourCard1} & ${yourCard2} your total is ${yourtotal1}`);
console.log(`Blackjack!`); // wrap in an if statement for the option of 21
console.log(`the dealer got ${dealerCard1}` & ${dealerCard2} the dealer has ${dealertotal}`);
*/

// Function to draw a new card and update the hand and total value
const drawCard = (playerHand, dealerHand, playerTotalValue, participant) => {
    let newCard = generateRandomCard(suits, ranks);

    while (!isCardInHand(newCard, playerHand) || !isCardInHand(newCard, dealerHand)) {
        // Ensure the new card is not a duplicate in either hand
        newCard = generateRandomCard(suits, ranks);
    }

    playerHand.push(newCard);
    playerTotalValue = calculateHandValue(playerHand);

    console.log(`${participant} drew the ${newCard.rank} of ${newCard.suit}s`);
    console.log(`${participant}'s total value is now: ${playerTotalValue}`);

    return playerTotalValue;
};

// Game loop for the player
playerTotalValue = calculateHandValue(hands.player);
while (playerTotalValue <= 18) {
    playerTotalValue = drawCard(hands.player, hands.dealer, playerTotalValue, 'Player');

    if (playerTotalValue === 21) {
        console.log('Blackjack! Player wins!');
        break;
    } else if (playerTotalValue > 21) {
        console.log('Player went bust! Dealer wins!');
        break;
    }
}

// Game loop for the dealer
let dealerTotalValue = calculateHandValue(hands.dealer);
while (dealerTotalValue <= 16) {
    dealerTotalValue = drawCard(hands.dealer, hands.player, dealerTotalValue, 'Dealer');

    if (dealerTotalValue > 21) {
        console.log('Dealer went bust! Player wins!');
        return;
    }
}

// Determine the winner
if (playerTotalValue > dealerTotalValue) {
    console.log('Player wins!');
} else if (dealerTotalValue > playerTotalValue) {
    console.log('Dealer wins!');
} else {
    console.log('It's a tie!');
}