"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var deck_1 = require("./deck");
var Player = /** @class */ (function () {
    function Player(id) {
        this.id = id;
        this.activeDeck = new deck_1.Deck();
        this.discardDeck = new deck_1.Deck();
    }
    Object.defineProperty(Player.prototype, "getCardValue", {
        get: function () {
            if (this.activeDeck.cards.length === 0 && this.discardDeck.cards.length !== 0)
                this.combinedDecks();
            else if (this.activeDeck.cards.length === 0 && this.discardDeck.cards.length === 0)
                return null;
            return this.activeDeck.cards[0].value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "getCard", {
        get: function () {
            if (this.activeDeck.cards.length === 0 && this.discardDeck.cards.length !== 0)
                this.combinedDecks();
            else if (this.activeDeck.cards.length === 0 && this.discardDeck.cards.length === 0)
                return null;
            return this.activeDeck.cards.shift();
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.combinedDecks = function () {
        var _this = this;
        console.log("Player " + this.id + " is combining decks");
        this.discardDeck.cards.forEach(function (card) {
            _this.activeDeck.cards.push(card);
        });
        this.activeDeck.shuffleDeck();
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map