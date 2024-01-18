const suits = ['spade', 'club', 'diamond', 'heart'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

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

console.log(hands);


/*
const determineWinner = () => {
    //function that determines a winner based on the cards delt and sends a message to the console.
    
};

//later include The dealer must continue to take cards until the total is 17 or more, at which point the dealer must stand. If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand
// player decides to hit if less than 14 but stands at 19

console.log(`you were delt ${yourCard1} & ${yourCard2} your total is ${yourtotal1}`);
console.log(`Blackjack!`); // wrap in an if statement for the option of 21
console.log(`the dealer got ${dealerCard1}` & ${dealerCard2} the dealer has ${dealertotal}`);
*/