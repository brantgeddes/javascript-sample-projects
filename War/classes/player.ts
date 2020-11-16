import { Deck } from "./deck";

export class Player {
    id: number;
    activeDeck: Deck;
    discardDeck: Deck;
    constructor(id){
        this.id = id;
        this.activeDeck = new Deck();
        this.discardDeck = new Deck();
    }
    public get getCardValue(){
        if(this.activeDeck.cards.length === 0 && this.discardDeck.cards.length !==0 ) this.combinedDecks();
        else if(this.activeDeck.cards.length === 0 && this.discardDeck.cards.length ===0) return null;
        return this.activeDeck.cards[0].value
    }
    public get getCard(){
        if(this.activeDeck.cards.length === 0 && this.discardDeck.cards.length !==0 ) this.combinedDecks();
        else if(this.activeDeck.cards.length === 0 && this.discardDeck.cards.length ===0) return null;
        return this.activeDeck.cards.shift()
    }
    private combinedDecks(){
        console.log(`Player ${this.id} is combining decks`);
        this.discardDeck.cards.forEach(card => {
            this.activeDeck.cards.push(card);
        });
        this.activeDeck.shuffleDeck();
    }
}