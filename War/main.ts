import { Deck } from "./classes/deck";
import { Player } from "./classes/player";
import { CardValues } from "./helpers/card-values";

export class War {
    Player1 = new Player(1);
    Player2 = new Player(2);
    potDeck = new Deck();

    constructor() {
        let startingDeck = new Deck();
        startingDeck.fillDeck();
        startingDeck.shuffleDeck();
        console.log(startingDeck.cards.length)
        startingDeck.cards.forEach((card, i) => {
            if (i % 2 === 0) this.Player1.activeDeck.cards.push(card);
            else this.Player2.activeDeck.cards.push(card);
        })
    }
    play() {
        while (this.Player1.getCardValue !== null || this.Player2.getCardValue !== null) {
            switch (this.playersFlip()) {
                case 0:
                    this.addCardsToPot();
                    this.war()
                    break;
                case 1:
                    this.addCardsToPot();
                    this.playerWinsPot(this.Player1)
                    break;
                case 2:
                    this.addCardsToPot();
                    this.playerWinsPot(this.Player2)
                    break;
                default:
                    break;
            }
        }

        console.log(`Player 1  ${this.Player1.activeDeck.cards.length}`);
        console.log(`Player 2  ${this.Player2.activeDeck.cards.length}`);
        console.log(`Player 1  ${this.Player1.discardDeck.cards.length}`);
        console.log(`Player 2  ${this.Player2.discardDeck.cards.length}`);
        if (this.Player1.activeDeck.cards.length > 0) console.log(`Player 1 wins`);
        if (this.Player2.activeDeck.cards.length > 0) console.log(`Player 2 wins`);
    }
    playersFlip() {
        console.log(`Player 1 flips ${this.Player1.getCardValue}`);
        console.log(`Player 2 flips ${this.Player2.getCardValue}`);
        if (this.Player1.getCardValue === null || this.Player2.getCardValue === null) return null
        if (CardValues[this.Player1.getCardValue] > CardValues[this.Player2.getCardValue]) return 1
        if (CardValues[this.Player1.getCardValue] < CardValues[this.Player2.getCardValue]) return 2
        return 0
    }

    war() {
        console.log('War!')
        for (let i = 0; i > 2; i++) {
            if (this.Player1.getCardValue === null) {
                this.playerWinsPot(this.Player2);
                return;
            }
            if (this.Player2.getCardValue === null) {
                this.playerWinsPot(this.Player1);
                return;
            }
            this.addCardsToPot();
        }

        switch (this.playersFlip()) {
            case 0:
                this.addCardsToPot();
                this.war()
                break;
            case 1:
                this.addCardsToPot();
                this.playerWinsPot(this.Player1)
                break;
            case 2:
                this.addCardsToPot();
                this.playerWinsPot(this.Player2)
                break;
            default:
                break;
        }


    }
    addCardsToPot() {
        this.potDeck.cards.push(this.Player1.getCard);
        this.potDeck.cards.push(this.Player2.getCard);
    }
    playerWinsPot(player: Player) {
        console.log(`Player ${player.id} has won the pot with ${this.potDeck.cards.length} Cards in the pot`);
        this.potDeck.cards.forEach(card => {
            player.discardDeck.cards.push(card);
        });
        this.potDeck = new Deck();
    }

}

let game = new War();
game.play();