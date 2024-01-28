import fs from "fs";
import { parseInput } from "./parser";

console.log("started");

const NUMBER_OF_RED = 12;
const NUMBER_OF_GREEN = 13;
const NUMBER_OF_BLUE = 14;

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
const games = parseInput(input);

const possibleGames = games.filter((game) => {
  return game.rounds.every(
    (round) => round.red <= NUMBER_OF_RED && round.green <= NUMBER_OF_GREEN && round.blue <= NUMBER_OF_BLUE
  );
});

const sumOfIdsOfAllPossibleGames = possibleGames.reduce((acc, curr) => acc + curr.id, 0);

console.log(sumOfIdsOfAllPossibleGames);

console.log("done");
