
import * as Constants from './constants'


export class Card {
    suit: string;
    value: string;

    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

export class Hand {
    cards: Card[];
    constructor() {
        this.cards = [];
    }
    get handValue() {
        let total = 0;
        if (this.cards.some(card => card.value === 'A')) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].value !== 'A') continue
                this.cards.push(this.cards[i]);
                this.cards.splice(i, 1);
            }

        }
        this.cards.forEach(card => {
            switch (card.value) {
                case 'A':
                    if (total >= 11) {
                        total += 1;
                    } else {
                        total += 11;
                    }
                    break;
                case 'K':
                case 'Q':
                case 'J':
                    total += 10;
                    break;
                default:
                    total += Number(card.value)
            }
        })
        return total;

    }
}

export class Deck {
    deck: Card[];

    constructor() {
        this.deck = [];
        for (let k = 0; k < Constants.NUMBER_OF_DECKS; k++) {
            for (let i = 0; i < Constants.SUITS.length; i++) {
                for (let j = 0; j < Constants.CARD_VALUES.length; j++) {
                    this.deck.push(new Card(Constants.SUITS[i], Constants.CARD_VALUES[j]));
                }
            }
        }
    }
    public suffleDeck() {
        for (var i = this.deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
    public get getCard() {
        if (this.deck.length !=0) {
            return this.deck.shift();
        } else {
            return null;
        }
    }

}

export class Dealer {
    hand: Hand;
    constructor(){
        this.hand = new Hand();
    }
    shouldDealerHit() {
        if (this.hand.handValue <= 16) return true
        return false
    }
    get checkBust(){
        if(this.hand.handValue > 21) return true   
        return false
    }
}

export class Player {
    money: number;
    hand: Hand;
    id:number;
    constructor(id) {
        this.hand = new Hand();
        this.money = Constants.STARTING_MONEY;
        this.id = id;
    }
    shouldPlayerHit(dealersCard?: Card) {
        if (dealersCard) {

        } else {
            if (this.hand.handValue <= 16) return true
            return false
        }

    }
    get checkBust(){
        if(this.hand.handValue > 21) return true   
        return false
    }
    removeMoney(x){
        this.money -=x;
    }
    addMoney(x){
        this.money +=x;
    }

}