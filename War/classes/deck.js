"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var card_suits_1 = require("../helpers/card-suits");
var card_values_1 = require("../helpers/card-values");
var card_1 = require("./card");
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
    }
    Deck.prototype.fillDeck = function () {
        for (var suit in card_suits_1.CardSuits) {
            if (isNaN(Number(suit))) {
                this.fillSuit(Number(suit));
            }
        }
    };
    Deck.prototype.fillSuit = function (suit) {
        for (var value in card_values_1.CardValues) {
            if (isNaN(Number(value))) {
                this.cards.push(new card_1.Card(suit, value));
            }
        }
    };
    Deck.prototype.shuffleDeck = function () {
        for (var i = this.cards.length - 1; i > 0; i--) {
            var temp = this.cards[Math.floor(Math.random() * (i + 1))];
            this.cards[i] = temp;
            this.cards[Math.floor(Math.random() * (i + 1))] = this.cards[i];
        }
    };
    return Deck;
}());
exports.Deck = Deck;
//# sourceMappingURL=deck.js.map