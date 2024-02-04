import fs from "fs";
import { Card, parseInput } from "./parseInput";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const cardPiles = parseInput(input).map((card): CardPile => ({ card: card, quantity: 1 }));

for (let i = 0; i < cardPiles.length; i++) {
  const currentCardPile = cardPiles[i];
  const points = getCardPoints(currentCardPile.card);

  for (let j = 0; j < points; j++) {
    try {
      // cardPiles[i + 1 + j].quantity += currentCardPile.quantity;
      cardPiles[i + 1 + j].quantity += currentCardPile.quantity;
    } catch (e) {
      console.log("hi!");
    }
  }
}

const totalCardsNumberOfCards = cardPiles.reduce((acc, curr) => acc + curr.quantity, 0);

console.log(totalCardsNumberOfCards);

console.log("done");

type CardPile = {
  card: Card;
  quantity: number;
};

function getCardPoints(card: Card): number {
  let points = 0;

  card.numbers.forEach((number) => {
    if (card.winningNumbers.includes(number)) {
      points++;
    }
  });

  return points;
}
