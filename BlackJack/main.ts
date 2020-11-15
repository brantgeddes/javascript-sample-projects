import { Dealer, Deck, Player, Hand } from "./helpers";

import * as Constants from './constants'



export class BlackJack {
    players: Player[];
    dealer: Dealer;
    deck: Deck;

    constructor() {
        this.dealer = new Dealer();
        this.players = [];
        for (let i = 0; i < Constants.NUMBER_OF_PLAYERS; i++) {
            this.players.push(new Player(i));
        }
        this.deck = new Deck();
        console.log(this.deck.deck.length)
        this.deck.suffleDeck();
    }

    playGame() {
        console.log("Starting Game");
        console.log("Starting players = ", this.players.length);
        while (this.players.length > 0) {
            if(this.deck.deck.length < 5){
                this.deck = new Deck();
                this.deck.suffleDeck();
            }
            this.deal();
            this.players.forEach(player => {
                this.playerHit(player);
            });
            this.dealereHit();
            this.checkResults();
        }

    }
    deal() {
        this.dealer.hand = new Hand();
        this.players.forEach((player, i) => {
            player.hand = new Hand();
            player.removeMoney(Constants.PRICE_PER_HAND);
            if (player.money < 0) {
                console.log("Player: " + player.id + " has run out of money");
                this.players.splice(i, 1);
            } else {
                console.log("Dealing to Player: " + player.id);
                player.hand.cards.push(this.deck.getCard);
            }
        });
        this.dealer.hand.cards.push(this.deck.getCard);
        this.players.forEach(player => {
            player.hand.cards.push(this.deck.getCard);
        });
        this.dealer.hand.cards.push(this.deck.getCard);
    }
    playerHit(player: Player) {
        console.log(player.hand);
        while (player.shouldPlayerHit() === true) {
            console.log("Player: " + player.id + " has hit");
            player.hand.cards.push(this.deck.getCard);
        }
    }
    dealereHit() {
        while (this.dealer.shouldDealerHit() === true) {
            console.log("Dealer: has hit");
            this.dealer.hand.cards.push(this.deck.getCard);
        }
    }
    checkResults() {
        if (this.dealer.hand.handValue === 21) {
            console.log("Dealer wins, Dealer has: ", this.dealer.hand.handValue)
            return
        }
        this.players.forEach(player => {
            if (player.hand.handValue === 21) {
                player.addMoney(Constants.PRICE_PER_HAND + (Constants.PRICE_PER_HAND * 1.5))
                console.log("Player " + player.id + " wins, Player has: " +  player.hand.handValue);
            } else if(player.checkBust === true){
                console.log("Player " + player.id + " has busted with " + player.hand.handValue);
            } else if(this.dealer.checkBust == true && player.checkBust === false){
                console.log("Dealer  has busted with " + this.dealer.hand.handValue);
                player.addMoney(Constants.PRICE_PER_HAND * 2)
            }
            else if (player.hand.handValue > this.dealer.hand.handValue) {
                console.log("Player " +  player.id + " wins, Player has: " + player.hand.handValue);
                console.log("Dealer has " +  this.dealer.hand.handValue);
                player.addMoney(Constants.PRICE_PER_HAND * 2)
            } else {
                console.log("Player " + player.id + " loses, Player has: " + player.hand.handValue);
                console.log("Dealer has "+  this.dealer.hand.handValue);
            }
        });
    }
}


let game = new BlackJack();
game.playGame();




