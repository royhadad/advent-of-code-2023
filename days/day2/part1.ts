import fs from "fs";

console.log("started");

const NUMBER_OF_RED = 12;
const NUMBER_OF_GREEN = 13;
const NUMBER_OF_BLUE = 14;

const games = parseInput();

const possibleGames = games.filter((game) => {
  return game.rounds.every(
    (round) => round.red <= NUMBER_OF_RED && round.green <= NUMBER_OF_GREEN && round.blue <= NUMBER_OF_BLUE
  );
});

const sumOfIdsOfAllPossibleGames = possibleGames.reduce((acc, curr) => acc + curr.id, 0);

console.log(sumOfIdsOfAllPossibleGames);

console.log("done");

type Game = {
  id: number;
  rounds: { red: number; green: number; blue: number }[];
};

type Color = "red" | "blue" | "green";

function stringToColor(color: string): Color {
  if (color !== "red" && color !== "blue" && color !== "green") {
    throw new Error("failed to convert string to color, invalid color");
  }
  return color;
}

function parseInput(): Game[] {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
  const games: string[] = input.split("\n");

  return games.map((game) => {
    const indexOfColon = game.indexOf(":");
    const rounds = game.substring(indexOfColon + 1).split("; ");

    return {
      id: parseInt(game.substring(5, indexOfColon)),
      rounds: rounds.map((round) => {
        const roundAsArray = round
          .trim()
          .split(", ")
          .map((r) => {
            const [amount, color] = r.split(" ");
            return { amount: parseInt(amount), color: stringToColor(color) };
          });

        const roundParsed = { red: 0, blue: 0, green: 0 };

        roundAsArray.forEach((setOfBalls) => {
          roundParsed[setOfBalls.color] = setOfBalls.amount;
        });

        return roundParsed;
      }),
    };
  });
}
