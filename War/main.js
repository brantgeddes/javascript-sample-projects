"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.War = void 0;
var deck_1 = require("./classes/deck");
var player_1 = require("./classes/player");
var card_values_1 = require("./helpers/card-values");
var War = /** @class */ (function () {
    function War() {
        var _this = this;
        this.Player1 = new player_1.Player(1);
        this.Player2 = new player_1.Player(2);
        this.potDeck = new deck_1.Deck();
        var startingDeck = new deck_1.Deck();
        startingDeck.fillDeck();
        startingDeck.shuffleDeck();
        console.log(startingDeck.cards.length);
        startingDeck.cards.forEach(function (card, i) {
            if (i % 2 === 0)
                _this.Player1.activeDeck.cards.push(card);
            else
                _this.Player2.activeDeck.cards.push(card);
        });
    }
    War.prototype.play = function () {
        while (this.Player1.getCardValue !== null || this.Player2.getCardValue !== null) {
            switch (this.playersFlip()) {
                case 0:
                    this.addCardsToPot();
                    this.war();
                    break;
                case 1:
                    this.addCardsToPot();
                    this.playerWinsPot(this.Player1);
                    break;
                case 2:
                    this.addCardsToPot();
                    this.playerWinsPot(this.Player2);
                    break;
                default:
                    break;
            }
        }
        console.log("Player 1  " + this.Player1.activeDeck.cards.length);
        console.log("Player 2  " + this.Player2.activeDeck.cards.length);
        console.log("Player 1  " + this.Player1.discardDeck.cards.length);
        console.log("Player 2  " + this.Player2.discardDeck.cards.length);
        if (this.Player1.activeDeck.cards.length > 0)
            console.log("Player 1 wins");
        if (this.Player2.activeDeck.cards.length > 0)
            console.log("Player 2 wins");
    };
    War.prototype.playersFlip = function () {
        console.log("Player 1 flips " + this.Player1.getCardValue);
        console.log("Player 2 flips " + this.Player2.getCardValue);
        if (this.Player1.getCardValue === null || this.Player2.getCardValue === null)
            return null;
        if (card_values_1.CardValues[this.Player1.getCardValue] > card_values_1.CardValues[this.Player2.getCardValue])
            return 1;
        if (card_values_1.CardValues[this.Player1.getCardValue] < card_values_1.CardValues[this.Player2.getCardValue])
            return 2;
        return 0;
    };
    War.prototype.war = function () {
        console.log('War!');
        for (var i = 0; i > 2; i++) {
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
                this.war();
                break;
            case 1:
                this.addCardsToPot();
                this.playerWinsPot(this.Player1);
                break;
            case 2:
                this.addCardsToPot();
                this.playerWinsPot(this.Player2);
                break;
            default:
                break;
        }
    };
    War.prototype.addCardsToPot = function () {
        this.potDeck.cards.push(this.Player1.getCard);
        this.potDeck.cards.push(this.Player2.getCard);
    };
    War.prototype.playerWinsPot = function (player) {
        console.log("Player " + player.id + " has won the pot with " + this.potDeck.cards.length + " Cards in the pot");
        this.potDeck.cards.forEach(function (card) {
            player.discardDeck.cards.push(card);
        });
        this.potDeck = new deck_1.Deck();
    };
    return War;
}());
exports.War = War;
var game = new War();
game.play();
//# sourceMappingURL=main.js.map