import fs from "fs";

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

type Card = {
  id: number;
  winningNumbers: number[];
  numbers: number[];
};

function parseInput(input: string): Card[] {
  const removeDuplicateSpaces = (str: string): string => {
    return str.replace(/\s+/g, " ");
  };

  const lines: string[] = input.split("\n");
  const cards = lines.map(removeDuplicateSpaces).map((line): Card => {
    const [idPart, numbersPart] = line.split(":").map((str) => str.trim());

    const [, idString] = idPart.split(" ");
    const id = parseInt(idString);

    const [winningNumbersString, numbersString] = numbersPart.split("|").map((str) => str.trim());
    const winningNumbers = winningNumbersString.split(" ").map((str) => parseInt(str));
    const numbers = numbersString.split(" ").map((str) => parseInt(str));

    return {
      id,
      winningNumbers,
      numbers,
    };
  });

  return cards;
}
