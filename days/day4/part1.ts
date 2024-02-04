import fs from "fs";
import { parseInput, Card } from "./parseInput";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const cards = parseInput(input);

const totalPoints = cards.map(getCardPoints).reduce((acc, curr) => acc + curr, 0);

console.log(totalPoints);

console.log("done");

// Card   1: 98 16 95 90 53 33 43  7 46 45 | 85 15 78 57 34 10 46 90 33 13  8 54  4 37 25 63 55 41  7 82 69 16 30 76  2

function getCardPoints(card: Card): number {
  let points = 0;

  card.numbers.forEach((number) => {
    if (card.winningNumbers.includes(number)) {
      if (points === 0) {
        points = 1;
      } else {
        points *= 2;
      }
    }
  });

  return points;
}
