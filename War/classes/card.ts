import { CardSuits } from "../helpers/card-suits";
import { CardValues } from "../helpers/card-values";

export class Card {
    suit: CardSuits;
    value: CardValues;
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}