import { CardSuits } from "../helpers/card-suits";
import { CardValues } from "../helpers/card-values";
import { Card } from "./card";

export class Deck {
    cards: Card[];
    constructor() {
        this.cards = [];
    }
    public fillDeck() {
        for (let suit in CardSuits) {
            if (isNaN(Number(suit))) {
                this.fillSuit(Number(suit));
            }
        }
    }
    private fillSuit(suit: CardSuits) {
        for (let value in CardValues) {
            if (isNaN(Number(value))) {
                this.cards.push(new Card(suit, value));
            }
        }
    }
    public shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let temp = this.cards[Math.floor(Math.random() * (i + 1))];
            this.cards[i] = temp;
            this.cards[Math.floor(Math.random() * (i + 1))] = this.cards[i];
        }
    }

}