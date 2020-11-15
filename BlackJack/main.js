"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackJack = void 0;
var helpers_1 = require("./helpers");
var Constants = require("./constants");
var BlackJack = /** @class */ (function () {
    function BlackJack() {
        this.dealer = new helpers_1.Dealer();
        this.players = [];
        for (var i = 0; i < Constants.NUMBER_OF_PLAYERS; i++) {
            this.players.push(new helpers_1.Player(i));
        }
        this.deck = new helpers_1.Deck();
        console.log(this.deck.deck.length);
        this.deck.suffleDeck();
    }
    BlackJack.prototype.playGame = function () {
        var _this = this;
        console.log("Starting Game");
        console.log("Starting players = ", this.players.length);
        while (this.players.length > 0) {
            if (this.deck.deck.length < 5) {
                this.deck = new helpers_1.Deck();
                this.deck.suffleDeck();
            }
            this.deal();
            this.players.forEach(function (player) {
                _this.playerHit(player);
            });
            this.dealereHit();
            this.checkResults();
        }
    };
    BlackJack.prototype.deal = function () {
        var _this = this;
        this.dealer.hand = new helpers_1.Hand();
        this.players.forEach(function (player, i) {
            player.hand = new helpers_1.Hand();
            player.removeMoney(Constants.PRICE_PER_HAND);
            if (player.money < 0) {
                console.log("Player: " + player.id + " has run out of money");
                _this.players.splice(i, 1);
            }
            else {
                console.log("Dealing to Player: " + player.id);
                player.hand.cards.push(_this.deck.getCard);
            }
        });
        this.dealer.hand.cards.push(this.deck.getCard);
        this.players.forEach(function (player) {
            player.hand.cards.push(_this.deck.getCard);
        });
        this.dealer.hand.cards.push(this.deck.getCard);
    };
    BlackJack.prototype.playerHit = function (player) {
        console.log(player.hand);
        while (player.shouldPlayerHit() === true) {
            console.log("Player: " + player.id + " has hit");
            player.hand.cards.push(this.deck.getCard);
        }
    };
    BlackJack.prototype.dealereHit = function () {
        while (this.dealer.shouldDealerHit() === true) {
            console.log("Dealer: has hit");
            this.dealer.hand.cards.push(this.deck.getCard);
        }
    };
    BlackJack.prototype.checkResults = function () {
        var _this = this;
        if (this.dealer.hand.handValue === 21) {
            console.log("Dealer wins, Dealer has: ", this.dealer.hand.handValue);
            return;
        }
        this.players.forEach(function (player) {
            if (player.hand.handValue === 21) {
                player.addMoney(Constants.PRICE_PER_HAND + (Constants.PRICE_PER_HAND * 1.5));
                console.log("Player " + player.id + " wins, Player has: " + player.hand.handValue);
            }
            else if (player.checkBust === true) {
                console.log("Player " + player.id + " has busted with " + player.hand.handValue);
            }
            else if (_this.dealer.checkBust == true && player.checkBust === false) {
                console.log("Dealer  has busted with " + _this.dealer.hand.handValue);
                player.addMoney(Constants.PRICE_PER_HAND * 2);
            }
            else if (player.hand.handValue > _this.dealer.hand.handValue) {
                console.log("Player " + player.id + " wins, Player has: " + player.hand.handValue);
                console.log("Dealer has " + _this.dealer.hand.handValue);
                player.addMoney(Constants.PRICE_PER_HAND * 2);
            }
            else {
                console.log("Player " + player.id + " loses, Player has: " + player.hand.handValue);
                console.log("Dealer has " + _this.dealer.hand.handValue);
            }
        });
    };
    return BlackJack;
}());
exports.BlackJack = BlackJack;
var game = new BlackJack();
game.playGame();
//# sourceMappingURL=main.js.map