"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.Dealer = exports.Deck = exports.Hand = exports.Card = void 0;
var Constants = require("./constants");
var Card = /** @class */ (function () {
    function Card(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    return Card;
}());
exports.Card = Card;
var Hand = /** @class */ (function () {
    function Hand() {
        this.cards = [];
    }
    Object.defineProperty(Hand.prototype, "handValue", {
        get: function () {
            var total = 0;
            if (this.cards.some(function (card) { return card.value === 'A'; })) {
                for (var i = 0; i < this.cards.length; i++) {
                    if (this.cards[i].value !== 'A')
                        continue;
                    this.cards.push(this.cards[i]);
                    this.cards.splice(i, 1);
                }
            }
            this.cards.forEach(function (card) {
                switch (card.value) {
                    case 'A':
                        if (total >= 11) {
                            total += 1;
                        }
                        else {
                            total += 11;
                        }
                        break;
                    case 'K':
                    case 'Q':
                    case 'J':
                        total += 10;
                        break;
                    default:
                        total += Number(card.value);
                }
            });
            return total;
        },
        enumerable: false,
        configurable: true
    });
    return Hand;
}());
exports.Hand = Hand;
var Deck = /** @class */ (function () {
    function Deck() {
        this.deck = [];
        for (var k = 0; k < Constants.NUMBER_OF_DECKS; k++) {
            for (var i = 0; i < Constants.SUITS.length; i++) {
                for (var j = 0; j < Constants.CARD_VALUES.length; j++) {
                    this.deck.push(new Card(Constants.SUITS[i], Constants.CARD_VALUES[j]));
                }
            }
        }
    }
    Deck.prototype.suffleDeck = function () {
        for (var i = this.deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    };
    Object.defineProperty(Deck.prototype, "getCard", {
        get: function () {
            if (this.deck.length != 0) {
                return this.deck.shift();
            }
            else {
                return null;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Deck;
}());
exports.Deck = Deck;
var Dealer = /** @class */ (function () {
    function Dealer() {
        this.hand = new Hand();
    }
    Dealer.prototype.shouldDealerHit = function () {
        if (this.hand.handValue <= 16)
            return true;
        return false;
    };
    Object.defineProperty(Dealer.prototype, "checkBust", {
        get: function () {
            if (this.hand.handValue > 21)
                return true;
            return false;
        },
        enumerable: false,
        configurable: true
    });
    return Dealer;
}());
exports.Dealer = Dealer;
var Player = /** @class */ (function () {
    function Player(id) {
        this.hand = new Hand();
        this.money = Constants.STARTING_MONEY;
        this.id = id;
    }
    Player.prototype.shouldPlayerHit = function (dealersCard) {
        if (dealersCard) {
        }
        else {
            if (this.hand.handValue <= 16)
                return true;
            return false;
        }
    };
    Object.defineProperty(Player.prototype, "checkBust", {
        get: function () {
            if (this.hand.handValue > 21)
                return true;
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.removeMoney = function (x) {
        this.money -= x;
    };
    Player.prototype.addMoney = function (x) {
        this.money += x;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=helpers.js.map