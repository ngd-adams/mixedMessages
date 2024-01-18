# Blackjack Game

## Overview

Welcome to the console-based Blackjack game! This simple implementation allows you to play a *version* the classic casino card game against a computerized dealer. This project was created as part of Codecademy's 'Mixed Messages' exercise, where the scope was to build a message generator program - every time a user runs the program, they should get a new, randomized output.

## Rules

- The game is played with a standard 52-card deck.
- Face cards (King, Queen, Jack) have a value of 10, and Aces can be either 1 or 11 (optimal value determined by the program).
- The goal is to get a hand value as close to 21 as possible without exceeding it.
- If a player's hand value is 21 with the first two cards (an Ace and a 10-value card), they achieve "blackjack" and win the round.

## How to Play

1. Run the script to start a new game.
2. You and the dealer are dealt two cards each.
3. View your initial hand and both of the dealer's cards.
4. The game will automatically decide the optimal strategy for you based on the following thresholds:
   - If your hand value is 18 or higher, the program will automatically "stand" (keep the current hand).
   - If your hand value is below 18, the program will automatically "hit" (draw a new card) until reaching the threshold.
   - If you achieve "blackjack" with the first two cards (an Ace and a 10-value card), you win the round immediately.
   - If your hand value exceeds 21, the game ends, and the dealer wins.
5. Once you decide to "stand," the dealer will then draw cards until reaching a total of 16 or higher. The dealer will automatically "stand" once their hand reaches this threshold.
6. The winner is determined based on the final hand values.

**Caveats:**
- **Dealer's hand:** The program shows both cards in the dealer's initial hand.
- **Splitting:** The program does not support splitting pairs.
- **Double Down:** The option to double down is not available.
- **Insurance:** There is no option to take insurance against the dealer having blackjack.
- **Surrender:** Surrendering a hand is not an available choice.
- **Multiple Decks:** The game is played with a single deck.
  
Note: The game is designed to streamline the player's decision-making process by automatically determining the best move based on common Blackjack strategies. Enjoy the game, and good luck at the tables!

## Installation

1. Clone the repository to your local machine.

